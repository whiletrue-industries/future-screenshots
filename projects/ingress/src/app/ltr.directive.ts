import { getLocaleDirection } from '@angular/common';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ltr]'
})
export class LtrDirective {

  constructor(private el: ElementRef) {
    const l = $localize.locale || 'en';
    if (getLocaleDirection(l) === 'rtl') {
      this.el.nativeElement.style.direction = 'rtl';
    }
  }

}
