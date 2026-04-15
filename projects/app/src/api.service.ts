import { HttpClient } from '@angular/common/http';
import { computed, effect, Inject, Injectable, LOCALE_ID, NgZone, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of, ReplaySubject, shareReplay, switchMap, tap, timer } from 'rxjs';

export type DiscussResult = {
  complete: boolean;
  message: string;
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
  wsGroupId = signal<string | null>(null); // Strategic workshop: assigned group ID
  wsParticipantName = signal<string | null>(null); // Strategic workshop: participant display name
  wsStrategic = signal<boolean>(false); // Strategic workshop mode
  uploadImageInProgress = new ReplaySubject<boolean>(1);
  currentlyUploadingImage = signal<boolean>(false);
  currentUpload$: Observable<{item_id: string, item_key: string}> | null = null;
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

    const wsStrategic = !!route.queryParams['ws_strategic'];
    this.wsStrategic.set(wsStrategic);
    const wsGroupId = route.queryParams['ws_group'] || null;
    if (wsGroupId) {
      this.wsGroupId.set(wsGroupId);
    }
    const wsParticipantName = route.queryParams['participant_name'] || null;
    if (wsParticipantName) {
      this.wsParticipantName.set(wsParticipantName);
    }

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
    this.currentUpload$ = of({item_id, item_key});
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

  startBackgroundUpload(image: Blob, metadata?: Record<string, any>): void {
    // Reset item state to prevent stale data from previous items
    this.item.set({});
    this.itemId.set(null);
    this.itemKey.set(null);
    this.uploadImageInProgress.next(true);

    // Snapshot metadata to prevent mutation by caller
    const metadataSnapshot = metadata ? { ...metadata } : undefined;

    this.currentUpload$ = this.startDiscussion(image, undefined, undefined, metadataSnapshot).pipe(
      map((data: any) => {
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        this.uploadImageInProgress.next(false);
        // Fire background work: apply metadata then send init message
        const background$ = (metadataSnapshot && Object.keys(metadataSnapshot).length > 0)
          ? this.updateProperties(metadataSnapshot, item_id, item_key).pipe(
              switchMap(() => this.sendInitMessageNoStream(item_id, item_key))
            )
          : this.sendInitMessageNoStream(item_id, item_key);
        background$.subscribe();
        return { item_id, item_key };
      }),
      shareReplay(1)
    );

    // Subscribe to kick off the HTTP request
    this.currentUpload$.subscribe();
  }

  uploadImage(image: Blob, metadata?: Record<string, any>): Observable<{ item_id: string; item_key: string }> {
    this.uploadImageInProgress.next(true);
    return this.startDiscussion(image).pipe(
      map((data: any) => {
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        this.uploadImageInProgress.next(false);
        // Fire background work: apply metadata then send init message
        const background$ = (metadata && Object.keys(metadata).length > 0)
          ? this.updateProperties(metadata, item_id, item_key).pipe(
              switchMap(() => this.sendInitMessageNoStream(item_id, item_key))
            )
          : this.sendInitMessageNoStream(item_id, item_key);
        background$.subscribe();
        return { item_id, item_key };
      })
    );
  }

  uploadImageAuto(image: Blob, metadata?: Record<string, any>): Observable<any> {
    this.uploadImageInProgress.next(true);
    this.startDiscussion(image).pipe(
      switchMap((data: any) => {
        const item_id = data.item_id || data.metadata?.item_id;
        const item_key = data.item_key || data.metadata?.item_key;
        this.uploadImageInProgress.next(false);
        if (metadata && Object.keys(metadata).length > 0) {
          return this.updateProperties(metadata, item_id, item_key);
        }
        return of(true);
      })
    ).subscribe(() => {
      console.log('Auto upload image complete');
    });
    return timer(2000);
  }

  startDiscussion(image: Blob, item_id?: string, item_key?: string, metadata?: Record<string, any>): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
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
        this.item.set(Object.assign({}, data.metadata, { item_id, item_key }));
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
