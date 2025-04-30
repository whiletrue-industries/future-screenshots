import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Message, MessagesComponent } from "../messages/messages.component";
import { delay, filter, from, interval, Subject, switchMap, take, tap, timer } from 'rxjs';
import { After } from 'v8';
import { PlatformService } from '../../../platform.service';
import { sign } from 'crypto';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MessagesComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;
  
  initialInteraction: Message[] = [
    { kind: 'ai', text: 'Hi there…' },
    { kind: 'ai', text: 'Have you made a future screenshot you would like to **scan** and add to the map?' },
  ];
  answer: Message = { kind: 'human', text: 'Yes, Let’s scan!' };
  tellMore: Message = { kind: 'ai', text: `This is more information bla bla bla.` };
  secondInteraction: Message = { kind: 'ai', text: `Great!

But first, please approve the collection, processing, and storage of your screenshot as described in the [Privacy Policy](https://google.com).

I’m also about to ask you for *access to the camera*, and then we can get going….` };

  inputAnswer = new Subject<string>();

  showMoreButton = signal(false);
  showScanButton = signal(false);
  showAgreeButton = signal(false);

  sendMessage(message: Message) {
    this.messagesComponent.addMessage(message);
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private platform: PlatformService, private router: Router) {    
    this.api.updateFromRoute(this.route.snapshot);
  }

  ngAfterViewInit() {
    this.platform.browser(() => {
      this.interact();
    });
  }

  interact() {
    interval(2000).pipe(
      take(3),
      switchMap((i) => {
        if (i < 2) {
          for (let j = 0; j < i + 1; j++) {
            this.initialInteraction[j].part = j !== i;
          }
          this.sendMessage(this.initialInteraction[i]);
          return from([]);
        } else {
          this.showMoreButton.set(true);
          this.showScanButton.set(true);
          return this.inputAnswer.pipe(
            tap((answer) => {
              if (answer === 'more') {
                this.sendMessage(this.tellMore);
                this.showMoreButton.set(false);
              }
            }),
            filter((answer) => answer === 'yes'),
            tap(() => {
              this.sendMessage(this.answer);
            }),
            delay(1000),
            tap(() => {
              this.sendMessage(this.secondInteraction);
              this.showScanButton.set(false);
              this.showAgreeButton.set(true);
            }),
          );
        }
      }),
      switchMap(() => {
        return this.inputAnswer;
      })
    ).subscribe(() => {
      this.showAgreeButton.set(false);
      this.router.navigate(['scan'], { queryParamsHandling: 'preserve'});
      console.log('DONE');
    });
  }
}
