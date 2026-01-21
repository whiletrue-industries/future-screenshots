import { AfterViewInit, Component, computed, DestroyRef, effect, ElementRef, Input, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { marked } from 'marked';
import { debounceTime, fromEvent, Subject, throttleTime, timer } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { LtrDirective } from '../ltr.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { default as lottie, AnimationItem } from 'lottie-web';
import { DiscussComponent } from "../discuss/discuss.component";

export class Message {

  fullText: string;
  _text = signal<string>('');
  _ = computed(() => {
    let text = this._text();
    return marked(text);
  });
  
  constructor(public kind: 'human' | 'ai', public text: string, public part?: boolean) {
    this.fullText = text;
    this._text.set(text);
  }

  setText(text: string) {
    this.fullText = text;
    this._text.set(text);
  }

  resetDisplayed() {
    this._text.set('');
  }
};

@Component({
  selector: 'app-messages',
  imports: [
    LtrDirective,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.less'
})
export class MessagesComponent implements AfterViewInit, OnDestroy {

  @Input() bg = false;
  @Input() scrollOnAI = true;
  @Input() paddingTop = 16;

  messages = signal<Message[]>([]);
  thinking = signal(false);
  allTypingComplete = signal(false);
  @ViewChild('messagesEl') messagesEl!: ElementRef;
  @ViewChild('spacer') spacerEl!: ElementRef;
  scroller = new Subject<() => void>();

  spacerHeight = signal(0);
  scrollPosition = new Subject<number>();

  loadingAnim: AnimationItem;
  @ViewChild('thinkingEl') thinkingEl!: ElementRef<HTMLDivElement>;

  _ = marked;

  private typingIntervals = new Set<number>();
  private messageQueue: Message[] = [];
  private isProcessingQueue = false;

  private scrollIfOutOfView() {
    const container = this.messagesEl?.nativeElement as HTMLElement | undefined;
    if (!container) {
      return;
    }
    const lastMessage = container.querySelector('.message:last-of-type') as HTMLElement | null;
    if (!lastMessage) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const messageRect = lastMessage.getBoundingClientRect();
    const outOfView = messageRect.bottom > containerRect.bottom || messageRect.top < containerRect.top;

    if (outOfView) {
      this.scroller.next(() => {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  }

  constructor(private platform: PlatformService, private ref: DestroyRef) {
    this.platform.browser(() => {
      effect(() => {
        const messages = this.messages();
        timer(1).subscribe(() => {
          this.setScrollParams(messages);
        });
      });
      fromEvent(window, 'resize').pipe(
        takeUntilDestroyed(),
        debounceTime(100),
      ).subscribe(() => {
        const messages = this.messages();
        this.setScrollParams(messages);
      });
    });
    this.scroller.pipe(
      debounceTime(30),
    ).subscribe((fn) => {
      fn();
    });
  }

  ngAfterViewInit(): void {
    this.platform.browser(() => {
      this.loadingAnim = lottie.loadAnimation({
        container: this.thinkingEl.nativeElement, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/thinking.json' // the path to the animation json
      });
      fromEvent(this.messagesEl.nativeElement, 'scroll').pipe(
        takeUntilDestroyed(this.ref),
        throttleTime(100, undefined, { leading: true, trailing: true }),
      ).subscribe(() => {
        const messagesEl: HTMLElement = this.messagesEl.nativeElement;
        this.scrollPosition.next(messagesEl.scrollTop);
      });
    });
  }

  ngOnDestroy() {
    this.loadingAnim?.destroy();
    this.typingIntervals.forEach(handle => clearInterval(handle));
    this.typingIntervals.clear();
  }

  clear() {
    this.messages.update(() => []);
    this.messagesEl.nativeElement.scrollTop = 0;
  }

  addMessage(message: Message) {
    console.log('[Messages] addMessage called - queuing:', message.kind, message.fullText.substring(0, 30));
    // Reset allTypingComplete when new messages are added
    this.allTypingComplete.set(false);
    // Add to queue but don't add to DOM yet
    this.messageQueue.push(message);
    // Start processing if not already processing
    if (!this.isProcessingQueue) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.messageQueue.length === 0) {
      this.isProcessingQueue = false;
      console.log('[Messages] Queue empty, stopping processor');
      // Set allTypingComplete when queue is empty
      this.allTypingComplete.set(true);
      return;
    }

    this.isProcessingQueue = true;
    const message = this.messageQueue.shift()!;
    
    console.log('[Messages] Processing message:', message.kind, 'at', Date.now());
    
    // Add message to DOM
    this.messages.update((messages) => [...messages, message]);
    
    if (!this.platform.browser()) {
      message.setText(message.fullText);
      this.processQueue(); // Process next
      return;
    }
    
    // Type the message
    await this.startTypewriter(message);
    
    console.log('[Messages] Finished typing, processing next message');
    
    // Process next message
    this.processQueue();
  }

  private startTypewriter(message: Message): Promise<void> {
    const full = message.fullText || '';
    if (!full.length) {
      message.setText(full);
      return Promise.resolve();
    }

    message.resetDisplayed();
    const startTime = Date.now();
    console.log('[Typewriter] Started for:', message.kind, 'length:', full.length, 'time:', startTime);

    // Per-character interval tuned to be faster overall; long texts cap at ~1.2s
    // Moderate typing speed; short messages quick, longer ones still readable and under ~1.2s
    const perChar = Math.max(10, Math.min(22, 220 / Math.max(full.length, 1)));
    console.log('[Typewriter] perChar interval:', perChar, 'ms');
    let idx = 0;

    return new Promise<void>((resolve) => {
      const handle = window.setInterval(() => {
        idx += 1;
        if (idx >= full.length) {
          message.setText(full);
          clearInterval(handle);
          this.typingIntervals.delete(handle);
          const endTime = Date.now();
          console.log('[Typewriter] Completed for:', message.kind, 'duration:', endTime - startTime, 'ms');
          // Notify that typing is complete
          this.onTypingComplete();
          resolve();
          return;
        } else {
          message.setText(full.slice(0, idx));
          this.scrollIfOutOfView();
        }
      }, perChar);
      this.typingIntervals.add(handle);
    });
  }

  private onTypingComplete() {
    // This can be overridden or listened to by parent components
    // For now, we'll use a simple approach by letting the parent check message queue
  }

  setScrollParams(messages: Message[]) {
    const messagesEl: HTMLElement = this.messagesEl.nativeElement;
    if (messagesEl) {
      const elements = messagesEl.querySelectorAll('.message');
      if (elements.length > 0) {
        const element = elements[messages.length - 1];
        if (!element) {
          return;
        }
        const boundingRect = element.getBoundingClientRect();
        let spacerSize = messagesEl.offsetHeight - boundingRect.height - 8;
        if (spacerSize < 1) {
          spacerSize = 1;
        }
        this.spacerHeight.set(spacerSize);
        // console.log('scrollin?', element.textContent, element.classList);
        if (element.classList.contains('human')) {
          const boundingRect = element.getBoundingClientRect();
          const top = boundingRect.top;
          // console.log('top', top);
          // console.log('scrollTop', messagesEl.scrollTop);
          this.scroller.next(() => {
            console.log('scrolling last message', element, element.classList);
            this.messagesEl.nativeElement.scrollBy({top: top - 4, behavior: 'smooth'});
          });
        } else if (this.scrollOnAI) {
          this.scroller.next(() => {
            console.log('scrolling spacer', element, element.classList);
            this.spacerEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
          });                
        }
      }
    }
  }
}
