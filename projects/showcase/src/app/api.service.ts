import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  config = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) {
  }

  loadConfig(tag: string) {
    const URL = `https://storage.googleapis.com/chronomaps3-eu/tiles/${tag}/0/config.json`;
    this.http.get(URL).subscribe(config => {
      console.log('Config loaded:', config);
      this.config.next(config);
    });
  }
}