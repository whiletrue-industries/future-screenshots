import { Component, input, output, signal, effect, inject, afterNextRender, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatformService } from '../../../platform.service';

export interface FiltersBarState {
  status?: string[];
  author?: string;
  language?: string;
  facilitator?: string;
  preference?: string[];
  potential?: string[];
  type?: string;
  search: string;
  orderBy: string;
  view?: string;
}

export interface FilterCounts {
  status: Map<string, number>;
  author: Map<string, number>;
  language: Map<string, number>;
  facilitator: Map<string, number>;
  preference: Map<string, number>;
  potential: Map<string, number>;
  type: Map<string, number>;
}

export type FilterMode = 'moderation' | 'admin';

/**
 * Status value mapping for _private_moderation field
 */
export class FilterHelpers {
  static readonly STATUS_MAP = {
    'rejected': 0,
    'flagged': 1,
    'pending': 2,
    'not-flagged': 3,
    'approved': 4,
    'highlighted': 5,
  } as const;

  // All possible status values in display order
  static readonly ALL_STATUSES = ['new', 'flagged', 'not-flagged', 'approved', 'highlighted', 'rejected'];
  
  // Default status selection (all except rejected)
  static readonly DEFAULT_STATUSES = ['new', 'flagged', 'not-flagged', 'approved', 'highlighted'];

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
    } else if (moderation === 3) {
      return 'not-flagged';
    }
    return 'pending'; // default
  }

  /**
   * Get display label for a status value
   */
  static getStatusLabel(statusValue: string): string {
    const labels: { [key: string]: string } = {
      'new': 'New',
      'flagged': 'Flagged',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'highlighted': 'Highlighted',
      'not-flagged': 'Not Flagged'
    };
    return labels[statusValue] || statusValue;
  }

  /**
   * Get count key for a status value (for looking up in counts map)
   */
  static getStatusCountKey(statusValue: string): string {
    const countKeys: { [key: string]: string } = {
      'new': 'pending',
      'flagged': 'flagged',
      'approved': 'approved',
      'rejected': 'banned',
      'highlighted': 'highlighted',
      'not-flagged': 'not-flagged'
    };
    return countKeys[statusValue] || statusValue;
  }

  /**
   * Parse URL hash with support for ~ (exclude) and + (additive) syntax
   * Examples:
   *   status=new,flagged,~rejected  -> include new and flagged, exclude rejected
   *   search=my+query               -> additive search query (spaces as +)
   */
  static parseHashParam(paramValue: string | null): { included: string[], excluded: string[] } {
    if (!paramValue) {
      return { included: [], excluded: [] };
    }

    const parts = paramValue.split(',');
    const included: string[] = [];
    const excluded: string[] = [];

    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.startsWith('~')) {
        excluded.push(trimmed.substring(1));
      } else if (trimmed) {
        included.push(trimmed);
      }
    });

    return { included, excluded };
  }

  /**
   * Encode values to hash format with ~ for excluded items
   * Returns null if both arrays are empty
   */
  static encodeHashParam(included: string[], excluded: string[]): string | null {
    const parts = [
      ...included,
      ...excluded.map(e => `~${e}`)
    ];
    return parts.length > 0 ? parts.join(',') : null;
  }

  /**
   * Check if status filter is at default state (all except rejected)
   */
  static isDefaultStatusFilter(selectedStatuses: string[]): boolean {
    if (selectedStatuses.length !== FilterHelpers.DEFAULT_STATUSES.length) {
      return false;
    }
    return FilterHelpers.DEFAULT_STATUSES.every(s => selectedStatuses.includes(s)) &&
           !selectedStatuses.includes('rejected');
  }

  /**
   * Check if an item matches the selected status filters
   */
  static matchesStatusFilter(item: any, selectedStatuses: string[]): boolean {
    if (selectedStatuses.length === 0) {
      return true; // No filter means show all
    }
    const moderation = item._private_moderation;

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
export class FiltersBarComponent implements OnDestroy {
  // Inputs
  mode = input<FilterMode>('moderation'); // 'moderation' or 'admin'
  counts = input<FilterCounts>({
    status: new Map(),
    author: new Map(),
    language: new Map(),
    facilitator: new Map(),
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
  filterStatus = signal<string[]>(FilterHelpers.DEFAULT_STATUSES);
  filterAuthor = signal<string>('all');
  filterLanguage = signal<string>('all');
  filterFacilitator = signal<string>('all');
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
  
  // Search text for filtering dropdown options
  statusSearchText = signal<string>('');
  preferenceSearchText = signal<string>('');
  potentialSearchText = signal<string>('');
  
  // Options
  preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent', 'none'];
  potentialOptions = ['100', '75', '50', '25', '0', 'none'];
  statusOptions = [
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'pending', label: 'Pending' },
    { value: 'not-flagged', label: 'Not Flagged' },
    { value: 'approved', label: 'Approved' },
    { value: 'highlighted', label: 'Highlighted' }
  ];
  potentialLabelMap: {[key: string]: string} = {
    '100': 'Projected',
    '75': 'Probable',
    '50': 'Plausible',
    '25': 'Possible',
    '0': 'Preposterous',
    'none': 'None'
  };
  
  private initialized = false;
  private isInitializing = false;
  private changeEffectTriggered = false;
  private debounceTimer: any = null;
  private readonly DEBOUNCE_DELAY = 300; // 300ms debounce for view updates
  private platform = inject(PlatformService);
  private documentClickListener?: (event: MouseEvent) => void;

  constructor() {
    // Set up document click listener only in browser
    afterNextRender(() => {
      this.platform.browser(() => {
        this.documentClickListener = this.onDocumentClick.bind(this);
        document.addEventListener('click', this.documentClickListener);
      });
    });
    // Set initial state from parent if provided
    effect(() => {
      const state = this.initialState();
      console.log('[FiltersBar] initialState effect - state:', state);
      if (state && !this.initialized) {
        console.log('[FiltersBar] Setting initial state');
        this.isInitializing = true;
        if (state.status !== undefined) this.filterStatus.set(state.status);
        if (state.author !== undefined) this.filterAuthor.set(state.author);
        if (state.language !== undefined) this.filterLanguage.set(state.language);
        if (state.facilitator !== undefined) this.filterFacilitator.set(state.facilitator);
        if (state.preference !== undefined) this.filterPreference.set(state.preference);
        if (state.potential !== undefined) this.filterPotential.set(state.potential);
        if (state.type !== undefined) this.filterType.set(state.type);
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
  
  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && !target.closest('.custom-multiselect')) {
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
      language: this.filterLanguage(),
      facilitator: this.filterFacilitator(),
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
      language: this.filterLanguage(),
      facilitator: this.filterFacilitator(),
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
      this.clearStatusSearch(); // Clear search when opening
    } else {
      this.clearStatusSearch(); // Clear search when closing
      if (wasOpen && !this.isInitializing) {
        // Commit changes when dropdown is manually closed
        this.commitFilters();
      }
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
  
  /**
   * Get deselected statuses (inverse of selected)
   * Only relevant when 1-2 items are deselected
   */
  getDeselectedStatuses(): string[] {
    const selected = this.filterStatus();
    const allStatuses = this.statusOptions.map(opt => opt.value);
    return allStatuses.filter(status => !selected.includes(status));
  }
  
  /**
   * Check if we should show deselected chips instead of selected
   * True when 1-2 items are deselected (sparse deselection pattern)
   */
  shouldShowDeselectedStatusChips(): boolean {
    const deselected = this.getDeselectedStatuses();
    return deselected.length > 0 && deselected.length <= 2;
  }

  selectAllStatuses(): void {
    this.filterStatus.set(['rejected', 'flagged', 'pending', 'not-flagged', 'approved', 'highlighted']);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }

  deselectAllStatuses(): void {
    this.filterStatus.set([]);
    // Emit debounced change for immediate view update
    this.emitDebouncedChange();
  }

  removeStatusChip(status: string): void {
    this.toggleStatusFilter(status);
  }

  clearStatusSearch(): void {
    this.statusSearchText.set('');
  }

  // Preference filter methods
  togglePreferenceDropdown(): void {
    const wasOpen = this.preferenceDropdownOpen();
    const next = !wasOpen;
    this.preferenceDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
      this.clearPreferenceSearch(); // Clear search when opening
    } else {
      this.clearPreferenceSearch(); // Clear search when closing
      if (wasOpen && !this.isInitializing) {
        // Commit changes when dropdown is manually closed
        this.commitFilters();
      }
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
  
  /**
   * Get deselected preferences (inverse of selected)
   * Only relevant when 1-2 items are deselected
   */
  getDeselectedPreferences(): string[] {
    const selected = this.filterPreference();
    return this.preferenceOptions.filter(pref => !selected.includes(pref));
  }
  
  /**
   * Check if we should show deselected chips instead of selected
   * True when 1-2 items are deselected (sparse deselection pattern)
   */
  shouldShowDeselectedPreferenceChips(): boolean {
    const deselected = this.getDeselectedPreferences();
    return deselected.length > 0 && deselected.length <= 2;
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

  removePreferenceChip(pref: string): void {
    this.togglePreferenceFilter(pref);
  }

  getPreferenceLabel(pref: string): string {
    const labels: { [key: string]: string } = {
      'prefer': 'Prefer',
      'mostly prefer': 'Mostly Prefer',
      'uncertain': 'Uncertain',
      'mostly prevent': 'Mostly Prevent',
      'prevent': 'Prevent',
      'none': 'None'
    };
    return labels[pref] || pref;
  }

  getFilteredPreferenceOptions(): string[] {
    const searchTerm = this.preferenceSearchText().toLowerCase();
    if (!searchTerm) {
      return this.preferenceOptions;
    }
    return this.preferenceOptions.filter(pref =>
      this.getPreferenceLabel(pref).toLowerCase().includes(searchTerm)
    );
  }

  clearPreferenceSearch(): void {
    this.preferenceSearchText.set('');
  }

  // Potential filter methods
  togglePotentialDropdown(): void {
    const wasOpen = this.potentialDropdownOpen();
    const next = !wasOpen;
    this.potentialDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
      this.clearPotentialSearch(); // Clear search when opening
    } else {
      this.clearPotentialSearch(); // Clear search when closing
      if (wasOpen && !this.isInitializing) {
        // Commit changes when dropdown is manually closed
        this.commitFilters();
      }
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

  /**
   * Get deselected potentials (inverse of selected)
   * Only relevant when 1-2 items are deselected
   */
  getDeselectedPotentials(): string[] {
    const selected = this.filterPotential();
    return this.potentialOptions.filter(pot => !selected.includes(pot));
  }

  /**
   * Check if we should show deselected chips instead of selected
   * True when 1-2 items are deselected (sparse deselection pattern)
   */
  shouldShowDeselectedPotentialChips(): boolean {
    const deselected = this.getDeselectedPotentials();
    return deselected.length > 0 && deselected.length <= 2;
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

  removePotentialChip(pot: string): void {
    this.togglePotentialFilter(pot);
  }

  getPotentialLabel(pot: string): string {
    return this.potentialLabelMap[pot] || pot;
  }

  getFilteredPotentialOptions(): string[] {
    const searchTerm = this.potentialSearchText().toLowerCase();
    if (!searchTerm) {
      return this.potentialOptions;
    }
    return this.potentialOptions.filter(pot =>
      this.getPotentialLabel(pot).toLowerCase().includes(searchTerm)
    );
  }

  clearPotentialSearch(): void {
    this.potentialSearchText.set('');
  }

  // Get status options - shows all known status types
  // Statuses with data will have counts, others will show (0)
  getAvailableStatusOptions(): string[] {
    const statusCounts = this.counts().status;
    // Always show all possible statuses
    // But if data contains statuses not in our predefined list, add them
    const knownStatuses = new Set(FilterHelpers.ALL_STATUSES);
    const dataStatuses = Array.from(statusCounts.keys());
    
    // Map count keys back to status values
    const statusValueMap: { [key: string]: string } = {
      'pending': 'new',
      'flagged': 'flagged',
      'approved': 'approved',
      'banned': 'rejected',
      'highlighted': 'highlighted',
      'not-flagged': 'not-flagged'
    };
    
    const additionalStatuses = dataStatuses
      .map(countKey => statusValueMap[countKey])
      .filter(status => status && !knownStatuses.has(status));
    
    return [...FilterHelpers.ALL_STATUSES, ...additionalStatuses];
  }
  
  // Get label for status option
  getStatusLabel(status: string): string {
    return FilterHelpers.getStatusLabel(status);
  }
  
  // Get count for a status option
  getStatusCount(status: string): number {
    const countKey = FilterHelpers.getStatusCountKey(status);
    return this.getCount(this.counts().status, countKey);
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
  
  // Change handlers that update signals and emit changes
  onAuthorChange(value: string): void {
    this.filterAuthor.set(value);
    this.emitDebouncedChange();
  }

  onLanguageChange(event: any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterLanguage.set(value);
    this.emitDebouncedChange();
  }

  onFacilitatorChange(event: any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterFacilitator.set(value);
    this.emitDebouncedChange();
  }
  
  onTypeChange(value: string): void {
    this.filterType.set(value);
    this.emitDebouncedChange();
  }
  
  onSearchChange(event: any): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.emitDebouncedChange();
  }
  
  onOrderByChange(event: any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.orderBy.set(value);
    this.emitDebouncedChange();
  }
  
  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
    // Emit change immediately so parent component can update view
    this.emitFiltersChange();
  }

  ngOnDestroy(): void {
    // Clean up document click listener
    if (this.documentClickListener) {
      this.platform.browser(() => {
        document.removeEventListener('click', this.documentClickListener!);
      });
    }

    // Clear any pending debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
