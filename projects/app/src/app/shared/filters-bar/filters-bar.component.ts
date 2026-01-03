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
    'not-flagged': 3,
    'rejected': 0,
    'highlighted': 5,
    // 'in-review' is computed, not a direct _private_moderation value
  } as const;

  /**
   * Check if an item is "in review"
   * "In review" means both plausibility and favorable_future are set
   * (indicating user/admin scoring, not automatic AI scoring)
   */
  static isInReviewStatus(item: any): boolean {
    return item.plausibility !== undefined && item.plausibility !== null &&
           item.favorable_future !== undefined && item.favorable_future !== null &&
           item.favorable_future !== '';
  }

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
    // Check "in review" first as it's a computed status that takes precedence
    if (FilterHelpers.isInReviewStatus(item)) {
      return 'in-review';
    }

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

    // Check for "in-review" status first (computed status)
    if (selectedStatuses.includes('in-review') && FilterHelpers.isInReviewStatus(item)) {
      return true;
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
  filtersCommit = output<FiltersBarState>(); // Emitted when dropdown closes or focus changes
  
  // Filter state
  filterStatus = signal<string[]>(['new', 'in-review', 'flagged', 'approved', 'not-flagged', 'highlighted']);
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
  private isInitializing = false;
  private changeEffectTriggered = false;
  private debounceTimer: any = null;
  private readonly DEBOUNCE_DELAY = 300; // 300ms debounce for view updates
  
  constructor() {
    // Set initial state from parent if provided
    effect(() => {
      const state = this.initialState();
      console.log('[FiltersBar] initialState effect - state:', state);
      if (state && !this.initialized) {
        console.log('[FiltersBar] Setting initial state');
        this.isInitializing = true;
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
        // Use setTimeout to ensure the change detection cycle completes before allowing emissions
        setTimeout(() => {
          console.log('[FiltersBar] Initialization complete, allowing emissions');
          this.isInitializing = false;
        }, 0);
      }
    });
    
    // Watch for filter changes and emit (skip emissions during initialization)
    effect(() => {
      const status = this.filterStatus();
      const author = this.filterAuthor();
      const preference = this.filterPreference();
      const potential = this.filterPotential();
      const type = this.filterType();
      const search = this.searchText();
      const order = this.orderBy();
      const view = this.viewMode();
      
      console.log('[FiltersBar] Change effect triggered - isInitializing:', this.isInitializing, 'initialized:', this.initialized, 'changeEffectTriggered:', this.changeEffectTriggered);
      
      // Skip the very first effect trigger if we have an initialState, because the initialization
      // effect hasn't run yet, and emitting now would send the default values instead of the initial state values
      if (!this.changeEffectTriggered && this.initialState()) {
        console.log('[FiltersBar] Skipping first change effect emission because initialState is pending');
        this.changeEffectTriggered = true;
        return;
      }
      this.changeEffectTriggered = true;
      
      // Note: We no longer emit here automatically. Instead, we rely on:
      // 1. Debounced emissions when checkboxes are toggled (for immediate view updates)
      // 2. Commit emissions when dropdowns close or focus changes (for hash updates)
      // This prevents continuous emissions and gives us fine-grained control over when to emit
      console.log('[FiltersBar] Change detected but not auto-emitting (using debounced/commit pattern)');
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-multiselect')) {
      const wasOpen = this.statusDropdownOpen() || this.preferenceDropdownOpen() || this.potentialDropdownOpen();
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
      
      // Commit changes when dropdown closes
      if (wasOpen && !this.isInitializing) {
        this.commitFilters();
      }
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
  
  private commitFilters(): void {
    this.filtersCommit.emit({
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
  
  private emitDebouncedChange(): void {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Set new timer for debounced emission
    this.debounceTimer = setTimeout(() => {
      if (!this.isInitializing) {
        this.emitFiltersChange();
      }
    }, this.DEBOUNCE_DELAY);
  }
  
  // Status filter methods
  toggleStatusDropdown(): void {
    const wasOpen = this.statusDropdownOpen();
    const next = !wasOpen;
    this.statusDropdownOpen.set(next);
    if (next) {
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    } else if (wasOpen && !this.isInitializing) {
      // Commit changes when dropdown is manually closed
      this.commitFilters();
    }
  }
  
  toggleStatusFilter(status: string): void {
    const current = this.filterStatus();
    if (current.includes(status)) {
      this.filterStatus.set(current.filter(s => s !== status));
    } else {
      this.filterStatus.set([...current, status]);
    }
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }
  
  isStatusSelected(status: string): boolean {
    return this.filterStatus().includes(status);
  }
  
  getSelectedStatusCount(): number {
    return this.filterStatus().length;
  }

  selectAllStatuses(): void {
    this.filterStatus.set(['new', 'in-review', 'flagged', 'approved', 'rejected', 'highlighted']);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }

  deselectAllStatuses(): void {
    this.filterStatus.set([]);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }
  
  // Preference filter methods
  togglePreferenceDropdown(): void {
    const wasOpen = this.preferenceDropdownOpen();
    const next = !wasOpen;
    this.preferenceDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
    } else if (wasOpen && !this.isInitializing) {
      // Commit changes when dropdown is manually closed
      this.commitFilters();
    }
  }
  
  togglePreferenceFilter(preference: string): void {
    const current = this.filterPreference();
    if (current.includes(preference)) {
      this.filterPreference.set(current.filter(p => p !== preference));
    } else {
      this.filterPreference.set([...current, preference]);
    }
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }
  
  isPreferenceSelected(preference: string): boolean {
    return this.filterPreference().includes(preference);
  }
  
  getSelectedPreferenceCount(): number {
    return this.filterPreference().length;
  }

  selectAllPreferences(): void {
    this.filterPreference.set(['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent']);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }

  deselectAllPreferences(): void {
    this.filterPreference.set([]);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }
  
  // Potential filter methods
  togglePotentialDropdown(): void {
    const wasOpen = this.potentialDropdownOpen();
    const next = !wasOpen;
    this.potentialDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
    } else if (wasOpen && !this.isInitializing) {
      // Commit changes when dropdown is manually closed
      this.commitFilters();
    }
  }
  
  togglePotentialFilter(potential: string): void {
    const current = this.filterPotential();
    if (current.includes(potential)) {
      this.filterPotential.set(current.filter(p => p !== potential));
    } else {
      this.filterPotential.set([...current, potential]);
    }
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }
  
  isPotentialSelected(potential: string): boolean {
    return this.filterPotential().includes(potential);
  }
  
  getSelectedPotentialCount(): number {
    return this.filterPotential().length;
  }

  selectAllPotentials(): void {
    this.filterPotential.set(['100', '75', '50', '25', '0']);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }

  deselectAllPotentials(): void {
    this.filterPotential.set([]);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
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
