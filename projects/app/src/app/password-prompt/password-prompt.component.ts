import { Component, effect, signal } from '@angular/core';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-prompt',
  imports: [
    FormsModule
  ],
  templateUrl: './password-prompt.component.html',
  styleUrl: './password-prompt.component.less'
})
export class PasswordPromptComponent {

  password = signal<string>('');

  constructor(private state: StateService, private api: ApiService) {
    effect(() => {
      const pwd = this.password();
      const workspaceIdParts = this.api.workspaceId()?.split('-') || [];
      if (workspaceIdParts.length > 4) {
        const expectedPwd = workspaceIdParts[1][0] + workspaceIdParts[2][0] + workspaceIdParts[3][0] + workspaceIdParts[4][0];
        this.state.authenticated.set(pwd === expectedPwd);
      }
    });
  }
}
