import { AfterViewInit, Component, computed, effect, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../state.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService, DiscussResult } from '../../api.service';
import { PlatformService } from '../../platform.service';
import { Message, MessagesComponent } from '../messages/messages.component';
import { from, fromEvent, Subscription, switchMap, take } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LtrDirective } from '../ltr.directive';
import { CompleteEvaluationComponent } from "../complete-evaluation/complete-evaluation.component";

@Component({
  standalone: true,
  imports: [
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
  imageUrl = computed<SafeUrl>(() => {
    return this.sanitizer.bypassSecurityTrustUrl(this.item().screenshot_url);
  });

  // State
  thinking = signal<boolean>(true);
  inputDisabled = signal<boolean>(true);
  imageLoaded = signal<boolean>(false);
  hasText = signal<boolean>(false);
  typingComplete = signal<boolean>(false);
  visible = computed(() => {
    return this.hasText() && this.imageLoaded();
  });
  completed = signal<boolean>(false);
  inputVisible = computed(() => {
    return this.visible() && !this.completed();
  });
  failed = signal<boolean>(false);

  private messageSubscription?: Subscription;
  private isSubmitting = false;

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
    // Watch for typing completion
    effect(() => {
      if (this.messagesComponent?.allTypingComplete()) {
        this.typingComplete.set(true);
      }
    });
  }

  ngAfterViewInit(): void {
    this.messages = this.messagesComponent.messages;
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

  addMessage(kind: 'ai' | 'human', text: string) {
    const message = new Message(kind, text);
    this.messagesComponent.addMessage(message);
  }

  submitMessage() {
    console.log('[DISCUSS] submitMessage() called, stack trace:');
    console.trace();
    
    // Prevent double submission with processing flag
    if (this.isSubmitting) {
      console.log('[DISCUSS] Ignoring submit - already submitting');
      return;
    }

    // Don't submit if input is disabled (unless it's the first auto-submit)
    const message = this.inputMessage();
    if (this.inputDisabled() && message === '') {
      console.log('[DISCUSS] Ignoring submit - input disabled and message empty');
      return;
    }

    this.isSubmitting = true;
    console.log('[DISCUSS] Input message value:', message ? `"${message}"` : '(empty)');
    console.log('[DISCUSS] Input message length:', message?.length || 0);
    console.log('[DISCUSS] Will send to server:', message || 'initial');

    // Unsubscribe from any previous message stream
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageSubscription = undefined;
    }

    this.inputDisabled.set(true);
    this.thinking.set(true);
    this.messagesComponent.thinking.set(true);
    console.log('thinking...');
    if (message) {
      this.addMessage('human', message);
    }
    this.inputMessage.set('');
    this.messageSubscription = this.api.sendMessage(message || 'initial').subscribe((ret: any) => {
      // console.log('MESSAGE', ret);
      if (ret.kind === 'message') {
        this.hasText.set(true);
        const index = ret.idx;
        const text = ret.content;
        const kind = ret.role === 'assistant' ? 'ai' : 'human';
        this.messages.update(msgs => {
          const _msgs = msgs.slice();
          if (_msgs.length > index) {
            _msgs[index].setText(text);
            _msgs[index].kind = kind;
          }
          else {
            this.reply.set('');
            _msgs.push(new Message(kind, text ));
          }
          return _msgs;
        });
      } else if (ret.kind === 'status' && ret.status === 'done') {
        this.completed.set(true);
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
      } else if (ret.kind === 'status' && ret.status === 'completed') {
        // Re-enable input when assistant completes its turn
        this.thinking.set(false);
        this.messagesComponent.thinking.set(false);
        this.failed.set(false);
        this.inputDisabled.set(false);
        this.isSubmitting = false;
        if (this.reply()) {
          this.addMessage('ai', this.reply());
          this.reply.set('');  
        }
      }
    }, () => {
      // Error handler
      this.isSubmitting = false;
    }, () => {
      // Complete handler
      this.isSubmitting = false;
    });
  }
}
