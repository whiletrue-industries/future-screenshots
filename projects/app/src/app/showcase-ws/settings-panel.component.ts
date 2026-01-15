import { Component, output, input, signal, computed, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FisheyeSettings {
  maxMagnification: number; // max-size of enlargement
  radius: number;          // radius of fisheye influence
  zoomRelative: number;    // size relative to zoom (0 = no change, 1 = full reduction)
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
          <h3>⚙️ Settings</h3>
        </div>
        <button class="toggle-btn" (click)="isCollapsed.set(!isCollapsed())">
          {{ isCollapsed() ? '▶' : '▼' }}
        </button>
      </div>

      <div class="panel-content" *ngIf="!isCollapsed()">
        <!-- FOV Slider -->
        <div class="slider-group">
          <label>Field of View</label>
          <input
            type="range"
            min="20"
            max="120"
            step="1"
            [(ngModel)]="settings.fov"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.fov }}°</span>
        </div>

        <!-- Fisheye Strength -->
        <div class="slider-group">
          <label>Fisheye Effect</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            [(ngModel)]="settings.fisheye"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ (settings.fisheye * 100).toFixed(0) }}%</span>
        </div>

        <!-- Zoom -->
        <div class="slider-group">
          <label>Zoom Level</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            [(ngModel)]="settings.zoom"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.zoom.toFixed(1) }}x</span>
        </div>

        <!-- Rotation Speed -->
        <div class="slider-group">
          <label>Rotation Speed</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            [(ngModel)]="settings.rotationSpeed"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.rotationSpeed.toFixed(1) }}x</span>
        </div>

        <!-- Pan Sensitivity -->
        <div class="slider-group">
          <label>Pan Sensitivity</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            [(ngModel)]="settings.panSensitivity"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.panSensitivity.toFixed(1) }}x</span>
        </div>

        <!-- Depth of Field -->
        <div class="slider-group">
          <label>Depth of Field</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            [(ngModel)]="settings.depthOfField"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ (settings.depthOfField * 100).toFixed(0) }}%</span>
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <button class="btn btn-share" (click)="copyShareableUrl()">
            📋 Copy Settings URL
          </button>
          <button class="btn btn-reset" (click)="resetToDefaults()">
            🔄 Reset
          </button>
        </div>

        <!-- Share URL Display -->
        <div class="share-url" *ngIf="showShareUrl()">
          <p class="small-text">Share this URL to lock in these settings:</p>
          <code class="url-box">{{ shareUrl() }}</code>
          <button class="btn btn-copy" (click)="copyToClipboard()">Copy to Clipboard</button>
        </div>

        <!-- Current Values for Manual Hardcoding -->
        <div class="current-values">
          <p class="small-text">Current settings (for hardcoding):</p>
          <code>{{ currentValuesJson() }}</code>
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
      max-width: 320px;
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
      text-transform: uppercase;
      grid-column: 1 / -1;
      color: #00ff88;
    }

    .slider {
      grid-column: 1;
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #333;
      outline: none;
      -webkit-appearance: none;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #00ff88;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
    }

    .slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #00ff88;
      cursor: pointer;
      border: none;
      box-shadow: 0 0 8px rgba(0, 255, 136, 0.6);
    }

    .value {
      font-size: 11px;
      color: #00ff88;
      font-weight: bold;
      text-align: right;
    }

    .button-group {
      display: flex;
      gap: 8px;
      margin: 12px 0;
      flex-wrap: wrap;
    }

    .btn {
      flex: 1;
      padding: 8px 12px;
      font-size: 11px;
      font-weight: bold;
      border: 1px solid #00ff88;
      background: transparent;
      color: #00ff88;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Courier New', monospace;
      text-transform: uppercase;
      transition: all 0.2s;
    }

    .btn:hover {
      background: #00ff88;
      color: #1a1a1a;
      box-shadow: 0 0 16px rgba(0, 255, 136, 0.4);
    }

    .btn-share {
      min-width: fit-content;
    }

    .btn-reset {
      min-width: fit-content;
    }

    .btn-copy {
      width: 100%;
      margin-top: 8px;
    }

    .share-url {
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid #00ff88;
      border-radius: 4px;
      padding: 8px;
      margin: 12px 0;
      font-size: 10px;
    }

    .url-box {
      display: block;
      background: #1a1a1a;
      border: 1px solid #00ff88;
      border-radius: 3px;
      padding: 6px;
      margin: 6px 0;
      word-break: break-all;
      font-size: 9px;
      color: #00ff88;
      max-height: 80px;
      overflow-y: auto;
    }

    .current-values {
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid #00ff88;
      border-radius: 4px;
      padding: 8px;
      margin-top: 12px;
      font-size: 10px;
    }

    .current-values code {
      display: block;
      background: #1a1a1a;
      border: 1px solid #00ff88;
      border-radius: 3px;
      padding: 6px;
      margin-top: 4px;
      word-break: break-all;
      max-height: 100px;
      overflow-y: auto;
      color: #00ff88;
    }

    .small-text {
      margin: 0;
      font-size: 10px;
      color: #00ff88;
      opacity: 0.8;
    }

    /* Scrollbar styling */
    .panel-content::-webkit-scrollbar,
    .url-box::-webkit-scrollbar,
    .current-values code::-webkit-scrollbar {
      width: 6px;
    }

    .panel-content::-webkit-scrollbar-track,
    .url-box::-webkit-scrollbar-track,
    .current-values code::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .panel-content::-webkit-scrollbar-thumb,
    .url-box::-webkit-scrollbar-thumb,
    .current-values code::-webkit-scrollbar-thumb {
      background: #00ff88;
      border-radius: 3px;
    }
  `]
})
export class SettingsPanelComponent {
  // Inputs
  initialSettings = input<CameraSettings>();
  initialCollapsed = input<boolean>(true);

  // Outputs
  settingsChange = output<FisheyeSettings>();

  // Signals
  isCollapsed = signal(true);

  // Drag state
  panelX = signal(window.innerWidth ? window.innerWidth - 340 : 0); // Right side, 20px from edge
  panelY = signal(20); // Bottom position
  private isDragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  settings: FisheyeSettings = {
    maxMagnification: 2,
    radius: 800,
    zoomRelative: 0.5
  };

  showShareUrl = computed(() => false); // Toggle this to show URL
  shareUrl = computed(() => this.generateShareUrl());
  currentValuesJson = computed(() => JSON.stringify(this.settings, null, 2));

  constructor() {
    this.isCollapsed.set(this.initialCollapsed());
      <div class="panel-content" *ngIf="!isCollapsed()">
        <!-- Max-size of enlargement -->
        <div class="slider-group">
          <label>Max Enlargement</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            [(ngModel)]="settings.maxMagnification"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.maxMagnification.toFixed(1) }}x</span>
        </div>

        <!-- Radius of fisheye influence -->
        <div class="slider-group">
          <label>Fisheye Radius</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="10"
            [(ngModel)]="settings.radius"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ settings.radius }} px</span>
        </div>

        <!-- Size relative to zoom level -->
        <div class="slider-group">
          <label>Zoom Relative (less effect on zoom in)</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            [(ngModel)]="settings.zoomRelative"
            (input)="updateSettings()"
            class="slider"
          />
          <span class="value">{{ (settings.zoomRelative * 100).toFixed(0) }}%</span>
        </div>
      </div>
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
    this.savePanelPosition();
  }

  /**
   * Save panel position to localStorage
   */
  private savePanelPosition(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('settingsPanelX', this.panelX().toString());
      localStorage.setItem('settingsPanelY', this.panelY().toString());
    }
  }

  /**
   * Load panel position from localStorage
   */
  private loadPanelPosition(): void {
    if (typeof localStorage !== 'undefined') {
      const savedX = localStorage.getItem('settingsPanelX');
      const savedY = localStorage.getItem('settingsPanelY');
      if (savedX) this.panelX.set(parseInt(savedX, 10));
      if (savedY) this.panelY.set(parseInt(savedY, 10));
    }
  }

  updateSettings() {
    console.log('[SETTINGS_PANEL] updateSettings', { ...this.settings });
    this.settingsChange.emit(this.settings);
  }

  resetToDefaults() {
    this.settings = {
      fov: 75,
      fisheye: 0,
      zoom: 1,
      rotationSpeed: 1,
      panSensitivity: 1,
      depthOfField: 0
    };
    this.updateSettings();
  }

  private generateShareUrl(): string {
    const params = new URLSearchParams({
      fov: this.settings.fov.toString(),
      fisheye: this.settings.fisheye.toFixed(2),
      zoom: this.settings.zoom.toFixed(2),
      rotationSpeed: this.settings.rotationSpeed.toFixed(2),
      panSensitivity: this.settings.panSensitivity.toFixed(2),
      depthOfField: this.settings.depthOfField.toFixed(2)
    });
    
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }

  copyShareableUrl() {
    this.copyToClipboard();
    alert('✅ Settings URL copied to clipboard!');
  }

  copyToClipboard() {
    const url = this.generateShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      console.log('📋 Settings URL copied:', url);
    });
  }

  private loadSettingsFromUrl() {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    
    const fov = params.get('fov');
    const fisheye = params.get('fisheye');
    const zoom = params.get('zoom');
    const rotationSpeed = params.get('rotationSpeed');
    const panSensitivity = params.get('panSensitivity');
    const depthOfField = params.get('depthOfField');

    // Only update settings if at least one parameter is present
    let hasParams = false;
    if (fov) { this.settings.fov = parseFloat(fov); hasParams = true; }
    if (fisheye) { this.settings.fisheye = parseFloat(fisheye); hasParams = true; }
    if (zoom) { this.settings.zoom = parseFloat(zoom); hasParams = true; }
    if (rotationSpeed) { this.settings.rotationSpeed = parseFloat(rotationSpeed); hasParams = true; }
    if (panSensitivity) { this.settings.panSensitivity = parseFloat(panSensitivity); hasParams = true; }
    if (depthOfField) { this.settings.depthOfField = parseFloat(depthOfField); hasParams = true; }

    // Only emit settings if we loaded parameters from URL
    // Don't emit default values that might override existing renderer state
    if (hasParams) {
      this.updateSettings();
    }
  }
}
