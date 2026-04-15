import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WsGroup } from '../admin/workspace-metadata.interface';

export interface WsComment {
  id: string;
  text: string;
  author?: string;
  created_at: string;
  color?: string;
}

export interface WsItem {
  id: string;
  screenshot_url?: string;
  thumbnail_url?: string;
  author_id?: string;
  participant_name?: string;
  ws_group_id?: string;
  ws_round?: number;
  ws_comments?: WsComment[];
  // layout position for drag-and-drop (normalized 0-1)
  ws_layout_x?: number;
  ws_layout_y?: number;
  [key: string]: any;
}

interface GroupRow {
  group: WsGroup;
  participants: ParticipantRow[];
}

interface ParticipantRow {
  authorId: string;
  participantName: string;
  rounds: (WsItem | null)[];
}

const COMMENT_COLORS = ['#FFD600', '#FF6D00', '#E040FB', '#40C4FF', '#69F0AE'];

@Component({
  selector: 'app-showcase-ws-strategic',
  imports: [],
  templateUrl: './showcase-ws-strategic.component.html',
  styleUrl: './showcase-ws-strategic.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseWsStrategicComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';

  workspace = signal<string>('');
  apiKey = signal<string>('');
  adminKey = signal<string>('');

  workspaceMeta = signal<any>(null);
  items = signal<WsItem[]>([]);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);

  // Comment UI state
  commentTargetId = signal<string | null>(null);
  commentText = signal('');
  commentColor = signal(COMMENT_COLORS[0]);
  commentColors = COMMENT_COLORS;

  // Drag state
  private dragItem: WsItem | null = null;
  private dragStartX = 0;
  private dragStartY = 0;

  // View mode: 'grid' = groups×participants×rounds table, 'sticky' = sticky notes on SVG
  viewMode = signal<'grid' | 'sticky'>('grid');

  groups = computed<WsGroup[]>(() => {
    const meta = this.workspaceMeta();
    return meta?.metadata?.ws_groups || meta?.ws_groups || [];
  });

  totalRounds = computed<number>(() => {
    const meta = this.workspaceMeta();
    return meta?.metadata?.ws_rounds || meta?.ws_rounds || 4;
  });

  roundPrompts = computed<string[]>(() => {
    const meta = this.workspaceMeta();
    return meta?.metadata?.ws_round_prompts || meta?.ws_round_prompts || [];
  });

  roundIndices = computed<number[]>(() => {
    return Array.from({ length: this.totalRounds() }, (_, i) => i + 1);
  });

  groupRows = computed<GroupRow[]>(() => {
    const groups = this.groups();
    const items = this.items();
    const totalRounds = this.totalRounds();

    if (groups.length === 0) {
      // No groups configured: show all items grouped by author
      const authorMap = new Map<string, WsItem[]>();
      for (const item of items) {
        const key = item.author_id || 'unknown';
        if (!authorMap.has(key)) authorMap.set(key, []);
        authorMap.get(key)!.push(item);
      }
      const participants: ParticipantRow[] = Array.from(authorMap.entries()).map(([authorId, authorItems]) => ({
        authorId,
        participantName: authorItems.find(i => i.participant_name)?.participant_name || authorId.slice(0, 8),
        rounds: Array.from({ length: totalRounds }, (_, i) =>
          authorItems.find(item => item.ws_round === i + 1) || null
        ),
      }));
      return [{ group: { id: 'all', name: 'All Participants' }, participants }];
    }

    return groups.map(group => {
      const groupItems = items.filter(item => item.ws_group_id === group.id);
      const authorMap = new Map<string, WsItem[]>();
      for (const item of groupItems) {
        const key = item.author_id || 'unknown';
        if (!authorMap.has(key)) authorMap.set(key, []);
        authorMap.get(key)!.push(item);
      }
      const participants: ParticipantRow[] = Array.from(authorMap.entries()).map(([authorId, authorItems]) => ({
        authorId,
        participantName: authorItems.find(i => i.participant_name)?.participant_name || authorId.slice(0, 8),
        rounds: Array.from({ length: totalRounds }, (_, i) =>
          authorItems.find(item => item.ws_round === i + 1) || null
        ),
      }));
      return { group, participants };
    });
  });

  // All comments across all items (for sticky notes view)
  allComments = computed<Array<WsComment & { item: WsItem }>>(() => {
    const result: Array<WsComment & { item: WsItem }> = [];
    for (const item of this.items()) {
      for (const comment of item.ws_comments || []) {
        result.push({ ...comment, item });
      }
    }
    return result;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const ws = params['workspace'] || '';
      const apiKey = params['api_key'] || '';
      const adminKey = params['admin_key'] || apiKey;
      this.workspace.set(ws);
      this.apiKey.set(apiKey);
      this.adminKey.set(adminKey);

      if (ws && apiKey) {
        this.loadWorkspace(ws, apiKey);
        this.loadItems(ws, apiKey);
      }
    });
  }

  private loadWorkspace(workspaceId: string, apiKey: string) {
    this.http.get(`${this.CHRONOMAPS_API_URL}/${workspaceId}`, {
      headers: { Authorization: apiKey }
    }).subscribe({
      next: (data: any) => {
        this.workspaceMeta.set(data);
      },
      error: (err) => {
        console.error('Error loading workspace:', err);
        this.errorMsg.set('Failed to load workspace');
      }
    });
  }

  private loadItems(workspaceId: string, apiKey: string) {
    this.isLoading.set(true);
    this.http.get<WsItem[]>(`${this.CHRONOMAPS_API_URL}/${workspaceId}/items`, {
      headers: { Authorization: apiKey },
      params: { page_size: '500', order_by: 'created_at' }
    }).subscribe({
      next: (data: any) => {
        const items: WsItem[] = Array.isArray(data) ? data : (data?.items || []);
        // Normalize item shape (API may return {id, metadata:{...}} or flat)
        const normalized = items.map((item: any) => {
          if (item.metadata) {
            return { id: item.id, ...item.metadata };
          }
          return item;
        });
        this.items.set(normalized);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.errorMsg.set('Failed to load items');
        this.isLoading.set(false);
      }
    });
  }

  // ---- Comment management ----

  openCommentPanel(itemId: string) {
    this.commentTargetId.set(itemId);
    this.commentText.set('');
  }

  closeCommentPanel() {
    this.commentTargetId.set(null);
  }

  submitComment() {
    const targetId = this.commentTargetId();
    const text = this.commentText().trim();
    if (!targetId || !text) return;

    const comment: WsComment = {
      id: crypto.randomUUID(),
      text,
      created_at: new Date().toISOString(),
      color: this.commentColor(),
    };

    // Optimistically update local state
    this.items.update(items => items.map(item => {
      if (item.id === targetId) {
        return { ...item, ws_comments: [...(item.ws_comments || []), comment] };
      }
      return item;
    }));

    // Persist to API
    const ws = this.workspace();
    const apiKey = this.apiKey();
    if (ws && apiKey) {
      const item = this.items().find(i => i.id === targetId);
      const updatedComments = item?.ws_comments || [];
      this.http.put(
        `${this.CHRONOMAPS_API_URL}/${ws}/${targetId}`,
        { ws_comments: updatedComments },
        { headers: { Authorization: apiKey } }
      ).subscribe({
        error: (err) => console.error('Failed to save comment:', err)
      });
    }

    this.closeCommentPanel();
  }

  deleteComment(itemId: string, commentId: string) {
    this.items.update(items => items.map(item => {
      if (item.id === itemId) {
        return { ...item, ws_comments: (item.ws_comments || []).filter(c => c.id !== commentId) };
      }
      return item;
    }));

    // Persist to API
    const ws = this.workspace();
    const apiKey = this.apiKey();
    if (ws && apiKey) {
      const item = this.items().find(i => i.id === itemId);
      const updatedComments = item?.ws_comments || [];
      this.http.put(
        `${this.CHRONOMAPS_API_URL}/${ws}/${itemId}`,
        { ws_comments: updatedComments },
        { headers: { Authorization: apiKey } }
      ).subscribe({
        error: (err) => console.error('Failed to delete comment:', err)
      });
    }
  }

  // ---- Drag & Drop for screenshot positions ----

  onItemDragStart(event: DragEvent, item: WsItem) {
    this.dragItem = item;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onContainerDrop(event: DragEvent, container: HTMLElement) {
    event.preventDefault();
    if (!this.dragItem) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    this.updateItemLayout(this.dragItem.id, x, y);
    this.dragItem = null;
  }

  onContainerDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  resetItemPosition(item: WsItem) {
    this.updateItemLayout(item.id, undefined, undefined);
  }

  private updateItemLayout(itemId: string, x: number | undefined, y: number | undefined) {
    this.items.update(items => items.map(item => {
      if (item.id === itemId) {
        return { ...item, ws_layout_x: x, ws_layout_y: y };
      }
      return item;
    }));

    const ws = this.workspace();
    const apiKey = this.apiKey();
    if (ws && apiKey) {
      this.http.put(
        `${this.CHRONOMAPS_API_URL}/${ws}/${itemId}`,
        { ws_layout_x: x ?? null, ws_layout_y: y ?? null },
        { headers: { Authorization: apiKey } }
      ).subscribe({
        error: (err) => console.error('Failed to update layout:', err)
      });
    }
  }

  // ---- Helpers ----

  getRoundLabel(roundIndex: number): string {
    const prompts = this.roundPrompts();
    const prompt = prompts[roundIndex - 1];
    return prompt ? `R${roundIndex}: ${prompt}` : `Round ${roundIndex}`;
  }

  getItemStyle(item: WsItem): any {
    if (item.ws_layout_x !== undefined && item.ws_layout_y !== undefined) {
      return {
        position: 'absolute',
        left: `${item.ws_layout_x * 100}%`,
        top: `${item.ws_layout_y * 100}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      };
    }
    return {};
  }

  getItemImageUrl(item: WsItem): string {
    return item.thumbnail_url || item.screenshot_url || '';
  }

  getGroupColor(group: WsGroup): string {
    return group.color || '#607D8B';
  }

  trackById(index: number, item: WsItem): string {
    return item.id;
  }

  trackByGroupId(index: number, row: GroupRow): string {
    return row.group.id;
  }

  trackByAuthorId(index: number, row: ParticipantRow): string {
    return row.authorId;
  }

  trackByCommentId(index: number, comment: WsComment): string {
    return comment.id;
  }

  openParticipantLink(group: WsGroup) {
    const ws = this.workspace();
    const apiKey = this.apiKey();
    const url = `${window.location.origin}/canvas-creator?workspace=${ws}&api_key=${apiKey}&ws=true&ws_strategic=true&ws_group=${group.id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    alert(`Participant link for "${group.name}" copied to clipboard:\n${url}`);
  }
}
