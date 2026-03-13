import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  host: {
    class: 'skeleton-loader'
  },
  template: '<div class="skeleton-pulse"></div>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background-color: hsl(0, 0%, 90%);
      border-radius: 2px;
    }

    .skeleton-pulse {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        hsl(0, 0%, 90%) 0%,
        hsl(0, 0%, 95%) 50%,
        hsl(0, 0%, 90%) 100%
      );
      background-size: 200% 100%;
      animation: skeletonLoading 1.5s infinite;
      border-radius: 2px;
    }

    @keyframes skeletonLoading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
  width = input<string | number>('100%');
  height = input<string | number>('100%');
}
