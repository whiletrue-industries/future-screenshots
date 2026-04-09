import { HttpClient } from '@angular/common/http';
import { computed, effect, Inject, Injectable, LOCALE_ID, NgZone, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of, ReplaySubject, switchMap, tap, throwError, timer } from 'rxjs';

export type DiscussResult = {
  complete: boolean;
  message: string;
};

export type UploadStatus = 'idle' | 'uploading' | 'uploaded' | 'failed';

type WorkshopFlowState = {
  itemId: string | null;
  itemKey: string | null;
  pendingMetadata: Record<string, any>;
  updateInFlight: boolean;
  retryTimer: ReturnType<typeof setTimeout> | null;
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';
  COMPLETE_FLOW_URL = 'https://complete-flow-qjzuw7ypfq-ez.a.run.app';
  SCREENSHOT_HANDLER_URL = 'https://screenshot-handler-qjzuw7ypfq-ez.a.run.app';
  ITEM_INGRES_AGENT_URL = 'https://item-ingress-agent-qjzuw7ypfq-ez.a.run.app';
  private REPLACE_IMAGE_URL = 'https://replace-image-qjzuw7ypfq-ez.a.run.app';
  private REANALYZE_ITEM_URL = 'https://reanalyze-item-qjzuw7ypfq-ez.a.run.app';

  // WORKSPACE = '4d2c04b0-51b7-4aa2-a234-0e4be53447de';
  // API_KEY = 'f290c30a-8819-42a0-aa0b-77f5582b4a2f';

  item = signal<any>(null);
  api_key = signal<string | null>(null);
  workspaceId = signal<string | null>(null);
  itemId = signal<string | null>(null);
  itemKey = signal<string | null>(null);
  automatic = signal<boolean>(false);
  demo = signal<boolean>(false);
  replaceItemId = signal<string | null>(null);
  replaceItemKey = signal<string | null>(null);
  workspace = signal<any>({});
  isWorkshop = signal<boolean>(false);
  isWorkshopFollowup = signal<boolean>(false);
  uploadImageInProgress = new ReplaySubject<boolean>(1);
  currentlyUploadingImage = signal<boolean>(false);
  uploadStatus = signal<UploadStatus>('idle');
  uploadStatusMessage = signal<string | null>(null);
  private workshopFlows = new Map<string, WorkshopFlowState>();
  private readonly WORKSHOP_FLOW_RETRY_MS = 2000;
  locale = 'en';

  passwordProtected = computed(() => {
    const workspace = this.workspace();
    console.log('WORKSPACE', workspace, 'PASSWORD PROTECTED', workspace?.password_protected);
    if (workspace && workspace.password_protected) {
      return true;
    }
    return false;
  });

  showNoPaperOption = computed(() => {
    const workspace = this.workspace();
    // Check if workspace has enable_no_paper setting, default to true if not set
    return workspace?.enable_no_paper !== false;
  });

  constructor(private http: HttpClient, private zone: NgZone, @Inject(LOCALE_ID) public locale_: string) {
    this.locale = locale_.split('-')[0]; // Use the first part of the locale, e.g., 'nl' from 'nl-NL'
    this.uploadImageInProgress.next(false);
    this.uploadImageInProgress.subscribe((inProgress) => {
      this.currentlyUploadingImage.set(inProgress);
    });
    effect(() => {
      const workspaceId = this.workspaceId();
      if (workspaceId) {
        this.fetchWorkspace(workspaceId).subscribe();
      }
    });
  }

  updateFromRoute(route: ActivatedRouteSnapshot) {
    const workspace = route.queryParams['workspace'] || this.workspaceId();
    const api_key = route.queryParams['api_key'] || route.queryParams['admin_key'] || this.api_key();
    const automatic = route.queryParams['automatic'] || this.automatic();
    const demo = route.queryParams['demo'] || this.demo();
    if (automatic) {
      this.automatic.set(automatic === 'true');
    }
    if (demo) {
      this.demo.set(demo === 'true');
    }
    if (api_key) {
      this.api_key.set(api_key);
    }
    if (workspace) {
      this.workspaceId.set(workspace);
    }

    const replaceItem = route.queryParams['replace_item'];
    if (replaceItem) {
      this.replaceItemId.set(replaceItem);
    }
    const replaceItemKey = route.queryParams['replace_item_key'];
    if (replaceItemKey) {
      this.replaceItemKey.set(replaceItemKey);
    }

    const isWorkshop = !!route.queryParams['ws'];
    this.isWorkshop.set(isWorkshop);
    const isWorkshopFollowup = !!route.queryParams['wsf'];
    this.isWorkshopFollowup.set(isWorkshopFollowup);

    const item_key = route.queryParams['key'];
    const item_id = route.queryParams['item-id'];
    if (item_id) {
      this.itemKey.set(item_key);
      this.itemId.set(item_id);
      this.fetchItem(item_id, item_key).subscribe();
    }
  }

  fetchWorkspace(workspaceId: string): Observable<any> {
    const apiKey = this.api_key();
    const headers: Record<string, string> = {};
    if (apiKey) {
      headers['Authorization'] = apiKey;
    }

    return this.http.get(`${this.CHRONOMAPS_API_URL}/${workspaceId}`, { headers }).pipe(
      map((response: any) => {
        this.workspace.set(response);
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching workspace:', error);
        return of(null);
      })
    );
  }

  fetchItem(item_id: string, item_key: string): Observable<any> { 
    const params: any = item_key ? {
      'item-key': item_key,
    } : {};
    const headers: any = this.api_key() ? {
      'Authorization': this.api_key(),
    } : {};
    return this.http.get(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}/${item_id}`, {params, headers}).pipe(
      map((response: any) => {
        response.item_id = item_id;
        response.item_key = item_key;
        this.item.set(response);
        return response;
      })
    );
  }

  createItem(metadata: any): Observable<any> {
    const headers: any = {
      'Authorization': this.api_key(),
    };
    console.log('[API] createItem with metadata:', metadata);
    return this.http.post(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}`, metadata, { headers }).pipe(
      map((response: any) => {
        console.log('[API] createItem response:', response);
        // Merge with response first, then override with user metadata to preserve user-set values
        const item = Object.assign({}, response, metadata);
        console.log('[API] final item in signal:', item);
        this.item.set(item);
        return item;
      })
    );
  }

  updateItem(metadata: any, item_id: string, item_key: string): Observable<any> {
    const params = {
      'item_key': item_key,
      'item_id': item_id,
      'workspace': this.workspaceId() as string,
      'api_key': this.api_key() as string,
      'locale': this.locale,
      'workshop': this.isWorkshop() ? 'true' : 'false',
    };
    return this.http.post(this.COMPLETE_FLOW_URL, metadata, { params }).pipe(
      map(() => {
        this.item.update((item: any) => {
          return Object.assign({}, item, metadata);
        });
        return true;
      })
    );
  }

  updateProperties(metadata: any, item_id: string, item_key?: string): Observable<any> {
    const headers: Record<string, string> = {};
    const apiKey = this.api_key();
    if (apiKey) {
      headers['Authorization'] = apiKey;
    }
    let params: any = {};
    if (item_key) {
      params['item-key'] = item_key;  
    }
    return this.http.put(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}/${item_id}`, metadata, { headers, params }).pipe(
      map(() => {
        return true;
      })
    );
  }

  /**
   * Activate or adjust temporary collaboration for a workspace.
   * When `properties` IS provided, `timeSeconds` is duration from now.
   * When `properties` is OMITTED, `timeSeconds` is a delta on the existing expiry.
   */
  setTemporaryCollaboration(
    workspaceId: string, adminKey: string, timeSeconds: number, properties?: string
  ): Observable<{ expiry: string; ttl: number; allowed_properties: string[] }> {
    const headers = { 'Authorization': adminKey };
    const params: Record<string, string> = { time: String(timeSeconds) };
    if (properties !== undefined) {
      params['properties'] = properties;
    }
    return this.http.post<{ expiry: string; ttl: number; allowed_properties: string[] }>(
      `${this.CHRONOMAPS_API_URL}/${workspaceId}/temporary-collaboration`, null, { headers, params }
    );
  }

  /**
   * Delete (cancel) temporary collaboration for a workspace immediately.
   */
  deleteTemporaryCollaboration(workspaceId: string, adminKey: string): Observable<any> {
    const headers = { 'Authorization': adminKey };
    return this.http.delete(`${this.CHRONOMAPS_API_URL}/${workspaceId}/temporary-collaboration`, { headers });
  }

  /**
   * Fetch workspace data with an explicit auth token (no signal side-effects).
   */
  fetchWorkspaceRaw(workspaceId: string, authToken?: string): Observable<any> {
    const headers: Record<string, string> = {};
    if (authToken) {
      headers['Authorization'] = authToken;
    }
    return this.http.get(`${this.CHRONOMAPS_API_URL}/${workspaceId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching workspace:', error);
        return of(null);
      })
    );
  }

  uploadImage(image: Blob, metadata?: Record<string, any>): Observable<{ item_id: string; item_key: string }> {
    this.setUploadState('uploading');
    return this.startDiscussion(image).pipe(
      map((data: any) => {
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        this.setUploadState('uploaded');
        // Fire background work: apply metadata then send init message
        const background$ = (metadata && Object.keys(metadata).length > 0)
          ? this.updateProperties(metadata, item_id, item_key).pipe(
              switchMap(() => this.sendInitMessageNoStream(item_id, item_key))
            )
          : this.sendInitMessageNoStream(item_id, item_key);
        background$.subscribe();
        return { item_id, item_key };
      }),
      catchError((error) => {
        this.setUploadState('failed', this.getUploadErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  uploadImageAuto(image: Blob, metadata?: Record<string, any>): Observable<any> {
    this.setUploadState('uploading');
    this.startDiscussion(image).pipe(
      switchMap((data: any) => {
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        if (metadata && Object.keys(metadata).length > 0) {
          return this.updateProperties(metadata, item_id, item_key);
        }
        return of(true);
      }),
      tap(() => {
        this.setUploadState('uploaded');
      }),
      catchError((error) => {
        this.setUploadState('failed', this.getUploadErrorMessage(error));
        return of(null);
      })
    ).subscribe((result) => {
      if (result !== null) {
        console.log('Auto upload image complete');
      }
    });
    return timer(2000);
  }

  createWorkshopFlow(): string {
    const flowId = `wf_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    this.workshopFlows.set(flowId, {
      itemId: null,
      itemKey: null,
      pendingMetadata: {},
      updateInFlight: false,
      retryTimer: null,
    });
    return flowId;
  }

  uploadWorkshopFlow(flowId: string, image: Blob, metadata?: Record<string, any>): void {
    this.ensureWorkshopFlow(flowId);
    this.uploadImage(image, metadata).subscribe({
      next: (res) => {
        const state = this.ensureWorkshopFlow(flowId);
        state.itemId = res.item_id;
        state.itemKey = res.item_key;
        this.flushWorkshopFlow(flowId);
      },
      error: (error) => {
        console.error('[API] Workshop flow upload failed:', flowId, error);
      }
    });
  }

  queueWorkshopFlowMetadata(flowId: string, metadata: Record<string, any>): void {
    if (!metadata || Object.keys(metadata).length === 0) {
      return;
    }

    const state = this.ensureWorkshopFlow(flowId);
    state.pendingMetadata = Object.assign({}, state.pendingMetadata, metadata);
    this.flushWorkshopFlow(flowId);
  }

  private ensureWorkshopFlow(flowId: string): WorkshopFlowState {
    let state = this.workshopFlows.get(flowId);
    if (!state) {
      state = {
        itemId: null,
        itemKey: null,
        pendingMetadata: {},
        updateInFlight: false,
        retryTimer: null,
      };
      this.workshopFlows.set(flowId, state);
    }
    return state;
  }

  private scheduleWorkshopFlowRetry(flowId: string): void {
    const state = this.workshopFlows.get(flowId);
    if (!state || state.retryTimer !== null) {
      return;
    }

    state.retryTimer = setTimeout(() => {
      const activeState = this.workshopFlows.get(flowId);
      if (!activeState) {
        return;
      }
      activeState.retryTimer = null;
      this.flushWorkshopFlow(flowId);
    }, this.WORKSHOP_FLOW_RETRY_MS);
  }

  private clearWorkshopFlowRetry(flowId: string): void {
    const state = this.workshopFlows.get(flowId);
    if (!state?.retryTimer) {
      return;
    }
    clearTimeout(state.retryTimer);
    state.retryTimer = null;
  }

  private flushWorkshopFlow(flowId: string): void {
    const state = this.workshopFlows.get(flowId);
    if (!state || state.updateInFlight) {
      return;
    }

    if (Object.keys(state.pendingMetadata).length === 0) {
      if (state.itemId && state.itemKey) {
        this.clearWorkshopFlowRetry(flowId);
      }
      return;
    }

    if (!state.itemId || !state.itemKey) {
      this.scheduleWorkshopFlowRetry(flowId);
      return;
    }

    const updatePayload = { ...state.pendingMetadata };
    state.pendingMetadata = {};
    state.updateInFlight = true;
    this.clearWorkshopFlowRetry(flowId);

    this.updateItem(updatePayload, state.itemId, state.itemKey).subscribe({
      next: () => {
        const activeState = this.workshopFlows.get(flowId);
        if (!activeState) {
          return;
        }
        activeState.updateInFlight = false;
        if (Object.keys(activeState.pendingMetadata).length > 0) {
          this.flushWorkshopFlow(flowId);
        }
      },
      error: (error) => {
        const activeState = this.workshopFlows.get(flowId);
        if (!activeState) {
          return;
        }
        activeState.updateInFlight = false;
        activeState.pendingMetadata = Object.assign({}, updatePayload, activeState.pendingMetadata);
        console.warn('[API] Workshop flow metadata update failed, scheduling retry:', flowId, error);
        this.scheduleWorkshopFlowRetry(flowId);
      }
    });
  }

  private setUploadState(status: UploadStatus, message: string | null = null): void {
    this.uploadImageInProgress.next(status === 'uploading');
    this.uploadStatus.set(status);
    this.uploadStatusMessage.set(message);
  }

  private getUploadErrorMessage(error: any): string {
    if (error?.status === 403) {
      return 'Access denied. Please check API key permissions.';
    }
    if (typeof error?.message === 'string' && error.message.trim()) {
      return error.message;
    }
    return 'Upload failed. You can continue and try another screenshot.';
  }

  startDiscussion(image: Blob, item_id?: string, item_key?: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
    };
    if (item_id) {
      params['item_id'] = item_id;
    }
    if (item_key) {
      params['item_key'] = item_key;
    }
    if (this.automatic()) {
      params['automatic'] = 'true';
    }
    return this.http.post(this.SCREENSHOT_HANDLER_URL, formData, { params }).pipe(
      tap((data: any) => {
        console.log('Screenshot uploaded successfully', data.metadata);
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        this.item.update((item: any) => {
          return Object.assign({}, item, data.metadata, { item_id, item_key });
        });
        this.itemId.set(item_id);
        this.itemKey.set(item_key);
      })
    );
  }

  sendInitMessageNoStream(item_id: string, item_key: string): Observable<any> {
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
      item_id,
      item_key,
      message: 'initial',
      stream: 'false',
    };
    return this.http.get(`${this.ITEM_INGRES_AGENT_URL}`, {params}).pipe(
      map((response: any) => {
        return response.status;
      })
    );
  }

  sendMessage(message: string): Observable<any> {
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
      item_id: this.item().item_id,
      item_key: this.item().item_key,
      message: message,
    };
    // return this.http.get(`${this.ITEM_INGRES_AGENT_URL}`, {params}).pipe(
    //   map((response: any) => {
    //     return response as DiscussResult;
    //   })
    // );
    return new Observable(observer => {
      const url = `${this.ITEM_INGRES_AGENT_URL}?${new URLSearchParams(params).toString()}`;
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event) => {
        // console.log('EVENT', event);
        try {
          this.zone.run(() => {
            observer.next(JSON.parse(event.data));
          });
        } catch (error) {
          console.error('PARSE ERROR', error);
          observer.error(error);
        }
      };
      eventSource.onerror = (error) => {
        // Treat stream errors as graceful completion so UI can unblock
        const readyState = (eventSource as any)?.readyState;
        if (readyState === EventSource.CLOSED || readyState === EventSource.CONNECTING) {
          this.zone.run(() => {
            // Emit a distinct stream-error status so callers can treat it as recoverable
            observer.next({ kind: 'status', status: 'stream-error' });
            observer.complete();
          });
        } else {
          this.zone.run(() => {
            observer.error(error);
          });
        }
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    });    
  }

  replaceImage(image: Blob, itemId: string, itemKey?: string): Observable<{ item_id: string; screenshot_url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
      item_id: itemId,
    };
    if (itemKey) {
      params.item_key = itemKey;
    }
    return this.http.post<{ item_id: string; screenshot_url: string }>(this.REPLACE_IMAGE_URL, formData, { params });
  }

  reanalyzeItem(itemId: string, itemKey?: string): Observable<any> {
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
      item_id: itemId,
    };
    if (itemKey) {
      params.item_key = itemKey;
    }
    return this.http.post<any>(this.REANALYZE_ITEM_URL, null, { params });
  }

  getAvailableTags(): string[] {
    const workspace = this.workspace();
    if (!workspace || !workspace.items) {
      return [];
    }
    
    const tagsSet = new Set<string>();
    workspace.items.forEach((item: any) => {
      if (Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          if (typeof tag === 'string' && tag.trim()) {
            tagsSet.add(tag.trim());
          }
        });
      }
    });
    
    return Array.from(tagsSet).sort();
  }
}
