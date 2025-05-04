import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Message, MessagesComponent } from "../messages/messages.component";
import { delay, filter, from, interval, Subject, switchMap, take, tap, timer } from 'rxjs';
import { PlatformService } from '../../../platform.service';

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
    new Message('ai', 'Hi there…'),
    new Message('ai', 'I’m here to help you **scan** your future screenshot and add it to the map.'),
  ];
  answer: Message = new Message('human', 'Yes, Let’s scan!');
  tellMore: Message = new Message('ai', `This is more information bla bla bla.`);
  secondInteraction: Message = new Message('ai', `Great!

But first, please approve the collection, processing, and storage of your screenshot as described in the [Privacy Policy](https://github.com/whiletrue-industries/future-screenshots/blob/main/projects/ingress/src/privacy-policy.md).

I’m also about to ask you for **access to the camera**, and then we can get going….`);

  inputAnswer = new Subject<string>();

  showMoreButton = signal(false);
  showScanButton = signal(false);
  showAgreeButton = signal(false);

  addMessage(message: Message) {
    this.messagesComponent.addMessage(message);
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private platform: PlatformService, private router: Router) {    
    this.api.updateFromRoute(this.route.snapshot);
  }

  ngOnInit() {
    this.messagesComponent?.clear();
    this.showMoreButton.set(false);
    this.showScanButton.set(false);
    this.showAgreeButton.set(false);
  }

  ngAfterViewInit() {
    this.platform.browser(() => {
      this.interact();
    });
  }

  interact() {
    interval(1500).pipe(
      take(3),
      switchMap((i) => {
        if (i < 2) {
          for (let j = 0; j < i + 1; j++) {
            this.initialInteraction[j].part = j !== i;
          }
          this.addMessage(this.initialInteraction[i]);
          return from([]);
        } else {
          this.showMoreButton.set(true);
          this.showScanButton.set(true);
          return this.inputAnswer.pipe(
            tap((answer) => {
              if (answer === 'more') {
                this.addMessage(this.tellMore);
                this.showMoreButton.set(false);
              }
            }),
            filter((answer) => answer === 'yes'),
            tap(() => {
              this.addMessage(this.answer);
            }),
            delay(1000),
            tap(() => {
              this.addMessage(this.secondInteraction);
              this.showScanButton.set(false);
              this.showMoreButton.set(false);
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
