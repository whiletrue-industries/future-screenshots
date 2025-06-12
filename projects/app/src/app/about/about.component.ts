import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, Inject, LOCALE_ID, signal } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less'
})
export class AboutComponent {

  locale = signal<string | null>(null);
  aboutUrl = computed(() => {
    const locale = this.locale();
    if (!locale) {
      return null;
    }
    return `/abouts/${locale}.md`;
  });
  _ = marked;
  content = signal('');

  constructor(@Inject(LOCALE_ID) public locale_: string, private http: HttpClient) {    
    this.locale.set(locale_.split('-')[0]); // Use the first part of the locale, e.g., 'nl' from 'nl-NL'
    effect(() => {
      console.log('Locale changed:', this.locale());
      const url = this.aboutUrl();
      if (url) {
        this.http.get(url, { responseType: 'text' }).subscribe(
          (data) => {
            const html = marked(data);
            this.content.set(html);
          }
        );
      }
    });
  }
}
