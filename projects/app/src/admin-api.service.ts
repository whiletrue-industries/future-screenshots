import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from './app/auth.service';
import { CreateOrUpdateWorkspaceRequest, Workspace, WorkspaceStats } from './app/admin/workspace-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';
  private REPLACE_IMAGE_URL = 'https://replace-image-qjzuw7ypfq-ez.a.run.app';
  private REANALYZE_ITEM_URL = 'https://reanalyze-item-qjzuw7ypfq-ez.a.run.app';

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
      page_size: 500,
      order_by: '-created_at',
    };
    if (filters) {
      params.filters = filters;
    }
    return this.http.get<any[]>(`${this.CHRONOMAPS_API_URL}/${workspace}/items`, {
      params,
      headers: {
        'Authorization': `${api_key}`
      }
    }).pipe(
      catchError((error) => {
        console.error('Error fetching items:', error);
        // Let component-level timeout/retry logic handle this path.
        return throwError(() => error);
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

  private aggregateField(workspace: string, api_key: string, field: string): Observable<{ value: any; count: number }[]> {
    return this.http.get<{ value: any; count: number }[]>(
      `${this.CHRONOMAPS_API_URL}/${workspace}/items/aggregate`,
      { params: { field }, headers: { Authorization: api_key } }
    ).pipe(catchError(() => of([])));
  }

  getWorkspaceStats(workspace: string, api_key: string): Observable<WorkspaceStats> {
    return forkJoin({
      moderation: this.aggregateField(workspace, api_key, '_private_moderation'),
      author:     this.aggregateField(workspace, api_key, 'author_id'),
      preference: this.aggregateField(workspace, api_key, 'favorable_future'),
      potential:  this.aggregateField(workspace, api_key, 'plausibility'),
      type:       this.aggregateField(workspace, api_key, 'screenshot_type'),
    }).pipe(
      map(({ moderation, author, preference, potential, type }) => {
        // Map numeric _private_moderation to status keys used by the UI
        const MODERATION_TO_KEY: Record<number, string> = {
          [-1]: '__deleted__', // excluded from totals
          [0]:  'banned',
          [1]:  'flagged',
          [2]:  'pending',
          [3]:  'not-flagged',
          [4]:  'approved',
          [5]:  'highlighted',
        };
        const statusCounts = new Map<string, number>();
        let totalCount = 0;
        for (const entry of moderation) {
          const mod = entry.value as number | null;
          if (mod === -1) continue; // deleted items not shown in UI
          const key = mod === null ? 'pending' : (MODERATION_TO_KEY[mod] ?? 'pending');
          statusCounts.set(key, (statusCounts.get(key) ?? 0) + entry.count);
          totalCount += entry.count;
        }

        const authorCounts = new Map<string, number>();
        for (const entry of author) {
          authorCounts.set(entry.value ?? 'unknown', entry.count);
        }

        // API stores "mostly_prefer" / "mostly_prevent" with underscores; UI uses spaces
        const preferenceCounts = new Map<string, number>();
        for (const entry of preference) {
          if (entry.value != null) {
            const key = String(entry.value).replace(/_/g, ' ');
            preferenceCounts.set(key, entry.count);
          }
        }

        const potentialCounts = new Map<string, number>();
        for (const entry of potential) {
          if (entry.value != null) {
            potentialCounts.set(String(entry.value), entry.count);
          }
        }

        const typeCounts = new Map<string, number>();
        for (const entry of type) {
          if (entry.value != null) {
            typeCounts.set(String(entry.value), entry.count);
          }
        }

        return { totalCount, statusCounts, authorCounts, preferenceCounts, potentialCounts, typeCounts, fetchedAt: new Date() } as WorkspaceStats;
      }),
      catchError(() => of(null as unknown as WorkspaceStats))
    );
  }

}
