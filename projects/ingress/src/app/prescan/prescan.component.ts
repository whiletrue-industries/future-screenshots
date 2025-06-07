import { AfterViewInit, Component, computed, DestroyRef, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Message, MessagesComponent } from "../messages/messages.component";
import { delay, filter, from, interval, map, Subject, switchMap, take, tap, timer } from 'rxjs';
import { PlatformService } from '../../../platform.service';
import { LtrDirective } from '../ltr.directive';
import { MainMenuComponent } from "../main-menu/main-menu.component";
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MessagesComponent,
    LtrDirective,
    MainMenuComponent,
    LanguageSelectorComponent
],
  templateUrl: './prescan.component.html',
  styleUrl: './prescan.component.less'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(MessagesComponent) messagesComponent!: MessagesComponent;
  
  initialInteraction: Message[] = [
    new Message('ai', $localize`Hi there…`),
    new Message('ai', $localize`I’m here to help you **scan** your future screenshot and add it to the map.`),
  ];
  answer: Message = new Message('human', $localize`Yes, Let’s scan!`);
  tellMore: Message = new Message('ai', $localize`Find our booth in the lobby in front of the entrance. There you'll find templates and guidance.`);
  secondInteraction: Message = new Message('ai', $localize`Great!

But first, please approve the collection, processing, and storage of your screenshot as described in the [Privacy Policy](https://github.com/whiletrue-industries/future-screenshots/blob/main/projects/ingress/src/privacy-policy.md).

I’m also about to ask you for **access to the camera**, and then we can get going….`);

  inputAnswer = new Subject<string>();

  showMoreButton = signal(false);
  showScanButton = signal(false);
  showAgreeButton = signal(false);
  topMenuOpen = signal(true);
  mainMenuOpen = signal(false);

  addMessage(message: Message) {
    this.messagesComponent.addMessage(message);
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private platform: PlatformService, private router: Router, private ref: DestroyRef) {    
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
      this.messagesComponent.scrollPosition.pipe(
        takeUntilDestroyed(this.ref),
        map((pos) => pos < 10),
      ).subscribe((value) => {
        this.topMenuOpen.set(value);
      });
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
