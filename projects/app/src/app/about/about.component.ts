import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, Inject, Input, LOCALE_ID, OnChanges, OnInit, signal } from '@angular/core';
import { marked } from 'marked';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less'
})
export class AboutComponent implements OnChanges, OnInit {

  @Input() prefix: string = '';

  locale = signal<string | null>(null);
  aboutUrl = computed(() => {
    const prefix = this.prefix_();
    const locale = this.locale();
    if (!locale || prefix === null) {
      return null;
    }
    return `/abouts/${prefix}${locale}.md`;
  });
  _ = marked;
  content = signal('');
  prefix_ = signal<string | null>(null);

  constructor(@Inject(LOCALE_ID) public locale_: string, private http: HttpClient) {    
    this.locale.set(locale_.split('-')[0]); // Use the first part of the locale, e.g., 'nl' from 'nl-NL'
    effect(() => {
      const url = this.aboutUrl();
      console.log('About URL:', url);
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

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    console.log('Prefix changed:', this.prefix);
    this.prefix_.set(this.prefix);
  }
}
