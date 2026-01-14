import { Component, output, input, signal, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../platform.service';

@Component({
  selector: 'app-qr-code-modal',
  imports: [CommonModule],
  templateUrl: './qr-code-modal.component.html',
  styleUrl: './qr-code-modal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeModalComponent implements OnInit {
  workspaceId = input.required<string>();
  apiKey = input.required<string>();
  itemId = input.required<string>();
  closed = output<void>();
  
  qrCodeUrl = signal<string | null>(null);
  copying = signal<boolean>(false);

  private platform = inject(PlatformService);

  ngOnInit() {
    // Only generate QR code in browser
    this.platform.browser(() => {
      this.generateQRCode();
    });
  }
  
  private async generateQRCode() {
    try {
      // Dynamically import qrcode only in browser
      const QRCode = (await import('qrcode')).default;
      const scanUrl = this.buildScanUrl();
      const dataUrl = await QRCode.toDataURL(scanUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 2,
        width: 400,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      this.qrCodeUrl.set(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
  
  private buildScanUrl(): string {
    // Get baseUrl from window (only available in browser)
    let baseUrl = '';
    if (typeof window !== 'undefined') {
      baseUrl = window.location.origin;
    }
    const params = new URLSearchParams({
      workspace: this.workspaceId(),
      api_key: this.apiKey(),
      replace_item: this.itemId()
    });
    return `${baseUrl}/scan?${params.toString()}`;
  }
  
  downloadQRCode() {
    this.platform.browser(() => {
      const link = document.createElement('a');
      link.href = this.qrCodeUrl() || '';
      link.download = `qr-code-replace-item-${this.itemId()}.png`;
      link.click();
    });
  }
  
  copyQRLink() {
    this.platform.browser(() => {
      this.copying.set(true);
      const scanUrl = this.buildScanUrl();
      navigator.clipboard.writeText(scanUrl).then(() => {
        setTimeout(() => this.copying.set(false), 2000);
      }).catch(() => {
        this.copying.set(false);
      });
    });
  }
  
  close() {
    this.closed.emit();
  }
}
