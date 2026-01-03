import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective,
    FormsModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {

  preference = signal<string>('');
  potential = signal<string>('');

  preferenceOptions = [
    { label: $localize`Preferred`, value: 'prefer' },
    { label: $localize`Mostly Preferred`, value: 'mostly prefer' },
    { label: $localize`Mostly Prevented`, value: 'mostly prevent' },
    { label: $localize`Prevented`, value: 'prevent' }
  ];

  potentialOptions = [
    { label: $localize`Projected`, value: 'projected' },
    { label: $localize`Probable`, value: 'probable' },
    { label: $localize`Plausible`, value: 'plausible' },
    { label: $localize`Possible`, value: 'possible' },
    { label: $localize`Preposterous`, value: 'preposterous' }
  ];

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    if (!this.state.currentImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }

    // Read from URL hash first
    this.loadFromHash();

    // Update URL hash when values change (skip first run since we just loaded from hash)
    let firstRun = true;
    effect(() => {
      const pref = this.preference();
      const pot = this.potential();
      if (!firstRun) {
        this.saveToHash(pref, pot);
      }
      firstRun = false;
    });
  }

  loadFromHash() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const pref = params.get('preference');
    const pot = params.get('potential');
    if (pref) {
      this.preference.set(pref);
    }
    if (pot) {
      this.potential.set(pot);
    }
  }

  saveToHash(preference: string, potential: string) {
    // Using window.location.hash directly for fragment-based state persistence
    // This allows maintaining dropdown state across scans without affecting Angular routing
    const params = new URLSearchParams();
    if (preference) {
      params.set('preference', preference);
    }
    if (potential) {
      params.set('potential', potential);
    }
    const hash = params.toString();
    if (hash) {
      window.location.hash = hash;
    } else {
      window.location.hash = '';
    }
  }

  upload() {
    const currentImage = this.state.currentImage();
    if (currentImage) {
      const metadata: any = {};
      
      // Add preference if selected (only set initially, not on update)
      const pref = this.preference();
      if (pref) {
        metadata['favorable_future'] = pref;
      }

      // Add potential if selected (only set initially, not on update)
      const pot = this.potential();
      if (pot) {
        metadata['plausibility'] = pot;
      }

      this.api.createItem(metadata).subscribe((res: any) => {
        const params = {
          'item-id': res.item_id,
          'key': res.item_key
        };
        if (!this.api.automatic()) {
          this.api.uploadImage(currentImage, res.item_id, res.item_key);
          this.router.navigate(['/props'], { queryParams: params, queryParamsHandling: 'merge'});
        } else {
          this.api.uploadImageAuto(currentImage, res.item_id, res.item_key).subscribe(() => {
            // Navigate back to scan, preserving hash to maintain dropdown state
            this.router.navigate(['/scan'], { 
              queryParamsHandling: 'preserve',
              fragment: window.location.hash.substring(1) 
            });
          });
        }
      });
    } else {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }
}
