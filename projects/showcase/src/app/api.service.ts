import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL = 'https://storage.googleapis.com/chronomaps3.firebasestorage.app/tiles/4d2c04b0-51b7-4aa2-a234-0e4be53447de/0/config.json?a=4';

  config = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) {
    this.loadConfig();
  }

  private loadConfig() {
    this.http.get(this.URL).subscribe(config => {
      console.log('Config loaded:', config);
      this.config.next(config);
    });
  }
}