import { Component, input, output, signal, effect, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FiltersBarState {
  status: string[];
  author: string;
  preference: string[];
  potential: string[];
  type: string;
  search: string;
  orderBy: string;
  view?: string;
}

export interface FilterCounts {
  status: Map<string, number>;
  author: Map<string, number>;
  preference: Map<string, number>;
  potential: Map<string, number>;
  type: Map<string, number>;
}

@Component({
  selector: 'app-filters-bar',
  imports: [FormsModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.less'
})
export class FiltersBarComponent {
  // Inputs
  counts = input<FilterCounts>({
    status: new Map(),
    author: new Map(),
    preference: new Map(),
    potential: new Map(),
    type: new Map()
  });
  
  totalCount = input<number>(0);
  filteredCount = input<number>(0);
  showViewToggle = input<boolean>(false);
  
  // Outputs
  filtersChange = output<FiltersBarState>();
  
  // Filter state
  filterStatus = signal<string[]>(['new', 'flagged', 'approved', 'highlighted']);
  filterAuthor = signal<string>('all');
  filterPreference = signal<string[]>(['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent']);
  filterPotential = signal<string[]>(['100', '75', '50', '25', '0']);
  filterType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  viewMode = signal<'grid' | 'list'>('grid');
  
  // Dropdown state
  statusDropdownOpen = signal<boolean>(false);
  preferenceDropdownOpen = signal<boolean>(false);
  potentialDropdownOpen = signal<boolean>(false);
  
  // Options
  preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent'];
  potentialOptions = ['100', '75', '50', '25', '0'];
  
  constructor() {
    // Read initial filters from URL hash if available
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash) {
        this.setFiltersFromHash(hash);
      }
    }
    
    // Watch for filter changes and emit
    effect(() => {
      this.filterStatus();
      this.filterAuthor();
      this.filterPreference();
      this.filterPotential();
      this.filterType();
      this.searchText();
      this.orderBy();
      this.viewMode();
      
      this.emitFiltersChange();
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect')) {
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    }
  }
  
  private emitFiltersChange(): void {
    this.filtersChange.emit({
      status: this.filterStatus(),
      author: this.filterAuthor(),
      preference: this.filterPreference(),
      potential: this.filterPotential(),
      type: this.filterType(),
      search: this.searchText(),
      orderBy: this.orderBy(),
      view: this.viewMode()
    });
  }
  
  // Status filter methods
  toggleStatusDropdown(): void {
    const next = !this.statusDropdownOpen();
    this.statusDropdownOpen.set(next);
    if (next) {
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    }
  }
  
  toggleStatusFilter(status: string): void {
    const current = this.filterStatus();
    if (current.includes(status)) {
      this.filterStatus.set(current.filter(s => s !== status));
    } else {
      this.filterStatus.set([...current, status]);
    }
  }
  
  isStatusSelected(status: string): boolean {
    return this.filterStatus().includes(status);
  }
  
  getSelectedStatusCount(): number {
    return this.filterStatus().length;
  }
  
  // Preference filter methods
  togglePreferenceDropdown(): void {
    const next = !this.preferenceDropdownOpen();
    this.preferenceDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    }
  }
  
  togglePreferenceFilter(preference: string): void {
    const current = this.filterPreference();
    if (current.includes(preference)) {
      this.filterPreference.set(current.filter(p => p !== preference));
    } else {
      this.filterPreference.set([...current, preference]);
    }
  }
  
  isPreferenceSelected(preference: string): boolean {
    return this.filterPreference().includes(preference);
  }
  
  getSelectedPreferenceCount(): number {
    return this.filterPreference().length;
  }
  
  // Potential filter methods
  togglePotentialDropdown(): void {
    const next = !this.potentialDropdownOpen();
    this.potentialDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
    }
  }
  
  togglePotentialFilter(potential: string): void {
    const current = this.filterPotential();
    if (current.includes(potential)) {
      this.filterPotential.set(current.filter(p => p !== potential));
    } else {
      this.filterPotential.set([...current, potential]);
    }
  }
  
  isPotentialSelected(potential: string): boolean {
    return this.filterPotential().includes(potential);
  }
  
  getSelectedPotentialCount(): number {
    return this.filterPotential().length;
  }
  
  // Utility methods
  getCount(counts: Map<string, number>, key: string): number {
    return counts.get(key) || 0;
  }
  
  getAuthorsSortedByCount(): string[] {
    const counts = this.counts().author;
    return Array.from(counts.keys()).sort((a, b) => {
      const countA = counts.get(a) || 0;
      const countB = counts.get(b) || 0;
      return countB - countA;
    });
  }
  
  getTruncatedAuthorId(author: string): string {
    if (!author || author === 'unknown') return author;
    if (author.length <= 8) return author;
    return author.substring(0, 4) + '...' + author.substring(author.length - 4);
  }
  
  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }
  
  // Public method to set filters from URL hash
  setFiltersFromHash(hash: string): void {
    const params = new URLSearchParams(hash);
    
    const statusParam = params.get('status');
    if (statusParam) this.filterStatus.set(statusParam.split(','));
    
    const authorParam = params.get('author');
    if (authorParam) this.filterAuthor.set(authorParam);
    
    const preferenceParam = params.get('preference');
    if (preferenceParam) this.filterPreference.set(preferenceParam.split(','));
    
    const potentialParam = params.get('potential');
    if (potentialParam) this.filterPotential.set(potentialParam.split(','));
    
    const typeParam = params.get('type');
    if (typeParam) this.filterType.set(typeParam);
    
    const searchParam = params.get('search');
    if (searchParam) this.searchText.set(searchParam);
    
    const orderParam = params.get('order');
    if (orderParam) this.orderBy.set(orderParam);
    
    const viewParam = params.get('view');
    if (viewParam === 'grid' || viewParam === 'list') this.viewMode.set(viewParam);
  }
}
