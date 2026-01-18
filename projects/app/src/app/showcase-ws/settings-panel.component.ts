import { Component, output, input, signal, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FisheyeSettings {
  enabled: boolean;         // enable/disable fisheye effect
  maxMagnification: number; // how large items grow (1-10x) - fallback if maxHeight not working
  radius: number;           // radius of effect influence (px)
  maxHeight: number;        // max height of magnified items in vh (viewport height units) - zoom-independent
}

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-panel" 
         [class.collapsed]="isCollapsed()"
         [style.left.px]="panelX()"
         [style.bottom.px]="panelY()">
      <div class="panel-header"
           (mousedown)="onHeaderMouseDown($event)"
           (touchstart)="onHeaderTouchStart($event)">
        <div class="header-left">
          <span class="drag-handle">⋮⋮</span>
          <h3>🔍 Fisheye</h3>
        </div>
        <button class="toggle-btn" (click)="isCollapsed.set(!isCollapsed())">
          {{ isCollapsed() ? '▶' : '▼' }}
        </button>
      </div>

      <div class="panel-content" *ngIf="!isCollapsed()">
        <!-- Zoom Level Display -->
        <div class="zoom-level-display">
          <span class="zoom-label">Zoom:</span>
          <span class="zoom-value">{{ (zoomLevel() * 100).toFixed(0) }}%</span>
        </div>

        <!-- Enable/Disable Toggle -->
        <div class="toggle-group">
          <label>
            <input 
              type="checkbox" 
              [(ngModel)]="settings.enabled"
              (change)="updateSettings()"
              class="checkbox"
            />
            <span>{{ settings.enabled ? 'Enabled' : 'Disabled' }}</span>
          </label>
        </div>

        <!-- Fisheye Effect Size (Magnification) -->
        <div class="slider-group">
          <label>Fisheye Effect</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            [(ngModel)]="settings.maxMagnification"
            (input)="updateSettings()"
            class="slider"
            [disabled]="!settings.enabled"
          />
          <span class="value">{{ settings.maxMagnification.toFixed(1) }}×</span>
        </div>

        <!-- Fisheye Radius -->
        <div class="slider-group">
          <label>Fisheye Radius</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="10"
            [(ngModel)]="settings.radius"
            (input)="updateSettings()"
            class="slider"
            [disabled]="!settings.enabled"
          />
          <span class="value">{{ settings.radius }} px</span>
        </div>

        <!-- Max Magnified Height -->
        <div class="slider-group">
          <label>Max Magnified Height</label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            [(ngModel)]="settings.maxHeight"
            (input)="updateSettings()"
            class="slider"
            [disabled]="!settings.enabled"
          />
          <span class="value">{{ settings.maxHeight }} vh</span>
        </div>

        <!-- Description -->
        <div class="description">
          <p><strong>Fisheye Effect:</strong> How much items grow under the cursor (1× = no growth, 10× = 10× larger)</p>
          <p><strong>Radius:</strong> How far from cursor the effect reaches (px)</p>
          <p><strong>Zoom Dependence:</strong> At 0%, effect size is independent of zoom. At 100%, effect shrinks as you zoom in.</p>
          <p><strong>Max Height:</strong> Magnified items won't exceed this height (unless zoom already makes them larger)</p>
        </div>

        <!-- Reset Button -->
        <div class="button-group">
          <button class="btn btn-reset" (click)="resetToDefaults()" [disabled]="!settings.enabled">
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(20, 20, 20, 0.95);
      border: 2px solid #00ff88;
      border-radius: 8px;
      padding: 0;
      max-width: 280px;
      font-family: 'Courier New', monospace;
      z-index: 9999;
      box-shadow: 0 8px 32px rgba(0, 255, 136, 0.2);
      color: #00ff88;
    }

    .settings-panel.collapsed .panel-content {
      display: none;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #00ff88;
      cursor: grab;
      user-select: none;
    }

    .panel-header:active {
      cursor: grabbing;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .drag-handle {
      font-size: 16px;
      color: #00ff88;
      opacity: 0.5;
      line-height: 1;
      letter-spacing: -2px;
    }

    .panel-header h3 {
      margin: 0;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: #00ff88;
      font-size: 12px;
      cursor: pointer;
      padding: 4px 8px;
      font-weight: bold;
    }

    .toggle-btn:hover {
      color: #00ffaa;
    }

    .panel-content {
      padding: 12px;
      max-height: 600px;
      overflow-y: auto;
    }

    .zoom-level-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px;
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
    }

    .zoom-label {
      color: #00ff88;
      text-transform: uppercase;
    }

    .zoom-value {
      color: #00ffaa;
      min-width: 40px;
      text-align: right;
      font-family: monospace;
    }

    .toggle-group {
      margin-bottom: 12px;
      padding: 8px;
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 4px;
    }

    .toggle-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-weight: bold;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #00ff88;
    }

    .slider-group {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      margin-bottom: 12px;
      align-items: center;
    }

    .slider-group label {
      font-size: 12px;
      font-weight: bold;
    }

    .slider {
      width: 100%;
      cursor: pointer;
      accent-color: #00ff88;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .slider:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .value {
      font-size: 11px;
      font-weight: bold;
      min-width: 40px;
      text-align: right;
      color: #00ffaa;
    }

    .description {
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 4px;
      padding: 8px;
      margin: 12px 0;
      font-size: 11px;
      line-height: 1.4;
    }

    .description p {
      margin: 4px 0;
    }

    .description strong {
      color: #00ffaa;
    }

    .button-group {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .btn {
      flex: 1;
      padding: 8px 12px;
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid #00ff88;
      border-radius: 4px;
      color: #00ff88;
      font-family: 'Courier New', monospace;
      font-size: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn:hover:not(:disabled) {
      background: rgba(0, 255, 136, 0.2);
      color: #00ffaa;
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-reset {
      background: rgba(255, 100, 100, 0.1);
      border-color: #ff6464;
      color: #ff6464;
    }

    .btn-reset:hover:not(:disabled) {
      background: rgba(255, 100, 100, 0.2);
      color: #ff8888;
    }

    /* Scrollbar styling */
    .panel-content::-webkit-scrollbar {
      width: 6px;
    }

    .panel-content::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .panel-content::-webkit-scrollbar-thumb {
      background: #00ff88;
      border-radius: 3px;
    }
  `]
})
export class SettingsPanelComponent implements AfterViewInit, OnDestroy, OnInit {
  // Inputs
  initialSettings = input<FisheyeSettings>();
  initialCollapsed = input<boolean>(true);
  zoomLevel = input<number>(1.0); // Current zoom level from renderer

  // Outputs
  settingsChange = output<FisheyeSettings>();

  // Signals
  isCollapsed = signal(true);

  // Drag state
  panelX = signal(window.innerWidth ? window.innerWidth - 300 : 0);
  panelY = signal(20);
  private isDragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  settings: FisheyeSettings = {
    enabled: true,
    maxMagnification: 10,
    radius: 600,
    maxHeight: 40
  };

  constructor() {
    this.isCollapsed.set(this.initialCollapsed());
    this.loadPanelPosition();
  }

  ngOnInit() {
    const incoming = this.initialSettings();
    if (incoming) {
      this.settings = { ...incoming };
    }
    this.loadSettingsFromUrl();
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
    this.savePanelPosition();
  }

  onHeaderMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragOffsetX = event.clientX - this.panelX();
    this.dragOffsetY = window.innerHeight - event.clientY - this.panelY();
    event.preventDefault();
  }

  onHeaderTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.isDragging = true;
    this.dragOffsetX = touch.clientX - this.panelX();
    this.dragOffsetY = window.innerHeight - touch.clientY - this.panelY();
    event.preventDefault();
  }

  private onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.panelX.set(event.clientX - this.dragOffsetX);
      this.panelY.set(window.innerHeight - event.clientY - this.dragOffsetY);
    }
  }

  private onTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      const touch = event.touches[0];
      this.panelX.set(touch.clientX - this.dragOffsetX);
      this.panelY.set(window.innerHeight - touch.clientY - this.dragOffsetY);
      event.preventDefault();
    }
  }

  private onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.savePanelPosition();
    }
  }

  private onTouchEnd() {
    if (this.isDragging) {
      this.isDragging = false;
      this.savePanelPosition();
    }
  }

  private savePanelPosition(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('settingsPanelX', this.panelX().toString());
      localStorage.setItem('settingsPanelY', this.panelY().toString());
    }
  }

  private loadPanelPosition(): void {
    if (typeof localStorage !== 'undefined') {
      const savedX = localStorage.getItem('settingsPanelX');
      const savedY = localStorage.getItem('settingsPanelY');
      if (savedX !== null) this.panelX.set(parseFloat(savedX));
      if (savedY !== null) this.panelY.set(parseFloat(savedY));
    }
  }

  updateSettings(): void {
    this.settingsChange.emit(this.settings);
  }

  resetToDefaults(): void {
    this.settings = {
      enabled: true,
      maxMagnification: 10,
      radius: 600,
      maxHeight: 40
    };
    this.updateSettings();
  }

  private loadSettingsFromUrl(): void {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.has('fisheyeEnabled')) this.settings.enabled = params.get('fisheyeEnabled') === 'true';
    if (params.has('maxMagnification')) this.settings.maxMagnification = parseFloat(params.get('maxMagnification')!);
    if (params.has('radius')) this.settings.radius = parseFloat(params.get('radius')!);
  }

  private generateShareUrl(): string {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    params.set('fisheyeEnabled', this.settings.enabled.toString());
    params.set('maxMagnification', this.settings.maxMagnification.toString());
    params.set('radius', this.settings.radius.toString());
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  copyToClipboard(): void {
    const url = this.generateShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      alert('Settings URL copied to clipboard!');
    });
  }
}
