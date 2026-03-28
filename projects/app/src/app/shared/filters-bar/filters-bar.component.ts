import { Component, input, output, signal, effect, OnDestroy, AfterViewInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatformService } from '../../../platform.service';
import { CommonModule } from '@angular/common';
import { TopicOption, TopicTreeNode } from '../taxonomy.service';

export interface FiltersBarState {
  status: string[];
  author: string;
  preference: string[];
  potential: string[];
  type: string;
  topic: string[];
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
  topic: Map<string, number>;
}

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

    // Special handling for 'new' status: includes moderation===2 OR undefined/null
    if (selectedStatuses.includes('new')) {
      if (moderation === undefined || moderation === null || moderation === 2) {
        return true;
      }
    }

    // Check if moderation value matches any other selected status
    const allowedValues = selectedStatuses
      .filter(s => s !== 'new') // exclude 'new' since we handled it above
      .map(status => FilterHelpers.STATUS_MAP[status as keyof typeof FilterHelpers.STATUS_MAP])
      .filter(v => v !== undefined);
    
    return allowedValues.includes(moderation);
  }
}

@Component({
  selector: 'app-filters-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.less'
})
export class FiltersBarComponent implements AfterViewInit, OnDestroy {
  // Inputs
  counts = input<FilterCounts>({
    status: new Map(),
    author: new Map(),
    preference: new Map(),
    potential: new Map(),
    type: new Map(),
    topic: new Map()
  });
  topicOptions = input<TopicOption[]>([]);
  topicTree = input<TopicTreeNode[]>([]);
  
  totalCount = input<number>(0);
  filteredCount = input<number>(0);
  showViewToggle = input<boolean>(false);
  showOrderBy = input<boolean>(true);
  initialState = input<FiltersBarState | null>(null);
  
  // Outputs
  filtersChange = output<FiltersBarState>();
  filtersCommit = output<FiltersBarState>(); // Emitted when dropdown closes or focus changes
  
  // Filter state
  filterStatus = signal<string[]>(FilterHelpers.DEFAULT_STATUSES);
  filterAuthor = signal<string>('all');
  filterPreference = signal<string[]>(['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent']);
  filterPotential = signal<string[]>(['100', '75', '50', '25', '0']);
  filterType = signal<string>('all');
  filterTopic = signal<string[]>([]);
  searchText = signal<string>('');
  orderBy = signal<string>('date');
  viewMode = signal<'grid' | 'list'>('grid');

  // Dropdown state
  statusDropdownOpen = signal<boolean>(false);
  preferenceDropdownOpen = signal<boolean>(false);
  potentialDropdownOpen = signal<boolean>(false);
  topicDropdownOpen = signal<boolean>(false);

  // Search text for filtering dropdown options
  statusSearchText = signal<string>('');
  preferenceSearchText = signal<string>('');
  potentialSearchText = signal<string>('');
  topicSearchText = signal<string>('');
  
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
  
  private hasEmittedOnce = false;
  private debounceTimer: any = null;
  private readonly DEBOUNCE_DELAY = 300; // 300ms debounce for view updates
  private documentClickListener?: (event: MouseEvent) => void;

