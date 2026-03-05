import { Directive, ElementRef, OnInit, inject, input } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadImageDirective implements OnInit {
  private el = inject(ElementRef<HTMLImageElement>);
  
  dataSrc = input.required<string>();
  itemId = input.required<string>();
  onLoaded = input<(itemId: string) => void>();
  observer = input<IntersectionObserver | null>();

  ngOnInit(): void {
    const img = this.el.nativeElement;
    const observer = this.observer();
    const dataSrcValue = this.dataSrc();
    const itemIdValue = this.itemId();
    
    if (!observer || !dataSrcValue || !itemIdValue) return;

    img.setAttribute('data-src', dataSrcValue);
    img.setAttribute('data-item-id', itemIdValue);
    
    // Set up load handler
    const loadHandler = () => {
      const onLoadedFn = this.onLoaded();
      if (onLoadedFn) {
        onLoadedFn(itemIdValue);
      }
      img.removeEventListener('load', loadHandler);
    };
    img.addEventListener('load', loadHandler);
    
    // Start observing
    observer.observe(img);
  }
}
