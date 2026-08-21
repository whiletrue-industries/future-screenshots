import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from '../platform.service';
import { marked } from 'marked';
import { NowTargetService, buildNowIngestUrl, isNowTargetExpired, normalizeNowMode } from './shared/now-target.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  private nowTargetService = inject(NowTargetService);

  constructor(private platform: PlatformService) {
    this.platform.browser(() => {
      this.maybeHandleNowHashRedirect();
      window.addEventListener('hashchange', this.handleHashChange);

      const renderer = new marked.Renderer();
      const linkRenderer = renderer.link;
      renderer.link = (href: string, title: string, text: string) => {
        const localLink = href.startsWith(`${location.protocol}//${location.hostname}`);
        const html = linkRenderer.call(renderer, href, title, text);
        return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);  
      };
      marked.use({renderer});
      try {
        const orientation: any = window.screen.orientation;
        if (screen && orientation?.lock) {
          // orientation?.lock('portrait').then(() => {
          //   console.log('Screen orientation locked to portrait');
          // });
        }          
      } catch (e) {
        console.error('Error locking screen orientation', e);
      }
    });
  }

  private readonly handleHashChange = () => {
    this.maybeHandleNowHashRedirect();
  };

  /**
   * `/#now` (or `/#new`) is a stable quick link: it resolves the current NOW
   * target from the server's global key store and sends the visitor to that
   * workspace's ingest flow. `#now?mode=evaluate|workshop|batch` overrides the
   * target's default mode.
   */
  private maybeHandleNowHashRedirect(): void {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#now') && !hash.startsWith('#new')) {
      return;
    }

    const [, hashQueryString = ''] = hash.slice(1).split('?');
    const overrideMode = normalizeNowMode(new URLSearchParams(hashQueryString).get('mode'));

    this.nowTargetService.load().subscribe((target) => {
      if (!target || isNowTargetExpired(target, Date.now())) {
        return;
      }
      const url = new URL(buildNowIngestUrl(target, overrideMode || target.mode), document.baseURI);
      window.location.replace(url.toString());
    });
  }
}
