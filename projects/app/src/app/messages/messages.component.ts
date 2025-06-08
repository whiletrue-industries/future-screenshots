import { AfterViewInit, Component, computed, DestroyRef, effect, ElementRef, Input, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { marked } from 'marked';
import { debounceTime, fromEvent, Subject, throttleTime, timer } from 'rxjs';
import { PlatformService } from '../../platform.service';
import { LtrDirective } from '../ltr.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { default as lottie, AnimationItem } from 'lottie-web';
import { DiscussComponent } from "../discuss/discuss.component";

export class Message {

  _text = signal<string>('');
  _ = computed(() => {
    let text = this._text();
    return marked(text);
  });
  
  constructor(public kind: 'human' | 'ai', public text: string, public part?: boolean) {
    this._text.set(text);
  }

  setText(text: string) {
    this._text.set(text);
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
  @Input() thinking = false;
  @Input() scrollOnAI = true;
  @Input() paddingTop = 16;

  messages = signal<Message[]>([]);
  @ViewChild('messagesEl') messagesEl!: ElementRef;
  @ViewChild('spacer') spacerEl!: ElementRef;
  scroller = new Subject<() => void>();

  spacerHeight = signal(0);
  scrollPosition = new Subject<number>();

  loadingAnim: AnimationItem;
  @ViewChild('thinkingEl') thinkingEl!: ElementRef<HTMLDivElement>;

  _ = marked;

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
      debounceTime(100),
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
  }

  clear() {
    this.messages.update(() => []);
    this.messagesEl.nativeElement.scrollTop = 0;
  }

  addMessage(message: Message) {
    this.messages.update((messages) => [...messages, message]);
    // console.log('addMessage', message);
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
        let spacerSize = messagesEl.offsetHeight - boundingRect.height - 48;
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
            this.messagesEl.nativeElement.scrollBy({top: top - 16, behavior: 'smooth'});
          });
        } else if (this.scrollOnAI) {
          this.scroller.next(() => {
            console.log('scrolling spacer', element, element.classList);
            this.spacerEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });                
        }
      }
    }
  }
}
