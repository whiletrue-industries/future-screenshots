import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { WsGroup } from '../admin/workspace-metadata.interface';

@Component({
  selector: 'app-showcase-ws-strategic',
  imports: [],
  templateUrl: './showcase-ws-strategic.component.html',
  styleUrl: './showcase-ws-strategic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseWsStrategicComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private api = inject(ApiService);

  readonly CHRONOMAPS_API_URL = this.api.CHRONOMAPS_API_URL;

  workspace = signal<string>('');
  apiKey = signal<string>('');   // collaborate key (for participant links)
  adminKey = signal<string>(''); // admin key (for loading items for Miro)

  workspaceMeta = signal<any>(null);
  items = signal<any[]>([]);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // Miro export state
  miroToken = signal<string>('');
  miroExporting = signal(false);
  miroResult = signal<{ boardUrl: string; boardName: string } | null>(null);
  miroError = signal<string | null>(null);
  miroProgress = signal<string>('');
  miroBoardId = signal<string | null>(null);

  // Copied link feedback
  copiedGroupId = signal<string | null>(null);

  wsGroups = computed<WsGroup[]>(() => {
    const meta = this.workspaceMeta();
    return meta?.ws_groups || meta?.metadata?.ws_groups || [];
  });

  wsTotalRounds = computed<number>(() => {
    const meta = this.workspaceMeta();
    return meta?.ws_rounds || meta?.metadata?.ws_rounds || 5;
  });

  wsRoundPrompts = computed<string[]>(() => {
    const meta = this.workspaceMeta();
    return meta?.ws_round_prompts || meta?.metadata?.ws_round_prompts || [];
  });

  workshopName = computed<string>(() => {
    const meta = this.workspaceMeta();
    return meta?.event_name || meta?.metadata?.event_name || 'Strategic Workshop';
  });

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.workspace.set(params['workspace'] || '');
    this.apiKey.set(params['api_key'] || '');
    this.adminKey.set(params['admin_key'] || params['api_key'] || '');
    this.miroBoardId.set(this.getStoredMiroBoardId());

    if (this.workspace()) {
      this.loadWorkspace();
    } else {
      this.isLoading.set(false);
      this.errorMsg.set('No workspace specified.');
    }
  }

  private loadWorkspace() {
    const key = this.adminKey() || this.apiKey();
    this.http.get<any>(`${this.CHRONOMAPS_API_URL}/${this.workspace()}`, {
      headers: { Authorization: key },
    }).subscribe({
      next: (data) => {
        this.workspaceMeta.set(data);
        this.isLoading.set(false);
        // Load all items for Miro export
        this.loadAllItems();
      },
      error: () => {
        this.errorMsg.set('Failed to load workspace.');
        this.isLoading.set(false);
      },
    });
  }

  private loadAllItems() {
    const key = this.adminKey() || this.apiKey();
    const pageSize = 500;
    const all: any[] = [];

    const loadPage = (page: number) => {
      this.http.get<any>(`${this.CHRONOMAPS_API_URL}/${this.workspace()}/items`, {
        params: { page, page_size: pageSize },
        headers: { Authorization: key },
      }).subscribe({
        next: (data) => {
          const raw: any[] = data?.items || data || [];
          all.push(...raw);

          if (raw.length >= pageSize) {
            loadPage(page + 1);
            return;
          }

          const normalized = all
            .filter((item: any) => {
              const groupId = this.getWsGroupId(item);
              return typeof groupId === 'string' && groupId.trim().length > 0;
            })
            .map((item: any) => {
              const screenshotUrl = this.getScreenshotUrl(item);
              const thumbnailUrl = this.getThumbnailUrl(item) || this.deriveThumbnailUrl(screenshotUrl);
              return {
                ...item,
                screenshot_url: screenshotUrl,
                thumbnail_url: thumbnailUrl,
              };
            });

          this.items.set(normalized);
        },
        error: () => {},
      });
    };

    // API uses zero-based page indexing.
    loadPage(0);
  }

  // ---- Copy participant link per group ----

  buildParticipantLink(group: WsGroup): string {
    const base = window.location.origin;
    const params = new URLSearchParams({
      workspace: this.workspace(),
      api_key: this.apiKey(),
      ws: 'true',
      ws_strategic: 'true',
      ws_group: group.id,
    });
    return `${base}/canvas-creator?${params.toString()}`;
  }

  copyParticipantLink(group: WsGroup) {
    const link = this.buildParticipantLink(group);
    navigator.clipboard.writeText(link).then(() => {
      this.copiedGroupId.set(group.id);
      setTimeout(() => this.copiedGroupId.set(null), 2000);
    }).catch(() => {
      // Fallback: prompt user
      window.prompt('Copy this link:', link);
    });
  }

  // ---- Miro export (Option C2 – token paste) ----

  /** Push all groups to Miro as separate boards, each with a participant × round image grid */
  async sendToMiro() {
    const token = this.miroToken().trim();
    if (!token) {
      this.miroError.set('Please enter a Miro personal access token.');
      return;
    }

    this.miroExporting.set(true);
    this.miroError.set(null);
    this.miroResult.set(null);

    const groups = this.wsGroups();
    const totalRounds = this.wsTotalRounds();
    const allItems = this.items();
    const workshopName = this.workshopName();

    try {
      // Use one shared Miro board for all groups
      this.miroProgress.set('Preparing Miro board…');
      const suffix = ' — Strategic Workshop';
      const maxNameLen = 60;
      const truncatedWorkshopName = workshopName.length + suffix.length > maxNameLen
        ? workshopName.slice(0, maxNameLen - suffix.length)
        : workshopName;
      const boardName = `${truncatedWorkshopName}${suffix}`;
      let boardId = this.miroBoardId() || this.getStoredMiroBoardId();
      let boardUrl = '';

      if (boardId) {
        try {
          const existingBoard = await this.miroGet(token, `https://api.miro.com/v2/boards/${boardId}`);
          boardUrl = (existingBoard.viewLink as string) || '';
          this.miroProgress.set('Updating existing Miro board…');
        } catch {
          boardId = null;
        }
      }

      if (!boardId) {
        this.miroProgress.set('Creating Miro board…');
        const board = await this.miroPost(token, 'https://api.miro.com/v2/boards', {
          name: boardName,
          description: 'Auto-generated by mapfutur.es strategic workshop export',
        });
        boardId = board.id as string;
        boardUrl = board.viewLink as string;
        this.miroBoardId.set(boardId);
        this.storeMiroBoardId(boardId);
      }

      const finalBoardId = boardId as string;

      // Layout constants (Miro coordinates in points)
      const IMAGE_W = 320;
      const IMAGE_H = 600;
      const STICKY_W = 200;
      const STICKY_H = 150;
      const H_GAP = 40;   // horizontal gap between columns
      const V_GAP = 80;   // vertical gap between rows
      const GROUP_GAP = 200; // vertical gap between groups
      const MIRO_MIN_SIZE = 100;

      let groupOffsetY = 0;

      for (const group of groups) {
        const groupItems = allItems.filter(item => this.getWsGroupId(item) === group.id);

        // Collect unique participants
        const participantMap = new Map<string, string>(); // authorId → name
        groupItems.forEach(item => {
          const id = this.getAuthorId(item) || this.getParticipantName(item) || 'unknown';
          const name = this.getParticipantName(item) || id;
          if (!participantMap.has(id)) participantMap.set(id, name);
        });
        const participants = Array.from(participantMap.entries()); // [authorId, name][]

        // Create a frame for this group
        this.miroProgress.set(`Creating frame for group: ${group.name}…`);
        const frameW = Math.max(MIRO_MIN_SIZE, participants.length * (IMAGE_W + STICKY_W + H_GAP) + H_GAP);
        const frameH = Math.max(MIRO_MIN_SIZE, totalRounds * (IMAGE_H + V_GAP) + V_GAP + 120); // 120 for header
        await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/frames`, {
          data: { title: group.name, format: 'custom', type: 'freeform' },
          style: { fillColor: group.color ? this.lightenHex(group.color, 0.13) : '#f5f5f5' },
          geometry: { height: frameH, width: frameW },
          position: { x: 0, y: groupOffsetY, origin: 'center' },
        });

        if (participants.length === 0) {
          await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
            data: { content: 'No submissions yet', shape: 'rectangle' },
            style: { fillColor: 'gray' },
            geometry: { width: 220 },
            position: { x: 0, y: groupOffsetY + 60, origin: 'center' },
          });
        }

        // Place images and sticky note slots
        for (let pIdx = 0; pIdx < participants.length; pIdx++) {
          const [authorId, participantName] = participants[pIdx];
          const colX = (H_GAP + (IMAGE_W + STICKY_W + H_GAP) * pIdx) + IMAGE_W / 2;

          // Participant name label (sticky)
          await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
            data: { content: `<strong>${participantName}</strong>`, shape: 'rectangle' },
            style: { fillColor: this.toMiroStickyColor(group.color) },
            geometry: { width: IMAGE_W },
            position: { x: colX, y: groupOffsetY + 60, origin: 'center' },
          });

          for (let round = 1; round <= totalRounds; round++) {
            const rowY = groupOffsetY + 120 + V_GAP / 2 + (round - 1) * (IMAGE_H + V_GAP) + IMAGE_H / 2;

            const item = groupItems.find(
              i => (this.getAuthorId(i) === authorId || this.getParticipantName(i) === participantName)
                && Number(this.getWsRound(i)) === round
            );

            const imgUrl = this.getScreenshotUrl(item) || this.getThumbnailUrl(item);
            if (imgUrl) {
              this.miroProgress.set(`Placing image: ${participantName} / Round ${round}…`);
              await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/images`, {
                data: { url: imgUrl, title: `${participantName} – Round ${round}` },
                geometry: { width: IMAGE_W },
                position: { x: colX, y: rowY, origin: 'center' },
              });
            } else {
              // Placeholder sticky note for missing screenshot
              await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
                data: { content: `Round ${round}\n(no screenshot yet)`, shape: 'rectangle' },
                style: { fillColor: 'gray' },
                geometry: { width: IMAGE_W },
                position: { x: colX, y: rowY, origin: 'center' },
              });
            }

            // Blank sticky note for facilitator comments (to the right of image)
            const stickyX = colX + IMAGE_W / 2 + STICKY_W / 2 + 10;
            await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
              data: { content: '', shape: 'square' },
              style: { fillColor: 'light_yellow' },
              geometry: { width: STICKY_W },
              position: { x: stickyX, y: rowY, origin: 'center' },
            });
          }
        }

        groupOffsetY += frameH + GROUP_GAP;
      }

      this.miroResult.set({ boardUrl, boardName });
      this.miroProgress.set('');
    } catch (err: any) {
      this.miroError.set(err?.message || 'Miro export failed. Check your token and try again.');
      this.miroProgress.set('');
    } finally {
      this.miroExporting.set(false);
    }
  }

  /** Blend a hex color with white at the given ratio (0=white, 1=original). Returns a 6-digit CSS hex string. */
  private lightenHex(hex: string, ratio: number): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const blend = (c: number) => Math.round(c * ratio + 255 * (1 - ratio)).toString(16).padStart(2, '0');
    return `#${blend(r)}${blend(g)}${blend(b)}`;
  }

  private normalizeImageUrl(url: string | null | undefined): string {
    if (!url || typeof url !== 'string') {
      return '';
    }
    return url.replace('https://storage.googleapis.com/chronomaps3.firebasestorage.app/', 'https://storage.googleapis.com/chronomaps3-eu/');
  }

  private deriveThumbnailUrl(screenshotUrl: string): string {
    if (!screenshotUrl) {
      return '';
    }
    return screenshotUrl.replace(/screenshot\.jpeg$/, 'screenshot.thumbnail.jpeg');
  }

  private toMiroStickyColor(color: string | null | undefined): string {
    if (!color) {
      return 'dark_blue';
    }
    const hex = color.replace('#', '').toLowerCase();
    if (hex.length !== 6) {
      return 'dark_blue';
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const lightness = (max + min) / 2;

    if (delta < 15) {
      return lightness > 190 ? 'light_yellow' : 'gray';
    }

    let hue = 0;
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    const degrees = (hue * 60 + 360) % 360;

    if (degrees < 20 || degrees >= 340) return 'red';
    if (degrees < 45) return 'orange';
    if (degrees < 70) return 'yellow';
    if (degrees < 95) return 'light_green';
    if (degrees < 150) return 'green';
    if (degrees < 190) return 'cyan';
    if (degrees < 235) return 'light_blue';
    if (degrees < 265) return 'blue';
    if (degrees < 300) return 'violet';
    return 'pink';
  }

  private getWsGroupId(item: any): string {
    return item?.ws_group_id || item?.metadata?.ws_group_id || '';
  }

  private getWsRound(item: any): number | string {
    return item?.ws_round ?? item?.metadata?.ws_round ?? '';
  }

  private getParticipantName(item: any): string {
    return item?.participant_name || item?.metadata?.participant_name || '';
  }

  private getAuthorId(item: any): string {
    return item?.author_id || item?.metadata?.author_id || '';
  }

  private getScreenshotUrl(item: any): string {
    return this.normalizeImageUrl(item?.screenshot_url || item?.metadata?.screenshot_url || '');
  }

  private getThumbnailUrl(item: any): string {
    return this.normalizeImageUrl(item?.thumbnail_url || item?.metadata?.thumbnail_url || '');
  }

  private miroBoardStorageKey(): string {
    return `ws_miro_board_id_${this.workspace()}`;
  }

  private getStoredMiroBoardId(): string | null {
    const key = this.workspace();
    if (!key) {
      return null;
    }
    return localStorage.getItem(this.miroBoardStorageKey());
  }

  private storeMiroBoardId(boardId: string): void {
    const key = this.workspace();
    if (!key) {
      return;
    }
    localStorage.setItem(this.miroBoardStorageKey(), boardId);
  }

  private async miroGet(token: string, url: string): Promise<any> {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Miro API error ${resp.status}: ${text}`);
    }
    return resp.json();
  }

  private async miroPost(token: string, url: string, body: any): Promise<any> {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Miro API error ${resp.status}: ${text}`);
    }
    return resp.json();
  }
}
