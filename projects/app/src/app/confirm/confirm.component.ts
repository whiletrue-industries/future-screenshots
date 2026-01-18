import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StateService } from '../../state.service';
import { ApiService } from '../../api.service';
import { LtrDirective } from '../ltr.directive';

@Component({
  selector: 'app-confirm',
  imports: [
    RouterLink,
    LtrDirective
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {
  isTemplateFlow = false;

  constructor(public state: StateService, private router: Router, public api: ApiService, private route: ActivatedRoute) { 
    this.api.updateFromRoute(this.route.snapshot);
    this.isTemplateFlow = this.route.snapshot.queryParamMap.get('template') === 'true';
    if (!this.state.currentImageUrl()) {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }

  upload() {
    const currentImage = this.state.currentImage();
    if (currentImage) {
      // Prepare metadata including textbox data and no-paper tag
      const metadata: any = {};
      
      // Add textbox data if available
      const textboxData = this.state.currentTextboxData();
      if (textboxData) {
        metadata.textbox_content = textboxData;
      }
      
      // Add no-paper tag if this is from template flow
      if (this.isTemplateFlow) {
        metadata.tags = ['no-paper'];
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
            this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
          });
        }
      });
    } else {
      this.router.navigate(['/scan'], { queryParamsHandling: 'preserve' });
    }
  }
}
