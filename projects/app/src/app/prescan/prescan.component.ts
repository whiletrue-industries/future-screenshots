import { AfterViewInit, Component, computed, DestroyRef, effect, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Message, MessagesComponent } from "../messages/messages.component";
import { delay, filter, from, interval, map, Subject, switchMap, take, tap, timer } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { LtrDirective } from '../ltr.directive';
import { MainMenuComponent } from "../main-menu/main-menu.component";
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MessagesComponent,
    LtrDirective,
    MainMenuComponent,
    LanguageSelectorComponent
],
  templateUrl: './prescan.component.html',
  styleUrl: './prescan.component.less'
})
export class PrescanComponent implements AfterViewInit {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;
  
  initialInteraction: Message[] = [];
  answer: Message = new Message('human', $localize`Yes, Let’s scan!`);
  tellMore: Message = new Message('ai', $localize`Find our booth in the lobby in front of the entrance. There you'll find templates and guidance.`);
  secondInteraction: Message = new Message('ai', $localize`Great!

But first, please approve the collection, processing, and storage of your screenshot as described in the [Privacy Policy](/privacy-policy).

I’m also about to ask you for **access to the camera**, and then we can get going….`);

  inputAnswer = new Subject<string>();

  showMoreButton = signal(false);
  showScanButton = signal(false);
  showAgreeButton = signal(false);
  showWhatsappButton = signal(false);
  topMenuOpen = signal(true);
  mainMenuOpen = signal(false);
  uiInitialized = signal(false);
  newGroupName = signal('');
  private loadedCreatedGroupsForWorkspace = signal<string | null>(null);
  private groupCreatorId: string;

  private createdWsGroups = signal<Array<{ id: string; name: string; creatorId: string }>>([]);

  wsGroups = computed<any[]>(() => {
    const workspace = this.api.workspace();
    return workspace?.metadata?.ws_groups || workspace?.ws_groups || [];
  });

  strategicGroupChips = computed<any[]>(() => {
    const merged = new Map<string, any>();
    for (const group of this.wsGroups()) {
      if (!group?.id) continue;
      merged.set(group.id, group);
    }
    for (const group of this.createdWsGroups()) {
      if (!group?.id) continue;
      if (!merged.has(group.id)) {
        merged.set(group.id, { id: group.id, name: group.name, color: '#B969FF' });
      }
    }
    return Array.from(merged.values());
  });

  strategicNeedsGroup = computed(() => this.api.wsStrategic() && !this.api.wsGroupId());

  addMessage(message: Message) {
    message.setText(message.text.replace(/:EVENT_NAME:/g, this.api.workspace()?.event_name || $localize`the workshop`));
    this.messagesComponent.addMessage(message);
  }

  constructor(private route: ActivatedRoute, public api: ApiService, private platform: PlatformService, private router: Router, private ref: DestroyRef) {    
    this.api.updateFromRoute(this.route.snapshot);
    this.groupCreatorId = this.getOrCreateGroupCreatorId();
    effect(() => {
      const workspace = this.api.workspace();
      if (workspace && workspace.source && this.initialInteraction.length === 0 && this.uiInitialized()) {
        this.initialInteraction = [
          new Message('ai', $localize`Hi there…`),
          !this.api.workspace().whatsapp_group ?
            new Message('ai', $localize`Thanks for participating in **:EVENT_NAME:**!`) :
            new Message('ai', $localize`**First, join the chat group** we set up for :EVENT_NAME:.`),
          new Message('ai', $localize`I’m here to help you **scan** your future screenshot and add it to the map.`),
        ];
        this.interact();
      }
    });

    effect(() => {
      const groupId = this.api.wsGroupId();
      const groupName = this.api.wsGroupName();
      const groups = this.wsGroups();
      if (groupId && !groupName && groups.length > 0) {
        const selected = groups.find((g: any) => g.id === groupId);
        if (selected?.name) {
          this.api.wsGroupName.set(selected.name);
        }
      }
    });

    effect(() => {
      const workspaceId = this.api.workspaceId();
      if (!workspaceId || this.loadedCreatedGroupsForWorkspace() === workspaceId) {
        return;
      }
      this.loadedCreatedGroupsForWorkspace.set(workspaceId);
      this.createdWsGroups.set(this.getStoredCreatedGroups(workspaceId));
    });

    effect(() => {
      const workspaceId = this.api.workspaceId();
      if (!workspaceId) {
        return;
      }
      this.storeCreatedGroups(workspaceId, this.createdWsGroups());
    });
  }

  ngOnInit() {
    this.messagesComponent?.clear();
    this.showMoreButton.set(false);
    this.showScanButton.set(false);
    this.showAgreeButton.set(false);
  }

  ngAfterViewInit() {
    this.platform.browser(() => {
      this.uiInitialized.set(true);
      this.messagesComponent.scrollPosition.pipe(
        takeUntilDestroyed(this.ref),
        map((pos) => pos < 10),
      ).subscribe((value) => {
        this.topMenuOpen.set(value);
      });
    });
  }

