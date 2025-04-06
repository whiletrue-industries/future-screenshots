import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, DiscussResult } from '../api.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.less'
})
export class DiscussComponent {

  messages = signal<{dir: string, message: string}[]>([]);
  inputMessage = signal<string>('');
  inputDisabled = signal<boolean>(true);
  thinking = signal<boolean>(true);

  constructor(public state: StateService, private router: Router, private api: ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      const item_id = params['item-id'];
      if (item_id) {
        const item_key = this.route.snapshot.queryParams['key'];
        this.api.fetchItem(item_id, item_key).subscribe((item: any) => {
          if (item) {
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
            this.router.navigate(['/discuss', item_id], { queryParams: {'key': item_key} });
          });
        }
      }
    });
  }

  addMessage(dir: string, message: string) {
    this.messages.update(msgs => [...msgs, { dir, message }]);
  }

  submitMessage() {
    this.inputDisabled.set(true);
    this.thinking.set(true);
    const message = this.inputMessage();
    if (message) {
      this.addMessage('user', message);
    }
    this.api.sendMessage(message || 'initial').subscribe((ret: DiscussResult) => {
      if (ret.complete) {
        this.router.navigate(['/complete']);
      } else {
        this.addMessage('ai', ret.message);
        this.inputDisabled.set(false);
        this.inputMessage.set('');  
        this.thinking.set(false);
      }
    });
  }
}
