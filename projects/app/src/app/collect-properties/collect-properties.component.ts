import { AfterViewInit, Component, computed, effect, signal, ViewChild } from '@angular/core';
import { Message, MessagesComponent } from "../messages/messages.component";
import { ApiService } from '../../api.service';
import { CollectPropertiesFavorableComponent } from "../collect-properties-favorable/collect-properties-favorable.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CollectPropertiesPotentialComponent } from "../collect-properties-potential/collect-properties-potential.component";
import { filter, firstValueFrom, switchMap, tap, timer } from 'rxjs';
import { CollectEmailComponent } from "../collect-properties-email/collect-properties-email.component";
import { CompleteEvaluationComponent } from "../complete-evaluation/complete-evaluation.component";
import { DirectToMapComponent } from "../direct-to-map/direct-to-map.component";

type StepSpec = {
  id: number;
  instructions: string;
  skip?: () => any | null;
};

export type StepUpdate = {
  message: string;
  props: any;
};

@Component({
  selector: 'app-collect-properties',
  imports: [MessagesComponent, CollectPropertiesFavorableComponent, CollectPropertiesPotentialComponent, CollectEmailComponent, CompleteEvaluationComponent, DirectToMapComponent],
  templateUrl: './collect-properties.component.html',
  styleUrl: './collect-properties.component.less'
})
export class CollectPropertiesComponent implements AfterViewInit {
  @ViewChild(MessagesComponent) messages: MessagesComponent;

  step = signal(-1);
  actualSteps = signal<StepSpec[]>([]);
  steps: StepSpec[] = [
    {
      id: 0,
      instructions: $localize`Now, is that a future you would **prefer** would happen or is it a future you’ld rather **prevent**?`,
      skip: () => {
        if (!!this.api.item()?.favorable_future) {
          return {};
        }
        if (this.api.isWorkshop()) {
          console.log('Skipping favorable future step, workshop mode');
          return {};
        }
        return null;
      }
    },
    {
      id: 1,
      instructions: $localize`And can you evaluate how likely is this future?`,
      skip: () => {
        const potential = this.api.item()?.plausibility;
        if (potential !== undefined && potential !== null && potential >= 0) {
          console.log('Skipping potential step, already set', potential);
          return {};
        }
        if (this.api.isWorkshop()) {
          console.log('Skipping potential step, workshop mode');
          return {};
        }
        console.log('Potential step not skipped, not set', potential);
        return null;
      }
    },
    {
      id: 2,
      instructions: $localize`Got it. Thanks!\n\nWe’re currently analyzing your screenshot and adding it to the Futures Map. This usually takes a few minutes. When it’s ready we will **email** you a **secret link** so you can always find, edit or delete your screenshots from the map.`,
      skip: () => {
        let email = this.api.item()?._private_email;
        const email_refused = this.api.item()?._private_refused_email;
        if (email || email_refused) {
          return {};
        }
        email = this.localStorage?.getItem('mapfutures-email');
        const email_subscribe = this.localStorage?.getItem('mapfutures-email-subscribe') === 'true';
        if (email) {
          this.emailFromStorage = true;
          return {
            _private_email: email,
            _private_email_subscribe: email_subscribe,
          };
        }
        this.emailRequested = true;
        return null;
      }
    },
    {
      id: 10,
      instructions: '',
      skip: () => {
        const propsUpdate = this.propsUpdate();
        const item_id = this.api.itemId();
        const item_key = this.api.itemKey();
        console.log('CONSIDERING IF UPDATE IS NEEDED', propsUpdate);
        if (item_id && item_key) {
          for (const _ in propsUpdate) {
            this.api.item.update((item: any) => Object.assign({}, item, propsUpdate));
            console.log('Updating item with props:', propsUpdate);
            this.messages.thinking.set(true);
            this.api.uploadImageInProgress.pipe(
              filter((inProgress) => inProgress === false),
              switchMap(() => this.api.updateItem(propsUpdate, item_id, item_key)),
              tap(() => {
                this.messages.thinking.set(false);
              })
            ).subscribe();
            break;
          }
        }
        this.propsUpdate.set({});
        return {};
      }
    },
    {
      id: 11,
      instructions: $localize`Perfect! We’re all set.\n\nExpect an email soon from **MapFutur.es!**`,
      skip: () => {
        const item = this.api.item();
        if (this.emailRequested && item && item._private_email) {
          return null;
        }
        return {};
      }
    },  
    {
      id: 12,
      instructions: $localize`Got it. Thanks!\n\nWe will send another **secret link** to :EMAIL: as soon as this screenshot is added to the Futures Map.`,
      skip: () => {
        if (this.emailFromStorage) {
          return null;
        }
        return {};
      }
    },
    {
      id: 13,
      instructions: $localize`Well, you will lose the option to edit and track your screenshot, but we will try to handle it with care. **Thanks**!`,
      skip: () => {
        const item = this.api.item();
        if (this.emailRequested && item && item._private_refused_email) {
          return null;
        }
        return {};
      },
    },
    {
      id: 20,
      instructions: '',
      skip: () => {
        if (!this.api.isWorkshopFollowup() && !this.api.isWorkshop()) {
          console.log('Skipping potential step, not in workshop mode');
          return {};
        }
        this.router.navigate(['/discuss'], { queryParamsHandling: 'preserve' });
        return null;
      }
    },
    {
      id: 21,
      instructions: $localize`That’s great!\n\nWe added “:TAGLINE:” to the map!\n\n**Want to see it?**`,      
      skip: () => {
        const itemKey = this.api.itemKey();
        if (itemKey && this.fragment() === 'publish') {
          return null;
        }
        return {};
      }
    },
    {
      id: 22,
      instructions: $localize`We added “:TAGLINE:” to the map!\n\n**Want to see it?**`,      
      skip: () => {
        const itemKey = this.api.itemKey();
        if (itemKey && this.fragment() === 'publish') {
          return {};
        }
        return null;
      }
    }
  ];

