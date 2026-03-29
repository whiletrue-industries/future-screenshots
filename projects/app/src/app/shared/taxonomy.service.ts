import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TaxonomySubTheme {
  id: string;
  name: { english: string; dutch: string; hebrew: string; arabic: string };
  item_count: number;
}

export interface TaxonomyTheme {
  id: string;
  name: { english: string; dutch: string; hebrew: string; arabic: string };
  item_count: number;
  sub_themes: TaxonomySubTheme[];
}

export interface TaxonomyData {
  version: string;
  item_count: number;
  themes: TaxonomyTheme[];
}

export interface TopicOption {
  id: string;
  name: string;
}

export interface TopicTreeNode {
  id: string;
  name: string;
  children: TopicOption[];
}

const LOCALE_KEY_MAP: Record<string, keyof TaxonomyTheme['name']> = {
  'en': 'english',
  'nl': 'dutch',
  'he': 'hebrew',
  'ar': 'arabic',
};

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {

  private static readonly API_URL = 'https://chronomaps-api-qjzuw7ypfq-ez.a.run.app';

  private taxonomy = signal<TaxonomyData | null>(null);
  private lookupMap = new Map<string, { themeName: string; subThemeName: string }>();
  private fetched = false;

  themes = computed<TopicOption[]>(() => {
    const data = this.taxonomy();
    if (!data) return [];
    return data.themes.map(t => ({
      id: t.id,
      name: this.localizeName(t.name),
    }));
  });

  topicTree = computed<TopicTreeNode[]>(() => {
    const data = this.taxonomy();
    if (!data) return [];
    return data.themes.map(t => ({
      id: t.id,
      name: this.localizeName(t.name),
      children: t.sub_themes.map(s => ({
        id: `${t.id}/${s.id}`,
        name: this.localizeName(s.name),
      })),
    }));
  });

  allSubThemeIds = computed<string[]>(() => {
    return this.topicTree().flatMap(t => t.children.map(c => c.id));
  });

  constructor(private http: HttpClient) {}

  fetch(): void {
    if (this.fetched) return;
    this.fetched = true;
    this.http.get<TaxonomyData>(`${TaxonomyService.API_URL}/taxonomy`).subscribe({
      next: (data) => {
        this.taxonomy.set(data);
        this.buildLookup(data);
      },
      error: (err) => {
        console.error('Failed to fetch taxonomy:', err);
        this.fetched = false;
      }
    });
  }

  resolveTopic(topicId: string): string {
    const entry = this.lookupMap.get(topicId);
    if (entry) {
      return `${entry.themeName} > ${entry.subThemeName}`;
    }
    // Fallback: prettify the raw ID
    const parts = topicId.split('/');
    const subTheme = parts.length > 1 ? parts[1] : parts[0];
    return this.prettifyId(subTheme);
  }

  resolveThemeName(topicId: string): string {
    const themeId = topicId.split('/')[0];
    const data = this.taxonomy();
    if (data) {
      const theme = data.themes.find(t => t.id === themeId);
      if (theme) return this.localizeName(theme.name);
    }
    return this.prettifyId(themeId);
  }

  private buildLookup(data: TaxonomyData): void {
    this.lookupMap.clear();
    for (const theme of data.themes) {
      const themeName = this.localizeName(theme.name);
      for (const sub of theme.sub_themes) {
        const subThemeName = this.localizeName(sub.name);
        this.lookupMap.set(`${theme.id}/${sub.id}`, { themeName, subThemeName });
      }
    }
  }

  private localizeName(name: TaxonomyTheme['name']): string {
    // Try browser language, fall back to English
    const lang = (typeof navigator !== 'undefined' ? navigator.language?.substring(0, 2) : 'en') || 'en';
    const key = LOCALE_KEY_MAP[lang] || 'english';
    return name[key] || name.english;
  }

  private prettifyId(id: string): string {
    return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}
