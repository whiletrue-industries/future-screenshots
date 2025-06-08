import { AfterViewInit, Component, effect, signal, ViewChild } from '@angular/core';
import { Message, MessagesComponent } from "../messages/messages.component";
import { ApiService } from '../../api.service';
import { CollectPropertiesFavorableComponent } from "../collect-properties-favorable/collect-properties-favorable.component";
import { ActivatedRoute } from '@angular/router';

type StepSpec = {
  instructions: string;
};

@Component({
  selector: 'app-collect-properties',
  imports: [MessagesComponent, CollectPropertiesFavorableComponent],
  templateUrl: './collect-properties.component.html',
  styleUrl: './collect-properties.component.less'
})
export class CollectPropertiesComponent implements AfterViewInit {
  @ViewChild(MessagesComponent) messages: MessagesComponent;

  step = signal(-1);
  steps: StepSpec[] = [
    {
      instructions: $localize`Now, is that a future you would **prefer** would happen or is it a future you’ld rather **prevent**?`
    }
  ];

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.api.updateFromRoute(this.route.snapshot);
    effect(() => {
      const step = this.step();
      const messages = this.messages?.messages() || [];
      const expectedLength = step*2 + 1;
      if (messages.length === expectedLength - 1) {
        const stepSpec = this.steps[step];
        const message = new Message('ai', stepSpec.instructions);
        this.messages.addMessage(message);
      } else if (messages.length > expectedLength) {
        this.messages?.messages.update(msgs => {
          return msgs.slice(0, expectedLength);
        });
      }
    });
  }

  ngAfterViewInit() {
    this.step.set(0);
  }

  completeStep(update: any) {
    this.step.update(s => s + 1);
  }
}