  constructor(private platform: PlatformService) {
    // Set initial state from parent if provided
    effect(() => {
      const state = this.initialState();
      if (state && !this.hasEmittedOnce) {
        // Apply initial state without emitting
        this.filterStatus.set(state.status);
        this.filterAuthor.set(state.author);
        this.filterPreference.set(state.preference);
        this.filterPotential.set(state.potential);
        this.filterType.set(state.type);
        this.filterTopic.set(state.topic);
        this.searchText.set(state.search);
        this.orderBy.set(state.orderBy);
        if (state.view) {
          this.viewMode.set(state.view as 'grid' | 'list');
        }
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Set up document click listener only in browser
    this.platform.browser(() => {
      this.documentClickListener = this.onDocumentClick.bind(this);
      document.addEventListener('click', this.documentClickListener);
    });
  }

  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && !target.closest('.custom-multiselect')) {
      const wasOpen = this.statusDropdownOpen() || this.preferenceDropdownOpen() || this.potentialDropdownOpen() || this.topicDropdownOpen();
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
      this.topicDropdownOpen.set(false);
      
      // Commit changes when dropdown closes
      if (wasOpen && this.hasEmittedOnce) {
        this.commitFilters();
      }
    }
  }
  
  private emitFiltersChange(): void {
    this.hasEmittedOnce = true;
    this.filtersChange.emit({
      status: this.filterStatus(),
      author: this.filterAuthor(),
      preference: this.filterPreference(),
      potential: this.filterPotential(),
      type: this.filterType(),
      topic: this.filterTopic(),
      search: this.searchText(),
      orderBy: this.orderBy(),
      view: this.viewMode()
    });
  }

  private commitFilters(): void {
    this.hasEmittedOnce = true;
    this.filtersCommit.emit({
      status: this.filterStatus(),
      author: this.filterAuthor(),
      preference: this.filterPreference(),
      potential: this.filterPotential(),
      type: this.filterType(),
      topic: this.filterTopic(),
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
      this.hasEmittedOnce = true;
      this.emitFiltersChange();
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
      if (wasOpen && this.hasEmittedOnce) {
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
    return this.filterStatus()?.length || 0;
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
      if (wasOpen && this.hasEmittedOnce) {
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
      if (wasOpen && this.hasEmittedOnce) {
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

  // Topic filter methods (multi-level: filterTopic stores full sub-theme paths like "theme-id/sub-theme-id")
  allTopicIds = computed(() => this.topicTree().flatMap(t => t.children.map(c => c.id)));
  expandedThemes = signal<Set<string>>(new Set());

  toggleTopicDropdown(): void {
    const wasOpen = this.topicDropdownOpen();
    const next = !wasOpen;
    this.topicDropdownOpen.set(next);
    if (next) {
      this.statusDropdownOpen.set(false);
      this.preferenceDropdownOpen.set(false);
      this.potentialDropdownOpen.set(false);
      this.clearTopicSearch();
    } else {
      this.clearTopicSearch();
      if (wasOpen && this.hasEmittedOnce) {
        this.commitFilters();
      }
    }
  }

  toggleTopicSubTheme(subThemeId: string): void {
    const current = this.filterTopic();
    if (current.includes(subThemeId)) {
      this.filterTopic.set(current.filter(t => t !== subThemeId));
    } else {
      this.filterTopic.set([...current, subThemeId]);
    }
    this.emitDebouncedChange();
  }

  toggleTopicTheme(theme: TopicTreeNode): void {
    const current = this.filterTopic();
    const childIds = theme.children.map(c => c.id);
    const allSelected = childIds.every(id => current.includes(id));
    if (allSelected) {
      // Deselect all children
      this.filterTopic.set(current.filter(t => !childIds.includes(t)));
    } else {
      // Select all children
      const toAdd = childIds.filter(id => !current.includes(id));
      this.filterTopic.set([...current, ...toAdd]);
    }
    this.emitDebouncedChange();
  }

  isThemeFullySelected(theme: TopicTreeNode): boolean {
    const current = this.filterTopic();
    return theme.children.length > 0 && theme.children.every(c => current.includes(c.id));
  }

  isThemePartiallySelected(theme: TopicTreeNode): boolean {
    const current = this.filterTopic();
    const selectedCount = theme.children.filter(c => current.includes(c.id)).length;
    return selectedCount > 0 && selectedCount < theme.children.length;
  }

  isSubThemeSelected(subThemeId: string): boolean {
    return this.filterTopic().includes(subThemeId);
  }

  toggleThemeExpanded(themeId: string): void {
    this.expandedThemes.update(set => {
      const next = new Set(set);
      if (next.has(themeId)) {
        next.delete(themeId);
      } else {
        next.add(themeId);
      }
      return next;
    });
  }

  isThemeExpanded(themeId: string): boolean {
    return this.expandedThemes().has(themeId);
  }

  getSelectedTopicCount(): number {
    return this.filterTopic().length;
  }

  getTotalSubThemeCount(): number {
    return this.allTopicIds().length;
  }

  /** Summary chips: show deselected theme names when only 1-2 themes are fully deselected */
  getTopicChipSummary(): { mode: 'all' | 'none' | 'chips'; chips: string[] } {
    const selected = this.filterTopic();
    const all = this.allTopicIds();
    if (selected.length === 0) return { mode: 'none', chips: [] };
    if (selected.length === all.length) return { mode: 'all', chips: [] };
    // Summarise at theme level
    const tree = this.topicTree();
    const fullyDeselected = tree.filter(t => t.children.every(c => !selected.includes(c.id)));
    const partiallySelected = tree.filter(t => {
      const sel = t.children.filter(c => selected.includes(c.id)).length;
      return sel > 0 && sel < t.children.length;
    });
    if (fullyDeselected.length <= 2 && partiallySelected.length === 0) {
      return { mode: 'chips', chips: fullyDeselected.map(t => t.name) };
    }
    const fullySelected = tree.filter(t => t.children.every(c => selected.includes(c.id)));
    if (fullySelected.length <= 3) {
      return { mode: 'chips', chips: fullySelected.map(t => t.name + (partiallySelected.length > 0 ? '' : '')) };
    }
    return { mode: 'chips', chips: [`${fullySelected.length} themes`] };
  }

  selectAllTopics(): void {
    this.filterTopic.set([...this.allTopicIds()]);
    this.emitDebouncedChange();
  }

  deselectAllTopics(): void {
    this.filterTopic.set([]);
    this.emitDebouncedChange();
  }

  getFilteredTopicTree(): TopicTreeNode[] {
    const searchTerm = this.topicSearchText().toLowerCase();
    if (!searchTerm) {
      return this.topicTree();
    }
    return this.topicTree()
      .map(theme => {
        const themeMatches = theme.name.toLowerCase().includes(searchTerm);
        const matchingChildren = theme.children.filter(c => c.name.toLowerCase().includes(searchTerm));
        if (themeMatches) return theme; // Show full theme if theme name matches
        if (matchingChildren.length > 0) return { ...theme, children: matchingChildren };
        return null;
      })
      .filter((t): t is TopicTreeNode => t !== null);
  }

  clearTopicSearch(): void {
    this.topicSearchText.set('');
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
  
  onTypeChange(value: string): void {
    this.filterType.set(value);
    this.emitDebouncedChange();
  }
  
  onSearchChange(value: string): void {
    this.searchText.set(value);
    this.emitDebouncedChange();
  }
  
  onOrderByChange(value: string): void {
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
