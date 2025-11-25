import { Component, effect, EventEmitter, Output } from '@angular/core';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';

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

  constructor(public api: ApiService, public state: StateService) {
    effect(() => {
      if (this.api.workspaceId() && this.api.api_key() && this.api.workspace()?.source) {
        this.state.mainMenuHeight.set(MAIN_MENU_HEIGHT);
      } else {
        this.state.mainMenuHeight.set(MAIN_MENU_HEIGHT - 56);
      }
    });
  }

}
