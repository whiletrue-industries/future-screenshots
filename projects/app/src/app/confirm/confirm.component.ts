import { Component, computed, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective,
    FormsModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {
  isTemplateFlow = false;

  preferenceOptions = [
    { label: $localize`Preferred`, value: 'prefer' },
    { label: $localize`Mostly Preferred`, value: 'mostly prefer' },
    { label: $localize`Mostly Prevented`, value: 'mostly prevent' },
    { label: $localize`Prevented`, value: 'prevent' }
  ];

  potentialOptions = [
    { label: $localize`Projected`, value: 100 },
    { label: $localize`Probable`, value: 75 },
    { label: $localize`Plausible`, value: 50 },
    { label: $localize`Possible`, value: 25 },
    { label: $localize`Preposterous`, value: 0 }
  ];

  availableTags = computed(() => this.api.getAvailableTags());
  showSuggestions = signal(false);
  
  filteredTags = computed(() => {
    const input = this.state.batchTagsInput().toLowerCase().trim();
    if (!input) {
      return this.availableTags();
    }
    
    const currentTags = this.state.batchTags();
    return this.availableTags().filter(tag => 
      tag.toLowerCase().includes(input) && 
      !currentTags.includes(tag)
    );
  });

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.isTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';
        
    if (!this.state.currentImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }

  onTagInputChange(value: string): void {
    this.state.batchTagsInput.set(value);
    this.showSuggestions.set(value.trim().length > 0);
  }

  onKeyDown(event: KeyboardEvent): void {
    const currentInput = this.state.batchTagsInput();
    
    // Check for Enter or Comma to add tag
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const tag = currentInput.trim().replace(/,$/g, '');
      if (tag) {
        this.addTag(tag);
      }
    }
    // Check for Backspace to remove last tag when input is empty
    else if (event.key === 'Backspace' && !currentInput && this.state.batchTags().length > 0) {
      event.preventDefault();
      const tags = this.state.batchTags();
      this.removeTag(tags[tags.length - 1]);
    }
  }

  handleSuggestionClick(tag: string, event: MouseEvent): void {
    event.preventDefault();
    this.onSuggestionSelect(tag);
  }

  addTag(tag: string): void {
    const trimmedTag = tag.trim();
    if (trimmedTag && !this.state.batchTags().includes(trimmedTag)) {
      const newTags = [...this.state.batchTags(), trimmedTag];
      this.state.batchTags.set(newTags);
      this.state.batchTagsInput.set('');
      this.showSuggestions.set(false);
    }
  }

  removeTag(tag: string): void {
    const newTags = this.state.batchTags().filter(t => t !== tag);
    this.state.batchTags.set(newTags);
  }

  onSuggestionSelect(tag: string): void {
    this.addTag(tag);
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions.set(false);
    }, 200);
  }

  upload() {
    const currentImage = this.state.currentImage();
    if (currentImage) {
      const metadata: any = {};

      // Add preference if selected
      const pref = this.state.batchPreference();
      if (pref) {
        metadata['favorable_future'] = pref;
      }

      // Add potential if selected
      const pot = this.state.batchPotential();
      if (pot !== null) {
        metadata['plausibility'] = pot;
      }

      // Add textbox data if available
      const textboxData = this.state.currentTextboxData();
      if (textboxData) {
        metadata.textbox_content = textboxData;
      }
      
      // Add tags - merge batch tags with template tags
      const tags = this.state.batchTags();
      console.log('[CONFIRM] Current batch tags:', tags);
      if (this.isTemplateFlow) {
        // For template flow, combine no-paper tag with any batch tags
        metadata.tags = ['no-paper', ...tags];
      } else if (tags.length > 0) {
        // For regular flow, just use batch tags
        metadata.tags = tags;
      }
      console.log('[CONFIRM] Metadata.tags being sent:', metadata.tags);
      console.log('[CONFIRM] Full metadata:', metadata);
      
      this.api.createItem(metadata).subscribe({
        next: (res: any) => {
          console.log('[CONFIRM] Item created successfully:', res);
          const params: any = {
            'item-id': res.item_id,
            'key': res.item_key
          };
          // Preserve template flag for no-paper flow
          if (this.isTemplateFlow) {
            params['template'] = 'true';
          }
          if (!this.api.automatic()) {
            this.api.uploadImage(currentImage, res.item_id, res.item_key);
            this.router.navigate(['/props'], { queryParams: params, queryParamsHandling: 'merge'});
          } else {
            this.api.uploadImageAuto(currentImage, res.item_id, res.item_key).subscribe(() => {
              console.log('[CONFIRM] Upload complete');
              
              // Only clear tags if they haven't been modified from the initial URL tags
              const currentTags = this.state.batchTags();
              const tagsWereModified = JSON.stringify(currentTags.sort()) !== JSON.stringify(this.initialUrlTags.sort());
              
              if (!tagsWereModified && this.initialUrlTags.length === 0) {
                // No URL tags and no modifications - clear for fresh start
                console.log('[CONFIRM] No URL tags set, clearing tags for next scan');
                this.state.batchTags.set([]);
                this.state.batchTagsInput.set('');
              } else {
                // Tags were from URL or modified by user - persist them
                console.log('[CONFIRM] Tags modified or from URL, persisting for next scan:', currentTags);
              }
              
              this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
            });
          }
        },
        error: (error) => {
          console.error('[CONFIRM] Failed to create item:', error);
          console.error('[CONFIRM] Error status:', error.status);
          console.error('[CONFIRM] Error details:', error.error);
          
          // Show user-friendly error message
          if (error.status === 403) {
            alert('Access denied. Please check that you have the correct API key with write permissions for this workspace.');
          } else {
            alert('Failed to create item. Please try again or contact support.');
          }
        }
      });
    } else {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }
}
