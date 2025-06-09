import { Component, EventEmitter, Output, signal } from '@angular/core';
import { StepUpdate } from '../collect-properties/collect-properties.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collect-email',
  imports: [
    FormsModule
  ],
  templateUrl: './collect-properties-email.component.html',
  styleUrl: './collect-properties-email.component.less'
})
export class CollectEmailComponent {
  @Output() done = new EventEmitter<StepUpdate>();

  email = signal<string | null>(null);
  emailSubscribe = signal<boolean>(true);
  localStorage = typeof localStorage !== 'undefined' ? localStorage : null;

  submit() {
    const email = this.email();
    if (!email) {
      return;
    }
    this.localStorage?.setItem('mapfutures-email', email);
    this.localStorage?.setItem('mapfutures-email-subscribe', this.emailSubscribe() ? 'true' : 'false');
    this.done.emit({
      message: email,
      props: {
        _private_email: email,
        _private_email_subscribe: this.emailSubscribe(),
      }
    });
  }

  noThanks() {
    this.done.emit({
      message: $localize`No thanks`,
      props: {
        _private_refused_email: true
      }
    });
  }
}
