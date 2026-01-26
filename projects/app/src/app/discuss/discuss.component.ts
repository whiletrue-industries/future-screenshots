import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../state.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService, DiscussResult } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { Message, MessagesComponent } from '../messages/messages.component';
import { from, fromEvent, switchMap, take } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LtrDirective } from '../ltr.directive';
import { CompleteEvaluationComponent } from "../complete-evaluation/complete-evaluation.component";

@Component({
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MessagesComponent,
    LtrDirective,
    CompleteEvaluationComponent
],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.less'
})
export class DiscussComponent implements AfterViewInit {

  messages: WritableSignal<Message[]>;
  inputMessage = signal<string>('');
  reply = signal<string>('');
  item_id = signal<string>('');
  item_key = signal<string>('');
  item = signal<any>({});
  hasEvaluation = computed(() => {
    const current = this.item();
    const plausibility = current?.plausibility;
    const favorable = current?.favorable_future;
    return typeof plausibility === 'number' && favorable !== undefined && favorable !== null && favorable !== '';
  });
  needsEvaluation = computed(() => !this.hasEvaluation());
  prefer = computed(() => {
    const ff = this.item()?.favorable_future || '';
    return ff.indexOf('prefer') >= 0 || (ff.indexOf('prevent') >= 0 && ff.indexOf('mostly') >= 0);
  });

  prevent = computed(() => {
    const ff = this.item()?.favorable_future || '';
    return ff.indexOf('prevent') >= 0 || (ff.indexOf('prefer') >= 0 && ff.indexOf('mostly') >= 0);
  });

  preferred = computed(() => {
    const ff = this.item()?.favorable_future || '';
    return ff.indexOf('prefer') >= 0;
  });

  rotationClass = computed(() => {
    if (!this.hasEvaluation()) {
      return 'tilt-0';
    }

    const plausibility = this.item()?.plausibility ?? 0;
    const rawTilt = ((100 - plausibility) / 100) * 32;
    const snappedTilt = Math.min(32, Math.max(0, Math.round(rawTilt / 8) * 8));

    if (snappedTilt === 0) {
      return 'tilt-0';
    }

    const prefix = this.preferred() ? 'tilt-neg' : 'tilt-pos';
    return `${prefix}-${snappedTilt}`;
  });

  imageUrl = computed<SafeUrl>(() => {
    return this.sanitizer.bypassSecurityTrustUrl(this.item().screenshot_url);
  });

  // State
  thinking = signal<boolean>(true);
  inputDisabled = signal<boolean>(true);
  imageLoaded = signal<boolean>(false);
  hasText = signal<boolean>(false);
  messagesComponentReady = signal<boolean>(false);
  showChat = computed(() => this.imageLoaded() || this.hasText() || this.thinking());
  imageExpanded = signal<boolean>(false);
  imageCollapsed = computed(() => (this.hasText() || this.completed()) && !this.imageExpanded());
  receivedDone = signal<boolean>(false);
  completed = signal<boolean>(false);
  completionThinking = computed(() => {
    const messagesThinking = this.messagesComponent ? this.messagesComponent.thinking() : false;
    return messagesThinking || this.thinking();
  });
  typingComplete = computed(() => {
    // Force re-evaluation by reading messagesComponentReady
    if (!this.messagesComponentReady()) {
      return false;
    }
    const result = this.messagesComponent ? this.messagesComponent.allTypingComplete() : false;
    console.log('[TYPING-COMPUTED] typingComplete evaluated:', result);
    return result;
  });
  inputVisible = computed(() => this.showChat() && (!this.completed() || !this.typingComplete()));
  showCompletionButtons = computed(() => this.completed() && !this.completionThinking() && this.typingComplete());
  failed = signal<boolean>(false);

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;
  @ViewChild('image') imageEl!: ElementRef<HTMLImageElement>;

