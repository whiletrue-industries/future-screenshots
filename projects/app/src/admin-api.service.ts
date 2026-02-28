import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './app/auth.service';
import { CreateOrUpdateWorkspaceRequest, Workspace } from './app/admin/workspace-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';

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

}
