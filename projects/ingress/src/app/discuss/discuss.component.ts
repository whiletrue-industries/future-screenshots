import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, DiscussResult } from '../../../api.service';
import { PlatformService } from '../../../platform.service';
import { Message, MessagesComponent } from '../messages/messages.component';
import { fromEvent, take } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  imageUrl = signal<SafeUrl>('');
  imageLoaded = signal<boolean>(false);
  hasText = signal<boolean>(false);
  visible = computed(() => {
    return this.hasText() && this.imageLoaded();
  });
  expanded = signal<boolean>(false);
  small = computed(() => {
    return this.visible() && !this.expanded();
  });

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;
  @ViewChild('image') imageEl!: ElementRef<HTMLImageElement>;

  constructor(public state: StateService, private router: Router, private api: ApiService, private route: ActivatedRoute,
      private platform: PlatformService, private sanitizer: DomSanitizer) {
    this.api.updateFromRoute(this.route.snapshot);
    const item_id = this.route.snapshot.queryParams['item-id'];
    if (item_id) {
      const item_key = this.route.snapshot.queryParams['key'];
      this.api.fetchItem(item_id, item_key).subscribe((item: any) => {
        if (item && this.platform.browser()) {
          this.submitMessage();
          fromEvent(this.imageEl.nativeElement, 'load').pipe(take(1)).subscribe(() => {
            this.imageLoaded.set(true);
          });
          this.imageUrl.set(this.sanitizer.bypassSecurityTrustUrl(item.screenshot_url));
        }
      });
    } else {
      this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
    }
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
        this.hasText.set(true);
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
        this.hasText.set(true);
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
