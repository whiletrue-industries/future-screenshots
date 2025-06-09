import { Component, computed, EventEmitter, Output, signal } from '@angular/core';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { StepUpdate } from '../collect-properties/collect-properties.component';

@Component({
  selector: 'app-collect-properties-favorable',
  imports: [
    FormsModule
  ],
  templateUrl: './collect-properties-favorable.component.html',
  styleUrl: './collect-properties-favorable.component.less'
})
export class CollectPropertiesFavorableComponent {

  @Output() done = new EventEmitter<StepUpdate>();

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

  submit() {
    const primary = this.primary();
    if (!primary) {
      return;
    }
    const props = {
      'favorable_future': primary as string
    };
    if (this.secondary()) {
      props['favorable_future'] = 'mostly ' + props['favorable_future'];
    }
    const message = primary.charAt(0).toUpperCase() + primary.slice(1) + (this.secondary() ? '-ish' : '');
    this.done.emit({message, props});
  }
}
