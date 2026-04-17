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
  miroResult = signal<{ boardUrl: string; boardName: string; boardMode: 'create' | 'add' } | null>(null);
  miroError = signal<string | null>(null);
  miroProgress = signal<string>('');
  miroBoardId = signal<string | null>(null);
  boardMode = signal<'create' | 'add'>('create'); // 'create' = new board, 'add' = existing board

  // Copied link feedback
  copiedGroupId = signal<string | null>(null);

  previewComposition = computed(() => this.buildCompositionPreview());

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
    this.miroToken.set(this.getStoredMiroToken());
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

  onMiroTokenInput(value: string): void {
    const normalized = this.normalizeMiroToken(value);
    this.miroToken.set(normalized);
    this.storeMiroToken(normalized);
  }

  // ---- Miro export (Option C2 – token paste) ----

  /** Push all groups to Miro as separate boards, each with a participant × round image grid */
  async sendToMiro() {
    const token = this.normalizeMiroToken(this.miroToken());
    this.miroToken.set(token);
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
      let boardId: string | null = null;
      let boardUrl = '';

      // Determine whether to create new or add to existing
      const shouldAddToExisting = this.boardMode() === 'add';
      const storedBoardId = this.getStoredMiroBoardId();

      if (shouldAddToExisting && storedBoardId) {
        // Try to use existing board
        try {
          const existingBoard = await this.miroGet(token, `https://api.miro.com/v2/boards/${storedBoardId}`);
          boardId = storedBoardId;
          boardUrl = (existingBoard.viewLink as string) || '';
          this.miroProgress.set('Updating existing Miro board…');
        } catch {
          this.miroError.set('Could not access existing board. Creating a new board instead.');
          boardId = null;
        }
      }

      if (!boardId) {
        // Create new board
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
      const existingBoardStartY = await this.computeExistingBoardStartY(token, finalBoardId, shouldAddToExisting);
      const boardTagCache = new Map<string, string>();
      await this.preloadBoardTags(token, finalBoardId, boardTagCache);

      // Layout constants (Miro coordinates in points)
      const IMAGE_W = 130;
      const IMAGE_H = 240;
      const TAG_STICKY_W = 84;
      const TAG_STICKY_GAP = 10;
      const TAG_STICKY_H = (IMAGE_H - TAG_STICKY_GAP * 2) / 3;
      const ITEM_GAP = 28;
      const BLOCK_INNER_GAP = 16;
      const PARTICIPANT_GAP = 70;
      const ROUND_GAP = 90;
      const GROUP_GAP = 220;
      const ROUND_HEADER_H = 70;
      const ROUND_TITLE_TO_CONTENT_GAP = 28;
      const MIRO_MIN_SIZE = 100;
      const SIDE_PADDING = 40;
      const TOP_PADDING = 150;
      const BOTTOM_PADDING = 70;

      let groupOffsetY = existingBoardStartY;
      const prompts = this.wsRoundPrompts();

      for (const group of groups) {
        const groupItems = allItems.filter(item => this.getWsGroupId(item) === group.id);
        console.log(`[Miro Export] Group "${group.name}": ${groupItems.length} total items`);
        const placedItemIds = new Set<string>();

        // Collect unique participants
        const participantMap = new Map<string, string>(); // authorId → name
        groupItems.forEach(item => {
          const id = this.getAuthorId(item) || this.getParticipantName(item) || 'unknown';
          const name = this.getParticipantName(item) || id;
          if (!participantMap.has(id)) participantMap.set(id, name);
        });
        const participants = Array.from(participantMap.entries()); // [authorId, name][]
        console.log(`[Miro Export] Unique participants: ${participants.length}`, participants.map(p => p[1]));

        // Create a frame for this group
        this.miroProgress.set(`Creating frame for group: ${group.name}…`);

        // Calculate frame dimensions: width based on max items from any participant per round
        let maxItemsPerParticipantPerRound = 0;
        for (let round = 1; round <= totalRounds; round++) {
          for (const [authorId, participantName] of participants) {
            const itemsForParticipant = groupItems.filter(
              i => (this.getAuthorId(i) === authorId || this.getParticipantName(i) === participantName)
                && Number(this.getWsRound(i)) === round
            );
            maxItemsPerParticipantPerRound = Math.max(maxItemsPerParticipantPerRound, itemsForParticipant.length);
          }
        }

        // Frame width: participants × max item blocks + explicit participant spacing + side padding.
        const itemBlockW = TAG_STICKY_W + BLOCK_INNER_GAP + IMAGE_W;
        const participantSectionW = Math.max(220, Math.max(1, maxItemsPerParticipantPerRound) * (itemBlockW + ITEM_GAP) - ITEM_GAP + 20);
        const participantCount = participants.length;
        const frameW = Math.max(
          MIRO_MIN_SIZE,
          SIDE_PADDING * 2
            + participantCount * participantSectionW
            + Math.max(0, participantCount - 1) * PARTICIPANT_GAP
        );

        // Frame height: fixed paddings + one row per round (header + title/content gap + image) + inter-round gaps.
        const roundRowH = ROUND_HEADER_H + ROUND_TITLE_TO_CONTENT_GAP + IMAGE_H;
        const frameH = Math.max(
          MIRO_MIN_SIZE,
          TOP_PADDING + totalRounds * roundRowH + Math.max(0, totalRounds - 1) * ROUND_GAP + BOTTOM_PADDING
        );

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

        // Layout: frame-relative coordinates avoid cumulative Y drift and keep all items contained.
        const frameTopY = groupOffsetY - frameH / 2;
        const groupTitleY = frameTopY + 48;
        const contentTopY = frameTopY + TOP_PADDING;

        // Add explicit group title above rounds.
        const groupTitleContent = `<strong>${group.name}</strong>`;
        try {
          await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/texts`, {
            data: { content: groupTitleContent },
            style: { fontSize: '40' },
            geometry: { width: Math.max(360, frameW - SIDE_PADDING * 2) },
            position: { x: 0, y: groupTitleY, origin: 'center' },
          });
        } catch {
          await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
            data: { content: groupTitleContent, shape: 'rectangle' },
            style: { fillColor: this.toMiroStickyColor(group.color) },
            geometry: { width: Math.max(360, frameW - SIDE_PADDING * 2) },
            position: { x: 0, y: groupTitleY, origin: 'center' },
          });
        }

        for (let round = 1; round <= totalRounds; round++) {
          const roundIdx = round - 1;
          const roundStartY = contentTopY + roundIdx * (roundRowH + ROUND_GAP);
          const roundHeaderY = roundStartY + ROUND_HEADER_H / 2;
          const imageTopY = roundStartY + ROUND_HEADER_H + ROUND_TITLE_TO_CONTENT_GAP;
          const imageCenterY = imageTopY + IMAGE_H / 2;

          // Add round header as text (24px). Fallback to sticky if text endpoint fails.
          const roundPrompt = prompts[round - 1] || `Round ${round}`;
          const titleColor = group.color || '#050038';
          const roundHeaderText = `<span style="color:${titleColor}"><strong>Round ${round}:</strong> ${roundPrompt}</span>`;
          try {
            await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/texts`, {
              data: { content: roundHeaderText },
              style: { fontSize: '24' },
              geometry: { width: Math.max(300, frameW - SIDE_PADDING * 2) },
              position: { x: 0, y: roundHeaderY, origin: 'center' },
            });
          } catch {
            await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
              data: { content: roundHeaderText, shape: 'rectangle' },
              style: { fillColor: this.toMiroStickyColor(group.color) },
              geometry: { width: Math.max(300, frameW - SIDE_PADDING * 2) },
              position: { x: 0, y: roundHeaderY, origin: 'center' },
            });
          }

          // For this round, place all participants and their items horizontally.
          const leftEdgeX = -frameW / 2 + SIDE_PADDING;

          for (let pIdx = 0; pIdx < participants.length; pIdx++) {
            const [authorId, participantName] = participants[pIdx];
            const participantStartX = leftEdgeX + pIdx * (participantSectionW + PARTICIPANT_GAP);

            // Get all items for this participant in this round
            const itemsForParticipant = groupItems.filter(
              i => (this.getAuthorId(i) === authorId || this.getParticipantName(i) === participantName)
                && Number(this.getWsRound(i)) === round
            );

            // Place all items for this participant in this round, horizontally, with a pre-image tag sticky column.
            for (let itemIdx = 0; itemIdx < itemsForParticipant.length; itemIdx++) {
              const item = itemsForParticipant[itemIdx];
              const itemId = this.getItemId(item);
              const itemLeftX = participantStartX + itemIdx * (itemBlockW + ITEM_GAP);
              const tagCenterX = itemLeftX + TAG_STICKY_W / 2;
              const imageCenterX = itemLeftX + TAG_STICKY_W + BLOCK_INNER_GAP + IMAGE_W / 2;
              const contentTitle = this.getContentTitle(item) || `Item ${itemIdx + 1}`;

              const datapointTags = [
                { tagTitle: `group:${group.name}` },
                { tagTitle: `round:${round}` },
                { tagTitle: `content_title:${contentTitle}` },
              ];

              for (let tagIdx = 0; tagIdx < 3; tagIdx++) {
                const tagCenterY = imageTopY + TAG_STICKY_H / 2 + tagIdx * (TAG_STICKY_H + TAG_STICKY_GAP);
                const sticky = await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
                  data: { content: 'HMW... ', shape: 'square' },
                  style: { fillColor: this.toMiroStickyColor(group.color) },
                  geometry: { width: TAG_STICKY_W },
                  position: { x: tagCenterX, y: tagCenterY, origin: 'center' },
                });

                for (const datapointTag of datapointTags) {
                  const tagId = await this.getOrCreateBoardTag(
                    token,
                    finalBoardId,
                    boardTagCache,
                    datapointTag.tagTitle,
                    this.toMiroTagColor(group.color),
                  );
                  await this.attachTagToItem(token, finalBoardId, sticky.id as string, tagId);
                }
              }

              const imgUrl = this.getScreenshotUrl(item) || this.getThumbnailUrl(item);
              if (imgUrl) {
                this.miroProgress.set(`Placing image: ${participantName} / Round ${round} / Item ${itemIdx + 1}…`);
                const imageTitle = `${group.name} – Round ${round} – ${participantName} – ${contentTitle}`;
                await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/images`, {
                  data: { url: imgUrl, title: imageTitle },
                  geometry: { width: IMAGE_W },
                  position: { x: imageCenterX, y: imageCenterY, origin: 'center' },
                });
              } else {
                // Placeholder sticky note for missing screenshot
                await this.miroPost(token, `https://api.miro.com/v2/boards/${finalBoardId}/sticky_notes`, {
                  data: { content: `(no image)`, shape: 'rectangle' },
                  style: { fillColor: 'gray' },
                  geometry: { width: IMAGE_W },
                  position: { x: imageCenterX, y: imageCenterY, origin: 'center' },
                });
              }

              if (itemId) {
                placedItemIds.add(itemId);
              }
            }
          }
        }

        const unplaced = groupItems.filter((item) => {
          const id = this.getItemId(item);
          return !id || !placedItemIds.has(id);
        });
        if (unplaced.length > 0) {
          console.log(`[Miro Export] Unplaced items in group "${group.name}": ${unplaced.length}`);
          unplaced.forEach((item) => {
            console.log('[Miro Export] Unplaced item', {
              id: this.getItemId(item),
              reason: this.getItemSkipReason(item, totalRounds),
              ws_group_id: this.getWsGroupId(item),
              ws_round: this.getWsRound(item),
              author_id: this.getAuthorId(item),
              participant_name: this.getParticipantName(item),
              screenshot: !!this.getScreenshotUrl(item),
              thumbnail: !!this.getThumbnailUrl(item),
            });
          });
        }

        groupOffsetY += frameH + GROUP_GAP;
      }

      this.miroResult.set({
        boardUrl,
        boardName,
        boardMode: shouldAddToExisting ? 'add' : 'create',
      });
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

  private normalizeMiroToken(token: string | null | undefined): string {
    const raw = typeof token === 'string' ? token : '';
    return raw.replace(/^Bearer\s+/i, '').trim();
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
      if (lightness < 45) return 'black';
      if (lightness < 100) return 'gray';
      return 'light_yellow';
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
    if (degrees < 130) return 'green';
    if (degrees < 150) return 'dark_green';
    if (degrees < 190) return 'cyan';
    if (degrees < 220) return 'light_blue';
    if (degrees < 265) return 'blue';
    if (degrees < 300) return 'violet';
    if (lightness > 170) return 'light_pink';
    return 'pink';
  }

  private toMiroTagColor(color: string | null | undefined): string {
    const stickyColor = this.toMiroStickyColor(color);

    switch (stickyColor) {
      case 'light_blue':
        return 'blue';
      case 'light_pink':
      case 'pink':
        return 'magenta';
      case 'orange':
      case 'light_yellow':
        return 'yellow';
      default:
        return stickyColor;
    }
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

  private getItemId(item: any): string {
    return item?._id || item?.id || '';
  }

  private getContentTitle(item: any): string {
    return item?.content_title || item?.metadata?.content_title || '';
  }

  private getItemSkipReason(item: any, totalRounds: number): string {
    const groupId = this.getWsGroupId(item);
    if (!groupId) {
      return 'missing_ws_group_id';
    }

    const participantKey = this.getAuthorId(item) || this.getParticipantName(item);
    if (!participantKey) {
      return 'missing_author_and_participant_name';
    }

    const round = Number(this.getWsRound(item));
    if (!Number.isFinite(round)) {
      return 'round_not_numeric';
    }
    if (round < 1 || round > totalRounds) {
      return 'round_out_of_range';
    }

    return 'not_matched_by_group_round_participant';
  }

  private buildCompositionPreview() {
    const groups = this.wsGroups();
    const totalRounds = this.wsTotalRounds();
    const prompts = this.wsRoundPrompts();
    const allItems = this.items();

    return groups.map((group) => {
      const groupItems = allItems.filter((item) => this.getWsGroupId(item) === group.id);

      const participantMap = new Map<string, string>();
      groupItems.forEach((item) => {
        const key = this.getAuthorId(item) || this.getParticipantName(item) || '';
        const name = this.getParticipantName(item) || key || 'Unknown participant';
        if (key && !participantMap.has(key)) {
          participantMap.set(key, name);
        }
      });
      const participants = Array.from(participantMap.entries());

      const rounds = Array.from({ length: totalRounds }, (_, idx) => {
        const round = idx + 1;
        const prompt = prompts[idx] || `Round ${round}`;
        const participantRows = participants.map(([participantId, participantName]) => {
          const itemsForParticipant = groupItems.filter((item) =>
            (this.getAuthorId(item) === participantId || this.getParticipantName(item) === participantName)
            && Number(this.getWsRound(item)) === round
          );

          const items = itemsForParticipant.map((item, itemIdx) => {
            const imageUrl = this.getScreenshotUrl(item) || this.getThumbnailUrl(item) || '';
            return {
              id: this.getItemId(item) || `${participantId}-${round}-${itemIdx}`,
              title: this.getContentTitle(item) || `Item ${itemIdx + 1}`,
              imageUrl,
              hasImage: !!imageUrl,
            };
          });

          return {
            participantId,
            participantName,
            items,
          };
        });

        return {
          round,
          prompt,
          participants: participantRows,
        };
      });

      const unplaced = groupItems
        .filter((item) => {
          const participantKey = this.getAuthorId(item) || this.getParticipantName(item);
          const round = Number(this.getWsRound(item));
          return !participantKey || !Number.isFinite(round) || round < 1 || round > totalRounds;
        })
        .map((item) => ({
          id: this.getItemId(item) || '(no id)',
          reason: this.getItemSkipReason(item, totalRounds),
        }));

      return {
        id: group.id,
        name: group.name,
        color: group.color || '#607D8B',
        totalItems: groupItems.length,
        rounds,
        unplaced,
      };
    });
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

  private miroTokenStorageKey(): string {
    return `ws_miro_token_${this.workspace()}`;
  }

  private hasLocalStorage(): boolean {
    return typeof globalThis !== 'undefined' && typeof globalThis.localStorage !== 'undefined';
  }

  getStoredMiroBoardId(): string | null {
    const key = this.workspace();
    if (!key || !this.hasLocalStorage()) {
      return null;
    }
    try {
      return localStorage.getItem(this.miroBoardStorageKey());
    } catch {
      return null;
    }
  }

  private getStoredMiroToken(): string {
    const key = this.workspace();
    if (!key || !this.hasLocalStorage()) {
      return '';
    }
    try {
      return this.normalizeMiroToken(localStorage.getItem(this.miroTokenStorageKey()) || '');
    } catch {
      return '';
    }
  }

  private storeMiroToken(token: string): void {
    const key = this.workspace();
    if (!key || !this.hasLocalStorage()) {
      return;
    }
    try {
      localStorage.setItem(this.miroTokenStorageKey(), token);
    } catch {
      // Ignore storage write failures (SSR/private mode/quota) and continue export flow.
    }
  }

  private storeMiroBoardId(boardId: string): void {
    const key = this.workspace();
    if (!key || !this.hasLocalStorage()) {
      return;
    }
    try {
      localStorage.setItem(this.miroBoardStorageKey(), boardId);
    } catch {
      // Ignore storage write failures (SSR/private mode/quota) and continue export flow.
    }
  }

  private async computeExistingBoardStartY(token: string, boardId: string, appendMode: boolean): Promise<number> {
    if (!appendMode) {
      return 0;
    }

    try {
      const items = await this.getAllBoardItems(token, boardId);
      if (items.length === 0) {
        return 0;
      }

      let maxBottomY = 0;
      for (const item of items) {
        const posY = Number(item?.position?.y ?? 0);
        const h = Number(item?.geometry?.height ?? 0);
        const bottomY = posY + (Number.isFinite(h) ? h / 2 : 0);
        if (Number.isFinite(bottomY)) {
          maxBottomY = Math.max(maxBottomY, bottomY);
        }
      }

      // Keep generous spacing before appending a new export block.
      return maxBottomY + 800;
    } catch (error) {
      console.warn('[Miro Export] Could not inspect existing board items. Using fallback append offset.', error);
      return 3000;
    }
  }

  private async getAllBoardItems(token: string, boardId: string): Promise<any[]> {
    const all: any[] = [];
    let nextUrl = `https://api.miro.com/v2/boards/${boardId}/items?limit=50`;
    let pageCount = 0;
    const maxPages = 30;

    while (nextUrl && pageCount < maxPages) {
      const resp = await this.miroGet(token, nextUrl);
      const data = Array.isArray(resp?.data) ? resp.data : [];
      all.push(...data);
      nextUrl = resp?.links?.next || '';
      pageCount += 1;
    }

    return all;
  }

  private async getOrCreateBoardTag(
    token: string,
    boardId: string,
    tagCache: Map<string, string>,
    title: string,
    fillColor: string,
  ): Promise<string> {
    const normalizedTitle = this.canonicalizeTagTitle(title);
    const cacheKey = `${boardId}:${normalizedTitle}`;
    const cachedId = tagCache.get(cacheKey);
    if (cachedId) {
      return cachedId;
    }

    try {
      const tag = await this.miroPost(token, `https://api.miro.com/v2/boards/${boardId}/tags`, {
        title,
        fillColor,
      });

      const tagId = tag.id as string;
      tagCache.set(cacheKey, tagId);
      return tagId;
    } catch (err) {
      const message = (err instanceof Error ? err.message : String(err)).toLowerCase();
      const isDuplicate = message.includes('already exists') || message.includes('already_exist') || message.includes('duplicate');
      if (isDuplicate) {
        const existingId = await this.findBoardTagIdByTitle(token, boardId, normalizedTitle, tagCache);
        if (existingId) {
          return existingId;
        }
      }
      throw err;
    }
  }

  private async preloadBoardTags(token: string, boardId: string, tagCache: Map<string, string>): Promise<void> {
    const tags = await this.getAllBoardTags(token, boardId);
    for (const tag of tags) {
      const title = typeof tag?.title === 'string' ? tag.title : '';
      const id = typeof tag?.id === 'string' ? tag.id : '';
      if (!title || !id) {
        continue;
      }
      const normalizedTitle = this.canonicalizeTagTitle(title);
      tagCache.set(`${boardId}:${normalizedTitle}`, id);
    }
  }

  private async findBoardTagIdByTitle(
    token: string,
    boardId: string,
    normalizedTitle: string,
    tagCache: Map<string, string>,
  ): Promise<string | null> {
    const cacheKey = `${boardId}:${normalizedTitle}`;
    const cached = tagCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const tags = await this.getAllBoardTags(token, boardId);
    for (const tag of tags) {
      const tagTitle = typeof tag?.title === 'string' ? tag.title : '';
      const tagId = typeof tag?.id === 'string' ? tag.id : '';
      const normalizedTagTitle = this.canonicalizeTagTitle(tagTitle);
      if (tagTitle && tagId) {
        tagCache.set(`${boardId}:${normalizedTagTitle}`, tagId);
      }
      if (normalizedTagTitle === normalizedTitle && tagId) {
        return tagId;
      }
    }

    return null;
  }

  private canonicalizeTagTitle(title: string): string {
    const decoded = this.decodeHtmlEntities(title || '');
    return decoded.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  private decodeHtmlEntities(text: string): string {
    return text
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  private async getAllBoardTags(token: string, boardId: string): Promise<any[]> {
    const all: any[] = [];
    let nextUrl = `https://api.miro.com/v2/boards/${boardId}/tags?limit=50`;
    let pageCount = 0;
    const maxPages = 30;

    while (nextUrl && pageCount < maxPages) {
      const resp = await this.miroGet(token, nextUrl);
      const data = Array.isArray(resp?.data) ? resp.data : [];
      all.push(...data);
      nextUrl = resp?.links?.next || '';
      pageCount += 1;
    }

    return all;
  }

  private async attachTagToItem(token: string, boardId: string, itemId: string, tagId: string): Promise<void> {
    const encodedItemId = encodeURIComponent(itemId);
    const url = `https://api.miro.com/v2/boards/${boardId}/items/${encodedItemId}?tag_id=${encodeURIComponent(tagId)}`;
    // Retry attach in case of transient API hiccups.
    const attempts = 3;
    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        await this.miroPostNoContent(token, url);
        return;
      } catch (error) {
        if (attempt === attempts - 1) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 250 + attempt * 200));
      }
    }
  }

  private async miroGet(token: string, url: string): Promise<any> {
    if (!token) {
      throw new Error('Miro token is missing. Paste a personal access token and try again.');
    }
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
    if (!token) {
      throw new Error('Miro token is missing. Paste a personal access token and try again.');
    }
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

  private async miroPostNoContent(token: string, url: string): Promise<void> {
    if (!token) {
      throw new Error('Miro token is missing. Paste a personal access token and try again.');
    }
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Miro API error ${resp.status}: ${text}`);
    }
  }
}
