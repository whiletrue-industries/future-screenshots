import { Component } from '@angular/core';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { RouterLink } from '@angular/router';

export const MAIN_MENU_HEIGHT = 348;

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
  public HEIGHT = MAIN_MENU_HEIGHT;

}