  constructor(public state: StateService, private router: Router, private api: ApiService, private route: ActivatedRoute,
      private platform: PlatformService, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.api.updateFromRoute(this.route.snapshot);
    this.item_id.set(this.route.snapshot.queryParams['item-id']);
    effect(() => {
      if (this.completed()) {
        this.refreshItem();
      }
    });
    
    // Watch for true completion: done status received + no thinking + typing complete
    effect(() => {
      const receivedDone = this.receivedDone();
      const thinking = this.thinking();
      const messagesThinking = this.messagesComponent?.thinking();
      const typingComplete = this.typingComplete(); // This line ensures effect re-runs when typing completes
      
      console.log('[COMPLETION CHECK]', {
        receivedDone,
        thinking,
        messagesThinking,
        typingComplete,
        completed: this.completed()
      });
      
      // All conditions must be true, and we must not already be completed
      if (receivedDone && !thinking && !messagesThinking && typingComplete && !this.completed()) {
        console.log('[COMPLETION] Setting completed to true');
        this.completed.set(true);
      }
    });
    // Debug button visibility
    effect(() => {
      const show = this.showCompletionButtons();
      console.log('[BUTTONS] showCompletionButtons:', show, {
        completed: this.completed(),
        completionThinking: this.completionThinking(),
        typingComplete: this.typingComplete()
      });
    });
  }

  ngAfterViewInit(): void {
    this.messages = this.messagesComponent.messages;
    
    // Signal that messagesComponent is ready, which will trigger typingComplete to re-evaluate
    this.messagesComponentReady.set(true);
    
    const item_id = this.item_id();
    if (item_id) {
      this.item_key.set(this.route.snapshot.queryParams['key']);
      const item_key = this.item_key();
      this.api.fetchItem(item_id, item_key).subscribe((item: any) => {
        if (item && this.platform.browser()) {
          this.submitMessage();
          fromEvent(this.imageEl.nativeElement, 'load').pipe(take(1)).subscribe(() => {
            this.imageLoaded.set(true);
          });
          this.item.set(item);
        }
      });
    } else {
      this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
    }
  }

  refreshItem() {
    this.api.fetchItem(this.item_id(), this.item_key()).subscribe((item: any) => {
      if (item) {
        this.item.set(item);
      }
    });
  }

  toggleImage() {
    this.imageExpanded.update((expanded) => !expanded);
  }

  addMessage(kind: 'ai' | 'human', text: string) {
    const message = new Message(kind, text);
    this.messagesComponent.addMessage(message);
  }

  submitMessage() {
    this.inputDisabled.set(true);
    this.thinking.set(true);
    this.messagesComponent.thinking.set(true);
    console.log('thinking...');
    const message = this.inputMessage();
    if (message) {
      this.addMessage('human', message);
    }
    this.inputMessage.set('');
    this.api.sendMessage(message || 'initial').subscribe((ret: any) => {
      // console.log('MESSAGE', ret);
      if (ret.kind === 'message') {
        this.hasText.set(true);
        const index = ret.idx;
        const text = ret.content;
        const kind = ret.role === 'assistant' ? 'ai' : 'human';
        
        // Check if we need to update an existing message or add a new one
        const currentMessages = this.messages();
        if (currentMessages.length > index) {
          // Update existing message
          this.messages.update(msgs => {
            const _msgs = msgs.slice();
            _msgs[index].setText(text);
            _msgs[index].kind = kind;
            return _msgs;
          });
        } else {
          // Add new message through the queue system
          this.reply.set('');
          this.addMessage(kind, text);
        }
      } else if (ret.kind === 'status' && ret.status === 'done') {
        // Mark that we received done status
        // An effect will set completed when all conditions are truly met
        this.receivedDone.set(true);
      } else if (ret.kind === 'status' && ret.status === 'failed') {
        this.failed.set(true);
      } else if (ret.kind === 'text') {
        this.hasText.set(true);
        this.reply.update(value => {
          value += ret.value;
          if (value.slice(0,10).indexOf('DONE') >= 0) {
            this.completed.set(true);
            return '';
          }
          this.messages.update(msgs => msgs.slice());
          return value;
        });
        console.log('thinking done...');
        this.thinking.set(false);
        this.messagesComponent.thinking.set(false);
      } else if (ret.kind === 'status' && ret.status && ret.status !== 'done' && ret.status !== 'failed') {
        this.thinking.set(false);
        this.messagesComponent.thinking.set(false);
        this.failed.set(false);
        this.inputDisabled.set(false);
        if (this.reply()) {
          this.addMessage('ai', this.reply());
          this.reply.set('');  
        }
      }
    });
  }
}
