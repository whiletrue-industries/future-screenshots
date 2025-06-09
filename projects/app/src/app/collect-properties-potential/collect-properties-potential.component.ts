import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';
import { StepUpdate } from '../collect-properties/collect-properties.component';

type Label = {
  label: string;
  description: string;
  value: number;
  dashed?: boolean;
};

@Component({
  selector: 'app-collect-properties-potential',
  imports: [],
  templateUrl: './collect-properties-potential.component.html',
  styleUrl: './collect-properties-potential.component.less'
})
export class CollectPropertiesPotentialComponent {

  @Input() prefer = true;
  @Output() done = new EventEmitter<StepUpdate>();

  LABELS: Label[] = [
    {
      label: $localize`Projected`,
      description: $localize`will happen for sure`,
      value: 100
    },
    {
      label: $localize`Probable`,
      description: $localize`almost certain`,
      value: 75
    },
    {
      label: $localize`Plausible`,
      description: $localize`not obvious, not surprising`,
      value: 50
    },
    {
      label: $localize`Possible`,
      description: $localize`highly unlikely, not impossible`,
      value: 25
    },
    {
      label: $localize`Preposterous`,
      description: $localize`can never happen`,
      value: 0,
      dashed: true
    },
  ];

  imageUrl = computed(() => {
    return this.state.currentImageUrl() || this.api.item()?.screenshot_url || null;
  });

  constructor(public state: StateService, private api: ApiService) {
  }

  submit(label: Label) {
    const message = label.label;
    const props = {
      'plausibility': label.value,
    };
    this.done.emit({
      message: message,
      props: props
    });
  }

}
