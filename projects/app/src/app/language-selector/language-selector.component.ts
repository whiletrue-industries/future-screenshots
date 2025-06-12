import { Component, computed, Inject, LOCALE_ID, signal } from '@angular/core';
import { PlatformService } from '../../platform.service';

type Language = {
  code: string;
  name: string;
  baseHref: string;
  primary?: boolean;
  url?: string;
};

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.less'
})
export class LanguageSelectorComponent {
  LANGUAGES = computed<Language[]>(() => {
    const ret: Language[] = [
      { code: 'en', name: 'English', baseHref: '/' },
      { code: 'nl', name: 'Nederlands', baseHref: '/nl/' },
    ];
    const currentLanguage = ret.find(lang => lang.code === this.currentLanguageCode());
    if (currentLanguage) {
      ret.forEach(lang => {
        lang.primary = lang.code === currentLanguage?.code;
        lang.url = this.urlForLanguage(currentLanguage, lang);
      });      
    }
    return ret;
  });

  currentLanguageCode = signal<string>('');
  host = 'mapfuture.es';

  constructor(@Inject(LOCALE_ID) public locale: string, private platform: PlatformService) {
    console.log('Current locale:', locale);
    this.currentLanguageCode.set(locale);
    this.platform.browser(() => {
      this.host = location.host;
    });
  }

  urlForLanguage(currentLanguage: Language, language: Language) {
    if (language.code === currentLanguage.code) {
      return; // No change needed
    }
    if (this.platform.browser()) {
      const url = location.href.replace(`${this.host}${currentLanguage?.baseHref}`, `${this.host}${language.baseHref}`);
      return url;
    }
    return language.baseHref;
  }
}
