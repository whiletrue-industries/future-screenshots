import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
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

  constructor(public state: StateService, private router: Router, private api: ApiService) { 
    if (!this.state.currentImage()) {
      this.router.navigate(['/scan']);
    } else {
      const currentImage = this.state.currentImage();
      if (currentImage) {
        this.api.startDiscussion(currentImage).subscribe((ret: DiscussResult) => {
          if (ret.complete) {
            this.router.navigate(['/complete']);
          } else {
            this.addMessage('ai', ret.message);
            this.thinking.set(false);
            this.inputDisabled.set(false);
          }
        });
      } else {
        this.router.navigate(['/scan']);
      }
    }
  }

  addMessage(dir: string, message: string) {
    this.messages.update(msgs => [...msgs, { dir, message }]);
  }

  submitMessage() {
    this.inputDisabled.set(true);
    this.thinking.set(true);
    this.addMessage('user', this.inputMessage());
    this.api.sendMessage(this.inputMessage()).subscribe((ret: DiscussResult) => {
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
