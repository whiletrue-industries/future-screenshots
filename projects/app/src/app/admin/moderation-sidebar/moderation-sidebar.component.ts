import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../../admin-api.service';
import { TaxonomyService } from '../../shared/taxonomy.service';
import {
  STATUS_OPTIONS,
  LEVELS,
  coerceValue,
  getAIConfidence,
  getConfidenceLevel,
  getDesirabilityClass,
  getPlausibilityClass,
  getEmail,
  formatDate,
} from '../moderation-helpers';

@Component({
  selector: 'app-moderation-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './moderation-sidebar.component.html',
  styleUrl: './moderation-sidebar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModerationSidebarComponent {
  private api = inject(AdminApiService);
  private taxonomyService = inject(TaxonomyService);

  item = input<any | null>(null);
  workspaceId = input<string | null>(null);
  apiKey = input<string | null>(null);
  userItemCount = input<number>(0);
  title = input<string>('Item Details');
  showCloseButton = input<boolean>(true);

  close = output<void>();
  itemChange = output<any>();
  filterByAuthor = output<string>();

  editTagline = signal<string | null>(null);

  readonly LEVELS = LEVELS;
  readonly STATUS_OPTIONS = STATUS_OPTIONS;

  editableMetadata = computed<[string, any][]>(() => {
    const currentItem = this.item();
    if (!currentItem) {
      return [];
    }
    const excluded = new Set([
      '_id',
      'id',
      '_workspaceId',
      '_workspaceName',
      '_workspaceAdminKey',
      'content',
      'future_scenario_description',
    ]);
    return Object.entries(currentItem).filter(([key, value]) => {
      return !excluded.has(key) && ['string', 'number', 'boolean'].includes(typeof value);
    });
  });

  getEmail = getEmail;
  getAIConfidence = getAIConfidence;
  getConfidenceLevel = getConfidenceLevel;
  getDesirabilityClass = getDesirabilityClass;
  getPlausibilityClass = getPlausibilityClass;
  formatDate = formatDate;

  onClose(): void {
    this.close.emit();
  }

  onFilterByAuthor(authorId: string): void {
    this.filterByAuthor.emit(authorId);
  }

  resolveTopic(topicId: string): string {
    return this.taxonomyService.resolveTopic(topicId);
  }

  setStatusFromSidebar(level: number): void {
    this.updateModeration(level);
  }

  reject(): void {
    this.updateModeration(0);
  }

  approve(): void {
    this.updateModeration(4);
  }

  highlight(): void {
    this.updateModeration(5);
  }

  unarchive(): void {
    this.updateModeration(2);
  }

  updateMetadataField(key: string, rawValue: any): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const value = coerceValue(currentItem[key], rawValue);
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), { [key]: value }).subscribe({
      next: () => this.emitMergedItem({ [key]: value }),
      error: (err) => console.error('Error updating field', key, err),
    });
  }

  setPlausibility(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const plausibility = currentItem.plausibility === null || currentItem.plausibility === undefined
      ? null
      : Number.parseInt(String(currentItem.plausibility), 10);
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), { plausibility }).subscribe({
      next: () => this.emitMergedItem({ plausibility }),
      error: (err) => console.error('Error updating plausibility', err),
    });
  }

  setFavorable(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), {
      favorable_future: currentItem.favorable_future,
    }).subscribe({
      next: () => this.emitMergedItem({ favorable_future: currentItem.favorable_future }),
      error: (err) => console.error('Error updating favorable_future', err),
    });
  }

  setTagline(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const updateData = {
      future_scenario_tagline: currentItem.future_scenario_tagline,
      future_scenario_description: currentItem.future_scenario_tagline,
    };
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), updateData).subscribe({
      next: () => {
        this.editTagline.set(null);
        this.emitMergedItem(updateData);
        this.api.reanalyzeItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), currentItem.item_key || '').subscribe({
          error: (err) => console.error('Error triggering reanalysis after tagline update', err),
        });
      },
      error: (err) => console.error('Error updating tagline', err),
    });
  }

  saveContent(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const content = currentItem.content || null;
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), { content }).subscribe({
      next: () => this.emitMergedItem({ content }),
      error: (err) => console.error('Error updating content', err),
    });
  }

  saveFutureScenarioDescription(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const futureScenarioDescription = currentItem.future_scenario_description || null;
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), {
      future_scenario_description: futureScenarioDescription,
    }).subscribe({
      next: () => this.emitMergedItem({ future_scenario_description: futureScenarioDescription }),
      error: (err) => console.error('Error updating future_scenario_description', err),
    });
  }

  removeTag(tagIndex: number): void {
    const currentItem = this.item();
    if (!currentItem) {
      return;
    }
    currentItem.tags = (currentItem.tags || []).filter((_: string, index: number) => index !== tagIndex);
    this.setTags();
  }

  addTag(tagInput: HTMLInputElement): void {
    const currentItem = this.item();
    if (!currentItem) {
      return;
    }
    const newTag = tagInput.value.trim();
    if (newTag && !(currentItem.tags || []).includes(newTag)) {
      currentItem.tags = [...(currentItem.tags || []), newTag];
      this.setTags();
      tagInput.value = '';
    }
  }

  regenerateFromScratch(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const clearedFields = {
      embedding: null,
      content_certainty: null,
      transition_bar_certainty: null,
      transition_bar_event_prediction: null,
      content_title: null,
      future_scenario_description: null,
      future_scenario_tagline: null,
      future_scenario_topics: null,
    };
    this.emitMergedItem(clearedFields);
    this.api.reanalyzeItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), currentItem.item_key || '').subscribe({
      error: (err) => console.error('Error triggering reanalysis', err),
    });
  }

  regenerateMetaFields(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const topicsFromTags = Array.isArray(currentItem.tags) && currentItem.tags.length
      ? currentItem.tags.reduce((acc: Record<string, string>, tag: unknown, index: number) => {
          if (typeof tag === 'string' && tag) {
            acc[`topic_${index + 1}`] = tag;
          }
          return acc;
        }, {})
      : currentItem.future_scenario_topics || null;

    const updateData = {
      content_title: currentItem.content_title || null,
      future_scenario_description: currentItem.future_scenario_description || null,
      future_scenario_tagline: currentItem.future_scenario_tagline || null,
      future_scenario_topics: topicsFromTags,
      embedding: null,
      content_certainty: null,
      transition_bar_certainty: null,
      transition_bar_event_prediction: null,
    };

    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), updateData).subscribe({
      next: () => this.emitMergedItem(updateData),
      error: (err) => console.error('Error regenerating meta fields', err),
    });
  }

  estimateEvaluation(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const currentTags = Array.isArray(currentItem.tags) ? [...currentItem.tags] : [];
    if (!currentTags.includes('ai_plausibility')) {
      currentTags.push('ai_plausibility');
    }
    if (!currentTags.includes('ai_favorable_future')) {
      currentTags.push('ai_favorable_future');
    }

    const updateData: Record<string, unknown> = {
      tags: currentTags,
    };
    if (currentItem.plausibility === null || currentItem.plausibility === undefined) {
      updateData['plausibility'] = null;
    }
    if (currentItem.favorable_future === null || currentItem.favorable_future === undefined) {
      updateData['favorable_future'] = null;
    }

    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), updateData).subscribe({
      next: () => this.emitMergedItem(updateData),
      error: (err) => console.error('Error estimating evaluation', err),
    });
  }

  getItemId(item: any): string {
    return item._id || item.id;
  }

  private setTags(): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    const updateData = {
      tags: currentItem.tags,
      future_scenario_topics: currentItem.future_scenario_topics,
    };
    this.api.updateItem(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), updateData).subscribe({
      next: () => this.emitMergedItem(updateData),
      error: (err) => console.error('Error updating tags', err),
    });
  }

  private updateModeration(level: number): void {
    const currentItem = this.item();
    const creds = this.getItemCredentials();
    if (!currentItem || !creds) {
      return;
    }

    this.api.updateItemModeration(creds.workspaceId, creds.apiKey, this.getItemId(currentItem), level).subscribe({
      next: () => this.emitMergedItem({ _private_moderation: level }),
      error: (err) => console.error('Error updating moderation', err),
    });
  }

  private getItemCredentials(): { workspaceId: string; apiKey: string } | null {
    const currentItem = this.item();
    if (!currentItem) {
      return null;
    }

    const workspaceId = currentItem._workspaceId || this.workspaceId();
    const apiKey = currentItem._workspaceAdminKey || this.apiKey();
    if (!workspaceId || !apiKey) {
      return null;
    }
    return { workspaceId, apiKey };
  }

  private emitMergedItem(patch: Record<string, unknown>): void {
    const currentItem = this.item();
    if (!currentItem) {
      return;
    }
    this.itemChange.emit({ ...currentItem, ...patch });
  }
}
