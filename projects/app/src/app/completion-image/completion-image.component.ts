import { Component, computed } from '@angular/core';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-completion-image',
  imports: [],
  templateUrl: './completion-image.component.html',
  styleUrl: './completion-image.component.less'
})
export class CompletionImageComponent {

  prefer = computed(() => {
    const ff = this.api.item()?.favorable_future || '';
    return ff.indexOf('prefer') >= 0 || (ff.indexOf('prevent') >= 0 && ff.indexOf('mostly') >= 0);
  });

  prevent = computed(() => {
    const ff = this.api.item()?.favorable_future || '';
    return ff.indexOf('prevent') >= 0 || (ff.indexOf('prefer') >= 0 && ff.indexOf('mostly') < 0);
  });

  rotate = computed(() => {
    const sign = this.prefer() ? -1 : 1;
    return (100 - (this.api.item()?.plausibility || 0)) / 100 * 32 * sign;
  });

  imageUrl = computed(() => {
    const item = this.api.item();
    const currentImageUrl = this.state.currentImageUrl();
    return currentImageUrl || item?.screenshot_url || null;
  });

  constructor(private api: ApiService, private state: StateService) { }

}