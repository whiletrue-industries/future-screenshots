import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from '../platform.service';
import { marked } from 'marked';
import { NowDefaultMode } from './admin/workspace-metadata.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  private readonly nowWorkspaceStorageKey = 'fs_now_workspace_target';
  
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

  private maybeHandleNowHashRedirect(): void {
    const hash = window.location.hash || '';
    if (!hash.startsWith('#now') && !hash.startsWith('#new')) {
      return;
    }

    const [, hashQueryString = ''] = hash.slice(1).split('?');
    const hashParams = new URLSearchParams(hashQueryString);
    const overrideMode = this.normalizeNowMode(hashParams.get('mode'));
    const target = this.getStoredNowWorkspaceTarget();
    if (!target) {
      return;
    }

    const mode = overrideMode || target.defaultMode;
    const url = this.buildNowRedirectUrl(target.workspaceId, target.collaborateApiKey, mode);
    window.location.replace(url);
  }

  private normalizeNowMode(rawMode: string | null): NowDefaultMode | null {
    if (rawMode === 'evaluate' || rawMode === 'workshop' || rawMode === 'batch') {
      return rawMode;
    }
    return null;
  }

  private buildNowRedirectUrl(workspaceId: string, apiKey: string, mode: NowDefaultMode): string {
    const params = new URLSearchParams({
      workspace: workspaceId,
      api_key: apiKey,
    });

    if (mode === 'workshop') {
      params.set('ws', 'true');
    }
    if (mode === 'batch') {
      params.set('automatic', 'true');
    }

    return `/prescan?${params.toString()}`;
  }

  private getStoredNowWorkspaceTarget(): { workspaceId: string; collaborateApiKey: string; defaultMode: NowDefaultMode; nowEndTime: string | null } | null {
    try {
      const raw = window.localStorage.getItem(this.nowWorkspaceStorageKey);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw);
      const workspaceId = typeof parsed?.workspaceId === 'string' ? parsed.workspaceId : '';
      const collaborateApiKey = typeof parsed?.collaborateApiKey === 'string' ? parsed.collaborateApiKey : '';
      const defaultMode = this.normalizeNowMode(typeof parsed?.defaultMode === 'string' ? parsed.defaultMode : null) || 'evaluate';
      const nowEndTime = typeof parsed?.nowEndTime === 'string' && parsed.nowEndTime.length > 0 ? parsed.nowEndTime : null;

      if (!workspaceId || !collaborateApiKey) {
        return null;
      }

      if (nowEndTime) {
        const endTimestamp = Date.parse(nowEndTime);
        if (!Number.isNaN(endTimestamp) && Date.now() > endTimestamp) {
          return null;
        }
      }

      return {
        workspaceId,
        collaborateApiKey,
        defaultMode,
        nowEndTime,
      };
    } catch {
      return null;
    }
  }
}