  interact() {
    console.log('[Prescan] interact() called, adding messages to queue...');
    // Add all messages to queue - they'll be processed one by one
    for (let i = 0; i < this.initialInteraction.length; i++) {
      for (let j = 0; j < this.initialInteraction.length; j++) {
        this.initialInteraction[j].part = j !== i;
      }
      this.addMessage(this.initialInteraction[i]);
    }
    
    // Show buttons after a short delay
    timer(600).subscribe(() => {
      this.showWhatsappButton.set(this.api.isWorkshop() && this.api.workspace()?.whatsapp_group);
      this.showScanButton.set(true);
    });

    this.inputAnswer.pipe(
      tap((answer) => {
        if (answer === 'more') {
          this.addMessage(this.tellMore);
          this.showMoreButton.set(false);
        }
      }),
      filter((answer) => answer === 'yes'),
      filter(() => !this.strategicNeedsGroup()),
      tap(() => {
        this.addMessage(this.answer);
        this.showScanButton.set(false);
        this.showMoreButton.set(false);
      }),
      delay(300),
      tap(() => {
        this.addMessage(this.secondInteraction);
        this.showAgreeButton.set(true);
      }),
    ).subscribe(() => {
      this.showAgreeButton.set(false);
      this.router.navigate(['scan'], { queryParamsHandling: 'preserve'});
      console.log('DONE');
    });
  }

  selectStrategicGroup(groupId: string, groupName: string) {
    this.applyStrategicGroup(groupId, groupName);
  }

  createStrategicGroup() {
    const name = this.newGroupName().trim();
    if (!name) {
      return;
    }
    const normalized = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 36);
    const suffix = Math.random().toString(36).slice(2, 8);
    const groupId = `custom-${normalized || 'group'}-${suffix}`;
    this.createdWsGroups.update((groups) => [...groups, { id: groupId, name, creatorId: this.groupCreatorId }]);
    this.applyStrategicGroup(groupId, name);
    this.newGroupName.set('');
  }

  isRemovableCreatedGroup(groupId: string): boolean {
    return this.createdWsGroups().some(g => g.id === groupId && g.creatorId === this.groupCreatorId);
  }

  removeStrategicGroup(groupId: string, event: Event) {
    event.stopPropagation();
    if (!this.isRemovableCreatedGroup(groupId)) {
      return;
    }

    const groupName = this.strategicGroupChips().find(g => g.id === groupId)?.name || null;
    const selectedGroupName = this.api.wsGroupName();
    this.createdWsGroups.update((groups) => groups.filter(g => g.id !== groupId));

    if (this.api.wsGroupId() !== groupId) {
      return;
    }

    this.api.wsGroupId.set(null);
    this.api.wsGroupName.set(null);

    const params: any = { ...this.route.snapshot.queryParams };
    delete params['ws_group'];
    if (!groupName || selectedGroupName === groupName) {
      delete params['ws_group_name'];
    }
    this.router.navigate([], { queryParams: params, replaceUrl: true });
  }

  private applyStrategicGroup(groupId: string, groupName: string) {
    this.api.wsGroupId.set(groupId);
    this.api.wsGroupName.set(groupName);
    const params = {
      ...this.route.snapshot.queryParams,
      ws_group: groupId,
      ws_group_name: groupName,
    };
    this.router.navigate([], { queryParams: params, replaceUrl: true });
  }

  private getCreatedGroupsStorageKey(workspaceId: string): string {
    return `ws_created_groups_${workspaceId}`;
  }

  private getStoredCreatedGroups(workspaceId: string): Array<{ id: string; name: string; creatorId: string }> {
    if (!this.platform.browser()) {
      return [];
    }
    try {
      const raw = localStorage.getItem(this.getCreatedGroupsStorageKey(workspaceId));
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed
        .filter((g: any) => typeof g?.id === 'string' && typeof g?.name === 'string')
        .map((g: any) => ({
          id: g.id,
          name: g.name,
          creatorId: typeof g?.creatorId === 'string' ? g.creatorId : '',
        }));
    } catch {
      return [];
    }
  }

  private storeCreatedGroups(workspaceId: string, groups: Array<{ id: string; name: string; creatorId: string }>) {
    if (!this.platform.browser()) {
      return;
    }
    try {
      localStorage.setItem(this.getCreatedGroupsStorageKey(workspaceId), JSON.stringify(groups));
    } catch {
      // Ignore storage write failures.
    }
  }

  private getOrCreateGroupCreatorId(): string {
    if (!this.platform.browser()) {
      return 'server';
    }
    const key = 'ws_group_creator_id';
    const existing = localStorage.getItem(key);
    if (existing) {
      return existing;
    }
    const created = this.generateRandomId();
    localStorage.setItem(key, created);
    return created;
  }

  private generateRandomId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      try {
        return crypto.randomUUID();
      } catch {
        // fallback below
      }
    }
    return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  }
}
