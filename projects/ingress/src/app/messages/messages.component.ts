import { Component, computed, effect, ElementRef, Input, signal, ViewChild, WritableSignal } from '@angular/core';
import { marked } from 'marked';
import { debounceTime, Subject, timer } from 'rxjs';
import { PlatformService } from '../../../platform.service';
import { LtrDirective } from '../ltr.directive';

export class Message {

  _text = signal<string>('');
  _ = computed(() => {
    return marked(this._text());
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
    LtrDirective
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.less'
})
export class MessagesComponent {

  messages = signal<Message[]>([]);
  @ViewChild('messagesEl') messagesEl!: ElementRef;
  @ViewChild('spacer') spacerEl!: ElementRef;
  scroller = new Subject<() => void>();

  spacerHeight = signal(0);

  _ = marked;

  constructor(private platform: PlatformService) {
    this.platform.browser(() => {
      effect(() => {
        const messages = this.messages();
        timer(1).subscribe(() => {
          const messagesEl: HTMLElement = this.messagesEl.nativeElement;
          if (messagesEl) {
            const elements = messagesEl.querySelectorAll('.message');
            if (elements.length > 0) {
              const element = elements[messages.length - 1];
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
              } else {
                this.scroller.next(() => {
                  console.log('scrolling spacer', element, element.classList);
                  this.spacerEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });                
              }
            }
          }
        });
      });
    });
    this.scroller.pipe(
      debounceTime(100),
    ).subscribe((fn) => {
      fn();
    });
  }

  clear() {
    this.messages.update(() => []);
    this.messagesEl.nativeElement.scrollTop = 0;
  }

  addMessage(message: Message) {
    this.messages.update((messages) => [...messages, message]);
    console.log('addMessage', message);
  }
}
