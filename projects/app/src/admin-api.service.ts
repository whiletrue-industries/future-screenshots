import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './app/auth.service';
import { CreateOrUpdateWorkspaceRequest, Workspace } from './app/admin/workspace-metadata.interface';
import { NOW_GLOBAL_KEY, NowTarget, parseNowTarget } from './app/shared/now-target.service';

export interface MapRebuildEvent {
  seconds: number;
  message: string;
  error: string | null;
  /** The new map is published. */
  done: boolean;
  /** The workspace has no usable items, so no map was written. */
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';
  private REPLACE_IMAGE_URL = 'https://replace-image-qjzuw7ypfq-ez.a.run.app';
  private REANALYZE_ITEM_URL = 'https://reanalyze-item-qjzuw7ypfq-ez.a.run.app';
  private CLUSTER_SCREENSHOTS_URL = 'https://cluster-screenshots-qjzuw7ypfq-ez.a.run.app';
  public ADMIN_PAGE_SIZE = 5000;

  constructor(private http: HttpClient, private auth: AuthService) { }

  listWorkspaces(): Observable<any[]> {
    const headers: any = { 'Authorization': 'Bearer ' + this.auth.token() };
    return this.http.get<any[]>(`${this.CHRONOMAPS_API_URL}/`, { headers }).pipe(
      map((response: any) => response.workspaces || []),
      catchError((error) => {
        console.error('Error fetching workspaces:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getWorkspace(workspace: string, api_key: string): Observable<any> {
    return this.http.get<any>(`${this.CHRONOMAPS_API_URL}/${workspace}`, {
      headers: {
        'Authorization': `${api_key}`
      }
    });
  }

  getItems(workspace: string, api_key: string, page: number, filters: string | null): Observable<any> {
    let params: any = {
      page: page,
      page_size: this.ADMIN_PAGE_SIZE,
      include_embedding: 'false'
    };
    if (filters) {
      params.filters = filters;
    } else {
      params.order_by = '';
    }
    return this.http.get<any[]>(`${this.CHRONOMAPS_API_URL}/${workspace}/items`, {
      params,
      headers: {
        'Authorization': `${api_key}`
      }
    }).pipe(
      catchError((error) => {
        console.error('Error fetching items:', error.error);
        return of(error.error); // Return null or handle the error as needed
      })
    );
  }

  updateItem(workspace: string, api_key: string, itemId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.CHRONOMAPS_API_URL}/${workspace}/${itemId}`, data, {
      headers: {
        'Authorization': `${api_key}`
      },
    });
  }

  updateItemModeration(workspace: string, api_key: string, itemId: string, moderation: number): Observable<any> {
    const data = {
      _private_moderation: moderation
    };
    return this.http.put<any>(`${this.CHRONOMAPS_API_URL}/${workspace}/${itemId}`, data, {
      headers: {
        'Authorization': `${api_key}`
      },
    });
  }

  createItem(workspace: string, api_key: string, metadata: any): Observable<any> {
    return this.http.post<any>(`${this.CHRONOMAPS_API_URL}/${workspace}`, metadata, {
      headers: {
        'Authorization': `${api_key}`
      }
    });
  }

  createWorkspace(request: CreateOrUpdateWorkspaceRequest): Observable<Workspace> {
    const headers = { 'Authorization': 'Bearer ' + this.auth.token() };
    return this.http.post<Workspace>(`${this.CHRONOMAPS_API_URL}/`, request.metadata, { headers }).pipe(
      switchMap((resp: any) => {
        const workspace: Workspace = {
          id: resp.workspace_id,
          metadata: resp.config.metadata!,
          keys: resp.config.keys
        }
        console.log('Created workspace:', workspace);
        return this.updateWorkspace(workspace.id, workspace.keys!.admin, {
          metadata: null,
          public: request.public,
          collaborate: request.collaborate
        }).pipe(map(() => workspace));
      })
    );
  }

  updateWorkspace(workspaceId: string, adminKey: string, request: CreateOrUpdateWorkspaceRequest): Observable<any> {
    const headers = { 'Authorization': adminKey };
    let params: any = {};
    params.public = request.public;
    params.collaborate = request.collaborate;
    return this.http.put<any>(`${this.CHRONOMAPS_API_URL}/${workspaceId}`, request.metadata || {}, { headers, params });
  }

  /**
   * Writes a value to the per-database global key-value store
   * (`PUT /global/<key>`). Requires an admin Firebase token.
   */
  setGlobalKey<T>(key: string, value: T): Observable<{ key: string; value: T; updated_at: string }> {
    const headers = { 'Authorization': 'Bearer ' + this.auth.token() };
    return this.http.put<{ key: string; value: T; updated_at: string }>(
      `${this.CHRONOMAPS_API_URL}/global/${encodeURIComponent(key)}`, value, { headers }
    );
  }

  /** Sets (or clears, with `null`) the `/#now` quick-link target. */
  setNowTarget(target: NowTarget | null): Observable<NowTarget | null> {
    return this.setGlobalKey<NowTarget | null>(NOW_GLOBAL_KEY, target).pipe(
      map(response => parseNowTarget(response?.value))
    );
  }

  replaceImage(workspace: string, apiKey: string, itemId: string, itemKey: string, image: Blob): Observable<{ item_id: string; screenshot_url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    const params = new HttpParams()
      .set('workspace', workspace)
      .set('api_key', apiKey)
      .set('item_id', itemId)
      .set('item_key', itemKey);
    return this.http.post<{ item_id: string; screenshot_url: string }>(this.REPLACE_IMAGE_URL, formData, { params });
  }

  getAllItems(page: number, pageSize: number, orderBy?: string, filters?: string): Observable<any[]> {
    const headers = { 'Authorization': 'Bearer ' + this.auth.token() };
    let params = new HttpParams()
      .set('page', page)
      .set('page_size', pageSize);
    if (orderBy) {
      params = params.set('order_by', orderBy);
    }
    if (filters) {
      params = params.set('filters', filters);
    }
    return this.http.get<any[]>(`${this.CHRONOMAPS_API_URL}/all-items`, { headers, params }).pipe(
      catchError((error) => {
        console.error('Error fetching all items:', error);
        return of([]);
      })
    );
  }

  reanalyzeItem(workspace: string, apiKey: string, itemId: string, itemKey: string): Observable<any> {
    const params = new HttpParams()
      .set('workspace', workspace)
      .set('api_key', apiKey)
      .set('item_id', itemId)
      .set('item_key', itemKey);
    return this.http.post<any>(this.REANALYZE_ITEM_URL, null, { params });
  }

  /**
   * Rebuilds one workspace's t-SNE map now, instead of waiting for the scheduled run.
   * Emits the clusterer's progress events as they stream in; the run takes minutes, and
   * the stream simply ending (timeout, out of memory) is how a dead run shows up, so
   * callers should look for `done` rather than treat completion as success.
   */
  rebuildMap(workspace: string, adminKey: string): Observable<MapRebuildEvent> {
    // No title, like the scheduled run. The endpoint takes a Firebase admin login (the admin
    // app) or the workspace's admin key (the showcase, which has no login).
    const params = new URLSearchParams({ workspace, no_title: 'true' });
    const token = this.auth.token();
    const headers = { 'Authorization': token ? `Bearer ${token}` : adminKey };
    return new Observable<MapRebuildEvent>((subscriber) => {
      // Deliberately not aborted on unsubscribe: dropping the connection would kill the
      // run half way, and a row can be destroyed by nothing more than a list refresh.
      (async () => {
        const url = `${this.CLUSTER_SCREENSHOTS_URL}?${params}`;
        let response = await fetch(url, { method: 'POST', headers });
        if (response.status === 403 && token && adminKey) {
          // A login that is stale, or not on the admins list - the key is still good.
          response = await fetch(url, { method: 'POST', headers: { 'Authorization': adminKey } });
        }
        if (!response.ok || !response.body) {
          throw new Error(`HTTP ${response.status}`);
        }
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += value;
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';
          for (const event of events) {
            if (!event.startsWith('data: ')) continue;
            const [seconds, bit] = JSON.parse(event.slice('data: '.length));
            const message = String(bit?.msg || '');
            subscriber.next({
              seconds,
              message,
              error: bit?.error ? String(bit.error) : null,
              done: message.startsWith('Config uploaded'),
              empty: message.startsWith('No records found'),
            });
          }
        }
        subscriber.complete();
      })().catch((error) => subscriber.error(error));
    });
  }

}
