import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FilterOptions {
  statuses: string[];
  authors: string[];
  preferences: string[];
  potentials: string[];
  types: string[];
}

export interface FilterValues {
  status: string[];
  author: string;
  preference: string[];
  potential: string[];
  type: string;
  search: string;
  orderBy: string;
}

@Component({
  selector: 'app-filters-bar',
  imports: [FormsModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.less'
})
export class FiltersBarComponent {
  // Inputs - available filter options
  options = input<FilterOptions>({
    statuses: ['new', 'flagged', 'approved', 'highlighted'],
    authors: [],
    preferences: ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent'],
    potentials: ['100', '75', '50', '25', '0'],
    types: []
  });

  // Inputs - counts for each option
  statusCounts = input<Map<string, number>>(new Map());
  authorCounts = input<Map<string, number>>(new Map());
  preferenceCounts = input<Map<string, number>>(new Map());
  potentialCounts = input<Map<string, number>>(new Map());
  typeCounts = input<Map<string, number>>(new Map());

  // Outputs - filter changes
  filterChange = output<FilterValues>();

  // Internal state for filters
  selectedStatuses = signal<string[]>(['new', 'flagged', 'approved', 'highlighted']);
  selectedAuthor = signal<string>('all');
  selectedPreferences = signal<string[]>(['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent']);
  selectedPotentials = signal<string[]>(['100', '75', '50', '25', '0']);
  selectedType = signal<string>('all');
  searchText = signal<string>('');
  orderBy = signal<string>('date');

  // Dropdown state
  statusDropdownOpen = signal<boolean>(false);
  preferenceDropdownOpen = signal<boolean>(false);
  potentialDropdownOpen = signal<boolean>(false);

  /**
   * Toggle status dropdown
   */
  toggleStatusDropdown(): void {
    this.statusDropdownOpen.set(!this.statusDropdownOpen());
    this.preferenceDropdownOpen.set(false);
    this.potentialDropdownOpen.set(false);
  }

  /**
   * Toggle preference dropdown
   */
  togglePreferenceDropdown(): void {
    this.preferenceDropdownOpen.set(!this.preferenceDropdownOpen());
    this.statusDropdownOpen.set(false);
    this.potentialDropdownOpen.set(false);
  }

  /**
   * Toggle potential dropdown
   */
  togglePotentialDropdown(): void {
    this.potentialDropdownOpen.set(!this.potentialDropdownOpen());
    this.statusDropdownOpen.set(false);
    this.preferenceDropdownOpen.set(false);
  }

  /**
   * Check if status is selected
   */
  isStatusSelected(status: string): boolean {
    return this.selectedStatuses().includes(status);
  }

  /**
   * Toggle status filter
   */
  toggleStatusFilter(status: string): void {
    const current = this.selectedStatuses();
    if (current.includes(status)) {
      this.selectedStatuses.set(current.filter(s => s !== status));
    } else {
      this.selectedStatuses.set([...current, status]);
    }
    this.emitFilterChange();
  }

  /**
   * Check if preference is selected
   */
  isPreferenceSelected(preference: string): boolean {
    return this.selectedPreferences().includes(preference);
  }

  /**
   * Toggle preference filter
   */
  togglePreferenceFilter(preference: string): void {
    const current = this.selectedPreferences();
    if (current.includes(preference)) {
      this.selectedPreferences.set(current.filter(p => p !== preference));
    } else {
      this.selectedPreferences.set([...current, preference]);
    }
    this.emitFilterChange();
  }

  /**
   * Check if potential is selected
   */
  isPotentialSelected(potential: string): boolean {
    return this.selectedPotentials().includes(potential);
  }

  /**
   * Toggle potential filter
   */
  togglePotentialFilter(potential: string): void {
    const current = this.selectedPotentials();
    if (current.includes(potential)) {
      this.selectedPotentials.set(current.filter(p => p !== potential));
    } else {
      this.selectedPotentials.set([...current, potential]);
    }
    this.emitFilterChange();
  }

  /**
   * Handle author change
   */
  onAuthorChange(author: string): void {
    this.selectedAuthor.set(author);
    this.emitFilterChange();
  }

  /**
   * Handle type change
   */
  onTypeChange(type: string): void {
    this.selectedType.set(type);
    this.emitFilterChange();
  }

  /**
   * Handle search text change
   */
  onSearchChange(search: string): void {
    this.searchText.set(search);
    this.emitFilterChange();
  }

  /**
   * Handle order by change
   */
  onOrderByChange(orderBy: string): void {
    this.orderBy.set(orderBy);
    this.emitFilterChange();
  }

  /**
   * Emit filter change event
   */
  private emitFilterChange(): void {
    this.filterChange.emit({
      status: this.selectedStatuses(),
      author: this.selectedAuthor(),
      preference: this.selectedPreferences(),
      potential: this.selectedPotentials(),
      type: this.selectedType(),
      search: this.searchText(),
      orderBy: this.orderBy()
    });
  }

  /**
   * Get count for an option
   */
  getCount(counts: Map<string, number>, key: string): number {
    return counts.get(key) || 0;
  }

  /**
   * Get selected status count for dropdown label
   */
  getSelectedStatusCount(): number {
    return this.selectedStatuses().length;
  }

  /**
   * Get selected preference count for dropdown label
   */
  getSelectedPreferenceCount(): number {
    return this.selectedPreferences().length;
  }

  /**
   * Get selected potential count for dropdown label
   */
  getSelectedPotentialCount(): number {
    return this.selectedPotentials().length;
  }
}
