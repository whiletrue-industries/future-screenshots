import { AfterViewInit, Component, computed, effect, signal, ViewChild } from '@angular/core';
import { Message, MessagesComponent } from "../messages/messages.component";
import { ApiService } from '../../api.service';
import { CollectPropertiesFavorableComponent } from "../collect-properties-favorable/collect-properties-favorable.component";
import { ActivatedRoute } from '@angular/router';
import { CollectPropertiesPotentialComponent } from "../collect-properties-potential/collect-properties-potential.component";
import { timer } from 'rxjs';

type StepSpec = {
  instructions: string;
};

export type StepUpdate = {
  message: string;
  props: any;
};

@Component({
  selector: 'app-collect-properties',
  imports: [MessagesComponent, CollectPropertiesFavorableComponent, CollectPropertiesPotentialComponent],
  templateUrl: './collect-properties.component.html',
  styleUrl: './collect-properties.component.less'
})
export class CollectPropertiesComponent implements AfterViewInit {
  @ViewChild(MessagesComponent) messages: MessagesComponent;

  step = signal(-1);
  steps: StepSpec[] = [
    {
      instructions: $localize`Now, is that a future you would **prefer** would happen or is it a future you’ld rather **prevent**?`
    },
    {
      instructions: $localize`And can you evaluate how likely is this future?`
    },
    {
      instructions: $localize`Got it. Thanks!\n\nWe’re currently analyzing your screenshot and adding it to the Futures Map. This usually takes a few minutes. When it’s ready we will **email** you a **secret link** so you can always find, edit or delete your screenshots from the map.`,      
    },
  ];

  propsUpdate = signal<any>({});
  prefer = computed(() => {
    return this.propsUpdate()?.favorable_future.indexOf('prefer') >= 0;
  });

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.api.updateFromRoute(this.route.snapshot);
    effect(() => {
      const step = this.step();
      const messages = this.messages?.messages() || [];
      const expectedLength = step + 1;
      if (messages.length === expectedLength - 1) {
        const stepSpec = this.steps[Math.floor(step / 2)];
        const message = new Message('ai', stepSpec.instructions);
        this.messages.addMessage(message);
      // } else if (messages.length > expectedLength) {
      //   this.messages?.messages.update(msgs => {
      //     return msgs.slice(0, expectedLength);
      //   });
      }
    });
  }

  ngAfterViewInit() {
    this.step.set(0);
  }

  completeStep(update: StepUpdate) {
    this.messages.addMessage(new Message('human', update.message));
    this.propsUpdate.update(s => Object.assign({}, s, update.props));
    this.step.update(s => s + 1);
    timer(2000).subscribe(() => {
      this.step.update(s => s + 1);
    });
  }
}
