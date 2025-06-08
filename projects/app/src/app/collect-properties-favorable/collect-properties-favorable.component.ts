import { Component, computed, signal } from '@angular/core';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collect-properties-favorable',
  imports: [
    FormsModule
  ],
  templateUrl: './collect-properties-favorable.component.html',
  styleUrl: './collect-properties-favorable.component.less'
})
export class CollectPropertiesFavorableComponent {
  primary = signal<'prefer' | 'prevent' | null>(null);
  secondary = signal(false);
  primarySelected = computed(() => {
    return this.primary() !== null;
  });
  imageUrl = computed(() => {
    return this.state.currentImageUrl() || this.api.item()?.screenshot_url || null;
  });

  constructor(public state: StateService, private api: ApiService) {
  }

  clear() {
    this.primary.set(null);
    this.secondary.set(false);
  }
}
