import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  CHRONOMAPS_API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';

  constructor(private http: HttpClient) { }

  getItems(workspace: string, api_key: string, page: number, filters: string | null): Observable<any[]> {
    let params: any = {
      page: page,
      page_size: 50,
    };
    if (filters) {
      params.filters = filters;
    }
    return this.http.get<any[]>(`${this.CHRONOMAPS_API_URL}/${workspace}/items`, {
      params,
      headers: {
        'Authorization': `${api_key}`
      }
    });
  }

  updateItem(workspace: string, api_key: string, itemId: string, moderation: number): Observable<any> {
    const data = {
      _private_moderation: moderation
    };
    return this.http.put<any>(`${this.CHRONOMAPS_API_URL}/${workspace}/${itemId}`, data, {
      headers: {
        'Authorization': `${api_key}`
      },
    });
  }

}
