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

/**
 * Status value mapping for _private_moderation field
 */
export class FilterHelpers {
  static readonly STATUS_MAP = {
    'new': 2,
    'flagged': 1,
    'approved': 4,
    'rejected': 0,
    'highlighted': 5
  } as const;

  /**
   * Check if an item matches the "new" status
   * "New" includes items with _private_moderation === 2 OR undefined/null
   */
  static isNewStatus(item: any): boolean {
    const moderation = item._private_moderation;
    return moderation === undefined || moderation === null || moderation === 2;
  }

  /**
   * Get the status key for an item for counting purposes
   */
  static getStatusKey(item: any): string {
    const moderation = item._private_moderation;
    if (moderation === undefined || moderation === null || moderation === 2) {
      return 'pending';
    } else if (moderation === 1) {
      return 'flagged';
    } else if (moderation === 4) {
      return 'approved';
    } else if (moderation === 0) {
      return 'banned';
    } else if (moderation === 5) {
      return 'highlighted';
    }
    return 'pending'; // default
  }

  /**
   * Check if an item matches the selected status filters
   */
  static matchesStatusFilter(item: any, selectedStatuses: string[]): boolean {
    if (selectedStatuses.length === 0) {
      return true; // No filter means show all
    }

    const moderation = item._private_moderation;
    
    // Check if "new" is selected and item has no _private_moderation
    if (selectedStatuses.includes('new') && (moderation === undefined || moderation === null)) {
      return true;
    }

    // Check if moderation value matches any selected status
    const allowedValues = selectedStatuses
      .map(status => FilterHelpers.STATUS_MAP[status as keyof typeof FilterHelpers.STATUS_MAP])
      .filter(v => v !== undefined);
    
    return allowedValues.includes(moderation);
  }
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
  initialState = input<FiltersBarState | null>(null);
  
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
  
  private initialized = false;
  
  constructor() {
    // Set initial state from parent if provided
    effect(() => {
      const state = this.initialState();
      if (state && !this.initialized) {
        this.filterStatus.set(state.status);
        this.filterAuthor.set(state.author);
        this.filterPreference.set(state.preference);
        this.filterPotential.set(state.potential);
        this.filterType.set(state.type);
        this.searchText.set(state.search);
        this.orderBy.set(state.orderBy);
        if (state.view) {
          this.viewMode.set(state.view as 'grid' | 'list');
        }
        this.initialized = true;
      }
    });
    
    // Watch for filter changes and emit (skip initial emission if we have initialState)
    effect(() => {
      this.filterStatus();
      this.filterAuthor();
      this.filterPreference();
      this.filterPotential();
      this.filterType();
      this.searchText();
      this.orderBy();
      this.viewMode();
      
      // Only emit if we're initialized or have no initial state
      if (this.initialized || !this.initialState()) {
        this.emitFiltersChange();
      }
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
}
