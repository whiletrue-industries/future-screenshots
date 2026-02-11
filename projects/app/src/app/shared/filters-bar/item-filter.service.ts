import { Injectable } from '@angular/core';
import { FilterHelpers, FiltersBarState } from './filters-bar.component';

/**
 * Service for applying filters and sorting to items
 * Centralized logic to avoid duplication across components
 */
@Injectable({
  providedIn: 'root'
})
export class ItemFilterService {

  private readonly preferenceOptions = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent', 'none'];
  private readonly potentialOptions = ['100', '75', '50', '25', '0', 'none'];

  /**
   * Apply all filters from FiltersBarState to the items array
   */
  applyFilters(items: any[], filters: FiltersBarState): any[] {
    let filtered = [...items];

    // Status filter using FilterHelpers
    if (filters.status.length > 0) {
      filtered = filtered.filter(item => FilterHelpers.matchesStatusFilter(item, filters.status));
    }

    // Author filter
    if (filters.author !== 'all') {
      if (filters.author === 'unattributed') {
        filtered = filtered.filter(item => !item.author_id || item.author_id === 'unknown');
      } else {
        filtered = filtered.filter(item => item.author_id === filters.author);
      }
    }

    // Preference filter
    if (filters.preference.length > 0 && filters.preference.length < this.preferenceOptions.length) {
      filtered = filtered.filter(item => {
        const value = item.favorable_future;
        if (filters.preference.includes('none')) {
          // Include items with undefined/null/empty values when 'none' is selected
          if (!value || value === '' || value === 'none') {
            return true;
          }
        }
        return filters.preference.includes(value);
      });
    }

    // Potential filter
    if (filters.potential.length > 0 && filters.potential.length < this.potentialOptions.length) {
      filtered = filtered.filter(item => {
        const value = item.plausibility;
        if (filters.potential.includes('none')) {
          // Include items with undefined/null/empty values when 'none' is selected
          if (value === undefined || value === null || value === '' || value === 'none') {
            return true;
          }
        }
        return filters.potential.includes(String(value));
      });
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(item => item.screenshot_type === filters.type);
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item => {
        const tagline = (item.future_scenario_tagline || '').toLowerCase();
        const description = (item.future_scenario_description || '').toLowerCase();
        const content = (item.content || '').toLowerCase();
        return tagline.includes(searchLower) || description.includes(searchLower) || content.includes(searchLower);
      });
    }

    return filtered;
  }

  /**
   * Sort items based on the orderBy criteria
   */
  sortItems(items: any[], orderBy: string, userItemCounts?: Map<string, number>): any[] {
    const sorted = [...items];

    switch (orderBy) {
      case 'date':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA; // Newest first
        });

      case 'status':
        return sorted.sort((a, b) => {
          return (b._private_moderation || 0) - (a._private_moderation || 0);
        });

      case 'author':
        return sorted.sort((a, b) => {
          const authorA = a.author_id || 'unknown';
          const authorB = b.author_id || 'unknown';

          // Keep unknown at the end
          if (authorA === 'unknown' && authorB !== 'unknown') return 1;
          if (authorA !== 'unknown' && authorB === 'unknown') return -1;

          // Sort by item count (descending) if counts provided
          if (userItemCounts) {
            const countA = userItemCounts.get(authorA) || 0;
            const countB = userItemCounts.get(authorB) || 0;
            return countB - countA;
          }

          return authorA.localeCompare(authorB);
        });

      case 'confidence':
        return sorted.sort((a, b) => {
          return this.getAIConfidence(b) - this.getAIConfidence(a);
        });

      case 'type':
        return sorted.sort((a, b) => {
          const typeA = a.screenshot_type || '';
          const typeB = b.screenshot_type || '';
          return typeA.localeCompare(typeB);
        });

      case 'preference':
        return sorted.sort((a, b) => {
          const prefOrder = ['prefer', 'mostly prefer', 'uncertain', 'mostly prevent', 'prevent'];
          const prefA = a.favorable_future || 'uncertain';
          const prefB = b.favorable_future || 'uncertain';
          return prefOrder.indexOf(prefA) - prefOrder.indexOf(prefB);
        });

      default:
        return sorted;
    }
  }

  /**
   * Calculate filter counts from all items
   */
  calculateFilterCounts(data: any[]): {
    status: Map<string, number>;
    author: Map<string, number>;
    preference: Map<string, number>;
    potential: Map<string, number>;
    type: Map<string, number>;
  } {
    const status = new Map<string, number>();
    const author = new Map<string, number>();
    const preference = new Map<string, number>();
    const potential = new Map<string, number>();
    const type = new Map<string, number>();

    data.forEach((item: any) => {
      // Status counts using FilterHelpers
      const statusKey = FilterHelpers.getStatusKey(item);
      status.set(statusKey, (status.get(statusKey) || 0) + 1);

      // Author counts
      const authorId = item.author_id || 'unknown';
      author.set(authorId, (author.get(authorId) || 0) + 1);

      // Preference counts
      if (item.favorable_future) {
        preference.set(item.favorable_future, (preference.get(item.favorable_future) || 0) + 1);
      }

      // Potential counts
      if (item.plausibility !== null && item.plausibility !== undefined) {
        const key = String(item.plausibility);
        potential.set(key, (potential.get(key) || 0) + 1);
      }

      // Type counts
      if (item.screenshot_type) {
        type.set(item.screenshot_type, (type.get(item.screenshot_type) || 0) + 1);
      }
    });

    return { status, author, preference, potential, type };
  }

  private getAIConfidence(item: any): number {
    // Calculate confidence based on content_certainty and transition_bar_certainty
    const content = item.content_certainty || 0;
    const transition = item.transition_bar_certainty || 0;
    return Math.round((content + transition) / 2);
  }
}
