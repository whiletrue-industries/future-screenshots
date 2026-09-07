import { Component, computed, effect, EventEmitter, inject, Output } from '@angular/core';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';
import { PlatformService } from '../../platform.service';
import { NowTargetService } from '../shared/now-target.service';

// export const MAIN_MENU_HEIGHT = 348; // With the extra two links
const MAIN_MENU_HEIGHT = 348 - 2*56;

@Component({
  selector: 'app-main-menu',
  imports: [
    LanguageSelectorComponent,
    RouterLink
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.less'
})
export class MainMenuComponent {
  @Output() explore = new EventEmitter<void>();

  private nowTargetService = inject(NowTargetService);
  private platform = inject(PlatformService);

  // Shown when this workspace is the /#now target and has an end time
  nowEndTimeText = computed(() => {
    const target = this.nowTargetService.target();
    const workspaceId = this.api.workspaceId();
    if (!target?.end_time || !workspaceId || target.workspace_id !== workspaceId) {
      return null;
    }
    const date = new Date(target.end_time);
    return Number.isNaN(date.getTime()) ? null : date.toLocaleString();
  });

  constructor(public api: ApiService, public state: StateService) {
    this.platform.browser(() => {
      if (this.nowTargetService.target() === undefined) {
        this.nowTargetService.load().subscribe();
      }
    });
    effect(() => {
      if (this.api.workspaceId() && this.api.api_key() && this.api.workspace()?.source) {
        this.state.mainMenuHeight.set(MAIN_MENU_HEIGHT);
      } else {
        this.state.mainMenuHeight.set(MAIN_MENU_HEIGHT - 56);
      }
    });
  }

}
