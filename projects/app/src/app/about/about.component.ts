import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, Inject, Input, LOCALE_ID, OnChanges, OnInit, signal } from '@angular/core';
import { marked } from 'marked';
import { PlatformService } from '../../platform.service';

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

  private platform = inject(PlatformService);

  constructor(@Inject(LOCALE_ID) public locale_: string, private http: HttpClient) {
    this.locale.set(locale_.split('-')[0]);
    effect(() => {
      const url = this.aboutUrl();
      if (url && this.platform.browser()) {
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
