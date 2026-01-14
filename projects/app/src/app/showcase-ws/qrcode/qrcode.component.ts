import { AfterViewInit, Component, computed, ElementRef, input, signal, ViewChild } from '@angular/core';

import { PlatformService } from '../../../platform.service';

@Component({
  selector: 'app-qrcode',
  imports: [],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.less'
})
export class QrcodeComponent implements AfterViewInit {
  url = input('');
  small = input(false);
  codeSize = signal(0);
  transform = computed(() => {
    const small = this.small();
    const codeSize = this.codeSize();
    const scale = this.scale();
    return `translate(${small ? 0 : scale * codeSize / 2}px, ${small ? 0 : -scale * codeSize / 2}px) scale(${scale})`;
  });
  scale = computed(() => {
    const mainEl = this.mainEl();
    if (!mainEl) return 1;
    let ret = (mainEl.clientHeight / 2) / this.codeSize();
    return this.small() ? ret / 5 : ret;
  });
  mainEl = signal<HTMLElement | null>(null);

  @ViewChild('qrcode', { static: true }) qrCodeEl!: ElementRef;

  constructor(private el: ElementRef, private platform: PlatformService) {}
  
  async ngAfterViewInit() {
    if (!this.platform.browser()) return;
    this.mainEl.set(this.el.nativeElement);

    try {
      // Dynamically import qrcode only in browser
      const QRCode = (await import('qrcode')).default;
      await QRCode.toCanvas(this.qrCodeEl.nativeElement,
        this.url(), {
        scale: 16,
        color: {
          light: '#FFFDF6',
          dark: '#4E02B2'
        }
      });
      this.codeSize.set(this.qrCodeEl.nativeElement.height);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
}
