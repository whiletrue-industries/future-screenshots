import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, DiscussResult } from '../../../api.service';
import { PlatformService } from '../../../platform.service';
import { Message, MessagesComponent } from '../messages/messages.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MessagesComponent
  ],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.less'
})
export class DiscussComponent {

  messages = signal<Message[]>([]);
  inputMessage = signal<string>('');
  inputDisabled = signal<boolean>(true);
  thinking = signal<boolean>(true);
  reply = signal<string>('');

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;

  constructor(public state: StateService, private router: Router, private api: ApiService, private route: ActivatedRoute, private platform: PlatformService) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.route.params.subscribe(params => {
      const item_id = params['item-id'];
      if (item_id) {
        const item_key = this.route.snapshot.queryParams['key'];
        this.api.fetchItem(item_id, item_key).subscribe((item: any) => {
          if (item && this.platform.browser()) {
            this.submitMessage();
          }
        });
      } else {
        const currentImage = this.state.currentImage();
        if (!currentImage) {
          this.router.navigate(['/scan']);
        } else {
          this.api.startDiscussion(currentImage).subscribe((ret: any) => {
            const item_key = ret.item_key;
            const item_id = ret.item_id;
            const automatic = ret.automatic;
            if (automatic) {
              this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
            } else {
              this.router.navigate(['/discuss', item_id], { queryParams: {'key': item_key}, queryParamsHandling: 'merge' });
            }
          });
        }
      }
    });
  }

  addMessage(kind: 'ai' | 'human', text: string) {
    this.messagesComponent.addMessage({ kind, text });
  }

  submitMessage() {
    this.inputDisabled.set(true);
    this.thinking.set(true);
    const message = this.inputMessage();
    if (message) {
      this.addMessage('human', message);
    }
    this.inputMessage.set('');
    this.api.sendMessage(message || 'initial').subscribe((ret: any) => {
      // console.log('MESSAGE', ret);
      if (ret.kind === 'message') {
        const index = ret.idx;
        const text = ret.content;
        const kind = ret.role === 'assistant' ? 'ai' : 'human';
        this.messages.update(msgs => {
          const _msgs = msgs.slice();
          if (_msgs.length > index) {
            _msgs[index].text = text;
            _msgs[index].kind = kind;
          }
          else {
            this.reply.set('');
            _msgs.push({ kind, text });
          }
          return _msgs;
        });
      } else if (ret.kind === 'text') {
        this.reply.update(value => {
          value += ret.value;
          if (value.slice(0,10).indexOf('DONE') >= 0) {
            this.router.navigate(['/complete'], { queryParamsHandling: 'preserve' });
            return '';
          }
          this.messages.update(msgs => msgs.slice());
          return value;
        });
        this.thinking.set(false);
      } else if (ret.kind === 'status') {
        this.thinking.set(false);
        this.inputDisabled.set(false);
        if (this.reply()) {
          this.addMessage('ai', this.reply());
          this.reply.set('');  
        }
      }
    });
  }
}
