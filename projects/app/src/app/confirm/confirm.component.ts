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

  preferenceOptions = [
    { label: $localize`Preferred`, value: 'prefer' },
    { label: $localize`Mostly Preferred`, value: 'mostly prefer' },
    { label: $localize`Mostly Prevented`, value: 'mostly prevent' },
    { label: $localize`Prevented`, value: 'prevent' }
  ];

  potentialOptions = [
    { label: $localize`Projected`, value: 100 },
    { label: $localize`Probable`, value: 75 },
    { label: $localize`Plausible`, value: 50 },
    { label: $localize`Possible`, value: 25 },
    { label: $localize`Preposterous`, value: 0 }
  ];

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    if (!this.state.currentImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }

  upload() {
    const currentImage = this.state.currentImage();
    if (currentImage) {
      const metadata: any = {};

      // Store user-set values to restore after AI analysis
      const userSetMetadata: any = {};

      // Add preference if selected (only set initially, not on update)
      const pref = this.state.batchPreference();
      if (pref) {
        metadata['favorable_future'] = pref;
        userSetMetadata['favorable_future'] = pref;
      }

      // Add potential if selected (only set initially, not on update)
      const pot = this.state.batchPotential();
      if (pot !== null) {
        metadata['plausibility'] = pot;
        userSetMetadata['plausibility'] = pot;
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
            // If user set values, restore them after AI analysis
            if (Object.keys(userSetMetadata).length > 0) {
              this.api.updateItem(userSetMetadata, res.item_id, res.item_key).subscribe(() => {
                // Navigate back to scan after restoring user values
                this.router.navigate(['/scan'], { 
                  queryParamsHandling: 'preserve'
                });
              });
            } else {
              // Navigate back to scan
              this.router.navigate(['/scan'], { 
                queryParamsHandling: 'preserve'
              });
            }
          });
        }
      });
    } else {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }
}
