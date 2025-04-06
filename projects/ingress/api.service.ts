import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

export type DiscussResult = {
  complete: boolean;
  message: string;
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SCREENSHOT_HANDLER_URL = 'https://screenshot-handler-qjzuw7ypfq-ez.a.run.app';
  ITEM_INGRES_AGENT_URL = 'https://item-ingress-agent-qjzuw7ypfq-ez.a.run.app';

  WORKSPACE = '4d2c04b0-51b7-4aa2-a234-0e4be53447de';
  API_KEY = 'f290c30a-8819-42a0-aa0b-77f5582b4a2f';

  item = signal<any>(null);

  constructor(private http: HttpClient) { }

  startDiscussion(image: Blob): Observable<DiscussResult> {
    const formData = new FormData();
    formData.append('image', image);
    const params = {
      workspace: this.WORKSPACE,
      api_key: this.API_KEY,
    };
    return this.http.post(this.SCREENSHOT_HANDLER_URL, formData, { params }).pipe(
      switchMap((response: any) => {
        this.item.set(response);
        return this.sendMessage('initial');
      })
    );
  }

  sendMessage(message: string): Observable<DiscussResult> {
    const params = {
      workspace: this.WORKSPACE,
      api_key: this.API_KEY,
      item_id: this.item().item_id,
      item_key: this.item().item_key,
      message: message,
    };
    return this.http.get(`${this.ITEM_INGRES_AGENT_URL}`, {params}).pipe(
      map((response: any) => {
        return response as DiscussResult;
      })
    );
  }
}
