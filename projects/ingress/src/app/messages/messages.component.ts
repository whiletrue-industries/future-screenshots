import { Component, effect, ElementRef, Input, signal, ViewChild, WritableSignal } from '@angular/core';
import { marked } from 'marked';
import { timer } from 'rxjs';
import { PlatformService } from '../../../platform.service';

export type Message = {
  kind: 'human' | 'ai';
  text: string;
  part?: boolean;
};

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.less'
})
export class MessagesComponent {

  @Input() messages: WritableSignal<Message[]> = signal<Message[]>([]);
  @ViewChild('messagesEl') messagesEl!: ElementRef;
  @ViewChild('spacer') spacerEl!: ElementRef;

  spacerHeight = signal(0);

  _ = marked;

  constructor(private platform: PlatformService) {
    this.platform.browser(() => {
      effect(() => {
        const messages = this.messages();
        const message = messages[messages.length - 1];
        timer(1).subscribe(() => {
          const messagesEl: HTMLElement = this.messagesEl.nativeElement;
          if (messagesEl) {
            const elements = messagesEl.querySelectorAll('.message');
            if (elements.length > 0) {
              const element = elements[elements.length - 1];
              const boundingRect = element.getBoundingClientRect();
              let spacerSize = messagesEl.offsetHeight - boundingRect.height - 48;
              if (spacerSize < 1) {
                spacerSize = 1;
              }
              this.spacerHeight.set(spacerSize);
              timer(50).subscribe(() => {
                if (message.kind === 'human') {
                  const boundingRect = element.getBoundingClientRect();
                  console.log('scrolling', message);
                  const top = boundingRect.top;
                  console.log('top', top);
                  console.log('scrollTop', messagesEl.scrollTop);
                  this.messagesEl.nativeElement.scrollBy({top: top - 16, behavior: 'smooth'});
                } else {
                  this.spacerEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
            }
          }
        });
      });
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
