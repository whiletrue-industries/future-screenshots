import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, take, takeWhile } from 'rxjs';

interface ToastData {
  photoUrl: string;
  photoRotation: number; // in degrees
  plausibility: number; // 0-100
  favorableFuture: 'prefer' | 'prevent';
  photoId: string;
}

@Component({
  selector: 'app-drag-confirmation-toast',
  imports: [CommonModule],
  templateUrl: './drag-confirmation-toast.component.html',
  styleUrl: './drag-confirmation-toast.component.less'
})
export class DragConfirmationToastComponent {
  // Inputs
  data = input<ToastData | null>(null);
  
  // Outputs
  ambivalenceToggled = output<{ photoId: string; newValue: string }>();
  closed = output<void>();
  
  // State
  isVisible = signal(false);
  countdownProgress = signal(0); // 0 to 100
  isAmbivalent = signal(false);
  
  // Computed values
  plausibilityText = computed(() => {
    const plausibility = this.data()?.plausibility ?? 50;
    if (plausibility === 0) return 'Preposterous';
    if (plausibility === 25) return 'Possible';
    if (plausibility === 50) return 'Plausible';
    if (plausibility === 75) return 'Probable';
    if (plausibility === 100) return 'Projected';
    // Interpolate between values
    if (plausibility < 25) return 'Preposterous';
    if (plausibility < 50) return 'Possible';
    if (plausibility < 75) return 'Plausible';
    if (plausibility < 100) return 'Probable';
    return 'Projected';
  });
  
  favorableFutureText = computed(() => {
    const data = this.data();
    if (!data) return '';
    
    const base = data.favorableFuture === 'prefer' ? 'Prefer' : 'Prevent';
    return this.isAmbivalent() ? `Mostly ${base}` : base;
  });
  
  pinImagePath = computed(() => {
    const data = this.data();
    if (!data) return '';
    
    const orientation = Math.abs(data.photoRotation) > 45 ? 'v' : 'h';
    const type = data.favorableFuture === 'prefer' ? 'prefer' : 'prevent';
    return `/img-pin-${type}-${orientation}.svg`;
  });
  
  constructor() {
    // Watch for data changes to show/hide toast
    effect(() => {
      const data = this.data();
      if (data) {
        this.show();
      }
    });
  }
  
  private show(): void {
    this.isVisible.set(true);
    this.countdownProgress.set(0);
    this.isAmbivalent.set(false);
    
    // Start 3-second countdown
    const countdownDuration = 3000; // 3 seconds
    const updateInterval = 50; // Update every 50ms for smooth animation
    const totalSteps = countdownDuration / updateInterval;
    let currentStep = 0;
    
    interval(updateInterval)
      .pipe(
        take(totalSteps),
        takeWhile(() => this.isVisible())
      )
      .subscribe({
        next: () => {
          currentStep++;
          this.countdownProgress.set((currentStep / totalSteps) * 100);
        },
        complete: () => {
          if (this.isVisible()) {
            this.hide();
          }
        }
      });
  }
  
  hide(): void {
    this.isVisible.set(false);
    this.closed.emit();
  }
  
  toggleAmbivalence(): void {
    const data = this.data();
    if (!data) return;
    
    const newAmbivalence = !this.isAmbivalent();
    this.isAmbivalent.set(newAmbivalence);
    
    // Emit the toggle event with new value
    const newValue = newAmbivalence
      ? (data.favorableFuture === 'prefer' ? 'mostly_prefer' : 'mostly_prevent')
      : data.favorableFuture;
    
    this.ambivalenceToggled.emit({
      photoId: data.photoId,
      newValue
    });
  }
}
