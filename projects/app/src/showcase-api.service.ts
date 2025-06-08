import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { distinct, distinctUntilChanged, map, ReplaySubject, Subject, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShowcaseApiService {

  _configs = new Subject<any>();
  config = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) {
    this._configs.pipe(
      distinctUntilChanged((a, b) => a?.tag === b?.tag && a?.set_id === b?.set_id),
    ).subscribe(config => {
      // console.log('Config updated:', config);
      this.config.next(config);
    });
  }

  loadConfig(tag: string) {
    const mainURL = `https://storage.googleapis.com/chronomaps3-eu/tiles/${tag}/config.json`;
    this.http.get(mainURL).pipe(
      switchMap((config: any) => {
        const set_id = config.set_id || 0;
        const setURL = `https://storage.googleapis.com/chronomaps3-eu/tiles/${tag}/${set_id}/config.json`;
        return this.http.get(setURL).pipe(
          map(setConfig => {
            const mergedConfig = { ...config, ...setConfig };
            return mergedConfig;
          })
        );
      })
    ).subscribe(config => {
      // console.log('Config loaded:', config);
      this._configs.next(config);
    });
  }
}