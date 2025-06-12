import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { RouterLink } from '@angular/router';

// export const MAIN_MENU_HEIGHT = 348; // With the extra two links
export const MAIN_MENU_HEIGHT = 348 - 2*56;

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
  @Output() about = new EventEmitter<void>();

  public HEIGHT = MAIN_MENU_HEIGHT;

}
