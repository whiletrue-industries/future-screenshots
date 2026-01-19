import { Component, computed, Inject, LOCALE_ID, signal } from '@angular/core';
import { PlatformService } from '../../platform.service';
import { ApiService } from '../../api.service';

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
    // Determine available languages from workspace metadata; fall back to known locales
    const ws = this.api.workspace();
    const codes: string[] = ws?.metadata?.languages?.length ? ws.metadata.languages : ['en', 'nl', 'he', 'ar'];
    // Unique + ordered
    const unique = Array.from(new Set(codes));
    const nameMap: Record<string, string> = {
      en: 'English',
      nl: 'Nederlands',
      he: 'עברית',
      ar: 'العربية',
    };
    const ret: Language[] = unique.map(code => ({
      code,
      name: nameMap[code] || code,
      baseHref: code === 'en' ? '/' : `/${code}/`,
    }));

    const currentLanguage = ret.find(lang => lang.code === this.currentLanguageCode());
    if (currentLanguage) {
      ret.forEach(lang => {
        lang.primary = lang.code === currentLanguage.code;
        lang.url = this.urlForLanguage(currentLanguage, lang);
      });
    }
    return ret;
  });

  currentLanguageCode = signal<string>('');
  host = 'mapfuture.es';

  constructor(@Inject(LOCALE_ID) public locale: string, private platform: PlatformService, private api: ApiService) {
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
      try {
        const url = new URL(location.href);
        // Known locales (first path segment indicates locale); default is 'en' with root '/'
        const known = ['en', 'nl', 'he', 'ar'];
        const parts = url.pathname.split('/').filter(Boolean);
        const first = parts[0];
        // Replace or insert locale segment
        if (known.includes(first)) {
          // Remove first segment (current locale)
          parts.shift();
        }
        // Prepend target locale segment unless English (root)
        const pathParts = parts.length > 0 ? parts.join('/') : '';
        const newPath = language.code === 'en' ? `/${pathParts}` : `/${language.code}/${pathParts}`;
        url.pathname = newPath;
        // Preserve all query params (workspace, api_key, etc) and hash
        return url.toString();
      } catch {
        // Fallback to baseHref
        return language.baseHref;
      }
    }
    return language.baseHref;
  }
}
