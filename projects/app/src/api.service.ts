import { HttpClient } from '@angular/common/http';
import { computed, effect, Inject, Injectable, LOCALE_ID, NgZone, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable, ReplaySubject, switchMap, tap, timer } from 'rxjs';

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

  // WORKSPACE = '4d2c04b0-51b7-4aa2-a234-0e4be53447de';
  // API_KEY = 'f290c30a-8819-42a0-aa0b-77f5582b4a2f';

  item = signal<any>(null);
  api_key = signal<string | null>(null);
  workspaceId = signal<string | null>(null);
  itemId = signal<string | null>(null);
  itemKey = signal<string | null>(null);
  automatic = signal<boolean>(false);
  demo = signal<boolean>(false);
  workspace = signal<any>({});
  isWorkshop = signal<boolean>(false);
  isWorkshopFollowup = signal<boolean>(false);
  uploadImageInProgress = new ReplaySubject<boolean>(1);
  currentlyUploadingImage = signal<boolean>(false);
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
    const api_key = route.queryParams['api_key'] || this.api_key();
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
    return this.http.get(`${this.CHRONOMAPS_API_URL}/${workspaceId}`).pipe(
      map((response: any) => {
        this.workspace.set(response);
        return response;
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
    return this.http.post(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}`, metadata, { headers }).pipe(
      map((response: any) => {
        const item = Object.assign({}, metadata, response);
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
    const headers = {
      'Authorization': this.api_key() as string,
    };
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

  uploadImage(image: Blob, item_id: string, item_key: string): void {
    this.uploadImageInProgress.next(true);
    this.startDiscussion(image, item_id, item_key).pipe(
      switchMap((ret: any) => {
        this.uploadImageInProgress.next(false);
        return this.sendInitMessageNoStream(item_id, item_key);
      })
    ).subscribe((x: any) => {
    });
  }    

  uploadImageAuto(image: Blob, item_id: string, item_key: string): Observable<any> {
    this.uploadImageInProgress.next(true);
    this.startDiscussion(image, item_id, item_key).pipe(
      tap(() => {
        this.uploadImageInProgress.next(false);
      })
    ).subscribe(() => {
      console.log('Auto upload image complete');
    });
    return timer(2000);
  }    

  startDiscussion(image: Blob, item_id: string, item_key: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    const params: any = {
      workspace: this.workspaceId(),
      api_key: this.api_key(),
      item_id: item_id,
      item_key: item_key,
    };
    if (this.automatic()) {
      params['automatic'] = 'true';
    }
    return this.http.post(this.SCREENSHOT_HANDLER_URL, formData, { params }).pipe(
      tap((data: any) => {
        console.log('Screenshot uploaded successfully', data.metadata);
        this.item.update((item: any) => {
          return Object.assign({}, item, data.metadata);
        });
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
        console.error('EVENTSOURCE ERROR', error);
        eventSource.close(); //
        observer.complete();
        // observer.error(error);
      };
      return () => {
        eventSource.close();
      };
    });    
  }
}
