import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { marked } from 'marked';
import { timer } from 'rxjs';

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

  @ViewChild('messagesEl') messagesEl!: ElementRef;

  messages = signal<Message[]>([]);  

  _ = marked;

  addMessage(message: Message) {
    this.messages.update((messages) => [...messages, message]);
    console.log('addMessage', message);
    if (message.kind === 'human') {
      console.log('scrolling', message);
      const messagesEl = this.messagesEl.nativeElement;
      if (messagesEl) {
        timer(100).subscribe(() => {
          const elements = messagesEl.querySelectorAll('.message');
          if (elements.length > 0) {
            const element = elements[elements.length - 1];
            const top = element.getBoundingClientRect().top;
            console.log('top', top);
            console.log('scrollTop', messagesEl.scrollTop);
            this.messagesEl.nativeElement.scrollBy({top: top - 16, behavior: 'smooth'});
          }
        });  
      }
    }
  }
}
