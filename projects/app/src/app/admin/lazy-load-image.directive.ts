import { Directive, ElementRef, OnInit, OnDestroy, inject, input } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLImageElement>);

  dataSrc = input.required<string>();
  itemId = input.required<string>();
  onLoaded = input<(itemId: string) => void>();
  observer = input<IntersectionObserver | null>();

  private observedImg: HTMLImageElement | null = null;
  private activeObserver: IntersectionObserver | null = null;
  private loadHandler: (() => void) | null = null;

  ngOnInit(): void {
    const img = this.el.nativeElement;
    const observer = this.observer();
    const dataSrcValue = this.dataSrc();
    const itemIdValue = this.itemId();

    if (!observer || !dataSrcValue || !itemIdValue) return;

    img.setAttribute('data-src', dataSrcValue);
    img.setAttribute('data-item-id', itemIdValue);

    // Persistent load handler — images may cycle through load → unload → reload.
    this.loadHandler = () => {
      const onLoadedFn = this.onLoaded();
      if (onLoadedFn) {
        onLoadedFn(itemIdValue);
      }
    };
    img.addEventListener('load', this.loadHandler);

    observer.observe(img);
    this.observedImg = img;
    this.activeObserver = observer;
  }

  ngOnDestroy(): void {
    if (this.observedImg && this.activeObserver) {
      this.activeObserver.unobserve(this.observedImg);
    }
    if (this.observedImg && this.loadHandler) {
      this.observedImg.removeEventListener('load', this.loadHandler);
    }
  }
}