  propsUpdate = signal<any>({});
  prefer = computed(() => {
    return this.propsUpdate()?.favorable_future.indexOf('prefer') >= 0;
  });
  viewInit = signal(false);
  stepInitialized = signal(false);
  fragment = signal<string | null>(null);
  emailRequested = false;
  emailFromStorage = false;
  localStorage = typeof localStorage !== 'undefined' ? localStorage : null;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.api.updateFromRoute(this.route.snapshot);
    this.fragment.set(this.route.snapshot.fragment || null);
    console.log('FRAGMENT', this.fragment());
    effect(() => {
      const messages = this.messages?.messages() || [];
      const actualSteps = this.actualSteps();
      const expectedLength = actualSteps.length*2 - 1;
      if (messages.length === expectedLength - 1) {
        const stepSpec = actualSteps[actualSteps.length - 1];
        const message = new Message(
          'ai', 
          stepSpec.instructions
            .replace(':TAGLINE:', this.api.item()?.future_scenario_tagline || '')
            .replace(':EMAIL:', this.api.item()?._private_email || '')
        );
        this.messages.addMessage(message);
      }
    });
    effect(() => {
      const step = this.step();
      const item = this.api.item();
      const stepInitialized = this.stepInitialized();
      if (!stepInitialized && this.viewInit() && step === -1 && item) {
        this.stepInitialized.set(true);
        console.log('Step is -1, adding first step');
        timer(0).subscribe(async () => {
          await this.addStep();
        });
      }
    });
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
  }

  async addStep() {
    const actualSteps = this.actualSteps();
    const lastStepId = actualSteps.length > 0 ? actualSteps[actualSteps.length - 1].id : -1;
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      if (step.id > lastStepId) {
        if (step.skip) {
          const skipProps = await step.skip();
          console.log('Step ID', step.id, 'skipped with props?', skipProps);
          if (skipProps !== null) {
            this.propsUpdate.update(s => Object.assign({}, s, skipProps));
            continue;
          }
        }
        console.log('Adding step', step.id, 'with instructions', step.instructions);
        this.actualSteps.update(s => [...s, step]);
        this.step.set(step.id);
        return;
      }
    }
    console.log('No more steps to add, setting step to 99');
    this.step.set(99); // No more steps to add, set to a final state
  }

  completeStep(update: StepUpdate) {
    this.messages.addMessage(new Message('human', update.message));
    this.propsUpdate.update(s => Object.assign({}, s, update.props));
    this.step.set(99);
    timer(2000).subscribe(async () => {
      await this.addStep();
    });
  }
}
