import { AfterViewInit, Component, computed, effect, OnDestroy, signal, ViewChild } from '@angular/core';
import { Message, MessagesComponent } from "../messages/messages.component";
import { ApiService } from '../../api.service';
import { CollectPropertiesFavorableComponent } from "../collect-properties-favorable/collect-properties-favorable.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CollectPropertiesPotentialComponent } from "../collect-properties-potential/collect-properties-potential.component";
import { timer } from 'rxjs';
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
export class CollectPropertiesComponent implements AfterViewInit, OnDestroy {
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
          // In workshop mode, re-use the email from a previous upload so it gets
          // queued for this new upload via step 10, and step 12 fires to halt the flow.
          if (this.api.isWorkshop() && email) {
            this.emailFromStorage = true;
            return { _private_email: email };
          }
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
        // Check if item has an author_id field, if not add it
        const currentItem = this.api.item();
        if (currentItem && !currentItem.author_id) {
          const authorId = this.getOrGenerateAuthorId();
          this.propsUpdate.update(s => Object.assign({}, s, { author_id: authorId }));
        }

        const queuedUpdate = this.propsUpdate();
        console.log('CONSIDERING IF UPDATE IS NEEDED', queuedUpdate);
        if (Object.keys(queuedUpdate).length > 0) {
          if (this.api.isWorkshop() && this.workshopFlowId) {
            this.api.queueWorkshopFlowMetadata(this.workshopFlowId, queuedUpdate);
            this.pendingPropsUpdate = Object.assign({}, this.pendingPropsUpdate, queuedUpdate);
            this.propsUpdate.set({});
            return {};
          }
          this.pendingPropsUpdate = Object.assign({}, this.pendingPropsUpdate, queuedUpdate);
          this.flushPendingPropsUpdate();
          this.schedulePendingPropsRetry();
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
        const pendingEmail = this.pendingPropsUpdate?._private_email;
        if (this.emailRequested && (pendingEmail || (item && item._private_email))) {
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
        const pendingRefusal = this.pendingPropsUpdate?._private_refused_email;
        if (this.emailRequested && (pendingRefusal || (item && item._private_refused_email))) {
          return null;
        }
        return {};
      },
    },
    {
      id: 20,
      instructions: '',
      skip: () => {
        if (this.api.isWorkshop()) {
          return {};
        }
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
        if (this.api.isWorkshop()) {
          return {};  // direct-to-map is not part of the workshop flow
        }
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
  private workshopFlowId: string | null = null;
  private pendingPropsUpdate: any = {};
  private pendingUpdateRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly PENDING_UPDATE_RETRY_MS = 2000;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.api.updateFromRoute(this.route.snapshot);
    this.fragment.set(this.route.snapshot.fragment || null);
    this.workshopFlowId = this.route.snapshot.queryParamMap.get('flow_id');
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
      const canStartWithoutItem = this.api.isWorkshop() || this.api.isWorkshopFollowup();
      if (!stepInitialized && this.viewInit() && step === -1 && (item || canStartWithoutItem)) {
        this.stepInitialized.set(true);
        console.log('Step is -1, adding first step');
        timer(0).subscribe(async () => {
          await this.addStep();
        });
      }
    });

    effect(() => {
      this.api.itemId();
      this.api.itemKey();
      this.api.currentlyUploadingImage();
      this.api.uploadStatus();
      this.flushPendingPropsUpdate();
    });
  }

  ngAfterViewInit() {
    this.viewInit.set(true);
  }

  ngOnDestroy(): void {
    this.clearPendingPropsRetry();
  }

  private schedulePendingPropsRetry(): void {
    if (this.pendingUpdateRetryTimer !== null) {
      return;
    }

    this.pendingUpdateRetryTimer = setTimeout(() => {
      this.pendingUpdateRetryTimer = null;
      this.flushPendingPropsUpdate();

      if (Object.keys(this.pendingPropsUpdate).length > 0) {
        this.schedulePendingPropsRetry();
      }
    }, this.PENDING_UPDATE_RETRY_MS);
  }

  private clearPendingPropsRetry(): void {
    if (this.pendingUpdateRetryTimer !== null) {
      clearTimeout(this.pendingUpdateRetryTimer);
      this.pendingUpdateRetryTimer = null;
    }
  }

  private getOrGenerateAuthorId(): string {
    let authorId = this.localStorage?.getItem('future_screenshots_author_id');
    if (!authorId) {
      // Generate a random author ID
      authorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.localStorage?.setItem('future_screenshots_author_id', authorId);
    }
    return authorId;
  }

  private flushPendingPropsUpdate(): void {
    const update = this.pendingPropsUpdate;
    if (!update || Object.keys(update).length === 0) {
      return;
    }

    const item_id = this.api.itemId();
    const item_key = this.api.itemKey();

    if (!item_id || !item_key || this.api.currentlyUploadingImage()) {
      this.schedulePendingPropsRetry();
      return;
    }

    this.pendingPropsUpdate = {};
    this.clearPendingPropsRetry();
    this.api.item.update((item: any) => Object.assign({}, item, update));
    this.messages?.thinking.set(true);
    this.api.updateItem(update, item_id, item_key).subscribe({
      next: () => {
        this.messages?.thinking.set(false);
        this.clearPendingPropsRetry();
      },
      error: () => {
        this.messages?.thinking.set(false);
        this.pendingPropsUpdate = Object.assign({}, update, this.pendingPropsUpdate);
        this.schedulePendingPropsRetry();
      }
    });
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
