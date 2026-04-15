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

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.workspace.set(params['workspace'] || '');
    this.apiKey.set(params['api_key'] || '');
    this.adminKey.set(params['admin_key'] || params['api_key'] || '');

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
    this.http.get<any>(`${this.CHRONOMAPS_API_URL}/${this.workspace()}/items`, {
      params: { page: 1, page_size: 500 },
      headers: { Authorization: key },
    }).subscribe({
      next: (data) => {
        const raw: any[] = data?.items || data || [];
        this.items.set(raw.filter((item: any) => item.ws_group_id));
      },
      error: () => {},
    });
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
    const meta = this.workspaceMeta();
    const workshopName = meta?.event_name || meta?.metadata?.event_name || 'Strategic Workshop';

    try {
      // Use one shared Miro board for all groups
      this.miroProgress.set('Creating Miro board…');
      const boardName = `${workshopName} — Strategic Workshop`;
      const board = await this.miroPost(token, 'https://api.miro.com/v2/boards', {
        name: boardName,
        description: 'Auto-generated by mapfutur.es strategic workshop export',
      });
      const boardId = board.id as string;
      const boardUrl = board.viewLink as string;

      // Layout constants (Miro coordinates in points)
      const IMAGE_W = 320;
      const IMAGE_H = 600;
      const STICKY_W = 200;
      const STICKY_H = 150;
      const H_GAP = 40;   // horizontal gap between columns
      const V_GAP = 80;   // vertical gap between rows
      const GROUP_GAP = 200; // vertical gap between groups

      let groupOffsetY = 0;

      for (const group of groups) {
        const groupItems = allItems.filter(item => item.ws_group_id === group.id);

        // Collect unique participants
        const participantMap = new Map<string, string>(); // authorId → name
        groupItems.forEach(item => {
          const id = item.author_id || item.participant_name || 'unknown';
          const name = item.participant_name || id;
          if (!participantMap.has(id)) participantMap.set(id, name);
        });
        const participants = Array.from(participantMap.entries()); // [authorId, name][]

        // Create a frame for this group
        this.miroProgress.set(`Creating frame for group: ${group.name}…`);
        const frameW = participants.length * (IMAGE_W + STICKY_W + H_GAP) + H_GAP;
        const frameH = totalRounds * (IMAGE_H + V_GAP) + V_GAP + 60; // 60 for header
        await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/frames`, {
          data: { title: group.name, format: 'custom', type: 'freeform' },
          style: { fillColor: group.color ? `${group.color}22` : '#f5f5f5' },
          geometry: { height: frameH, width: frameW },
          position: { x: 0, y: groupOffsetY, origin: 'center' },
        });

        // Place images and sticky note slots
        for (let pIdx = 0; pIdx < participants.length; pIdx++) {
          const [authorId, participantName] = participants[pIdx];
          const colX = (H_GAP + (IMAGE_W + STICKY_W + H_GAP) * pIdx) + IMAGE_W / 2;

          // Participant name label (sticky)
          await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/sticky_notes`, {
            data: { content: `<strong>${participantName}</strong>`, shape: 'rectangle' },
            style: { fillColor: group.color || '#607D8B', textColor: '#ffffff' },
            geometry: { height: 40, width: IMAGE_W },
            position: { x: colX, y: groupOffsetY + 30, origin: 'center' },
          });

          for (let round = 1; round <= totalRounds; round++) {
            const rowY = groupOffsetY + 60 + V_GAP / 2 + (round - 1) * (IMAGE_H + V_GAP) + IMAGE_H / 2;

            const item = groupItems.find(
              i => (i.author_id === authorId || i.participant_name === participantName) && i.ws_round === round
            );

            if (item?.screenshot_url || item?.thumbnail_url) {
              const imgUrl = item.screenshot_url || item.thumbnail_url;
              this.miroProgress.set(`Placing image: ${participantName} / Round ${round}…`);
              await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/images`, {
                data: { imageUrl: imgUrl, title: `${participantName} – Round ${round}` },
                geometry: { height: IMAGE_H, width: IMAGE_W },
                position: { x: colX, y: rowY, origin: 'center' },
              });
            } else {
              // Placeholder sticky note for missing screenshot
              await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/sticky_notes`, {
                data: { content: `Round ${round}\n(no screenshot yet)`, shape: 'rectangle' },
                style: { fillColor: '#e0e0e0', textColor: '#666666' },
                geometry: { height: IMAGE_H, width: IMAGE_W },
                position: { x: colX, y: rowY, origin: 'center' },
              });
            }

            // Blank sticky note for facilitator comments (to the right of image)
            const stickyX = colX + IMAGE_W / 2 + STICKY_W / 2 + 10;
            await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/sticky_notes`, {
              data: { content: '', shape: 'square' },
              style: { fillColor: '#fff9c4' },
              geometry: { height: STICKY_H, width: STICKY_W },
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
