import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../auth.service';
import { UserLoginType } from '../userLogin';

@Component({
  selector: 'app-login-container',
  imports: [LoginFormComponent],
  template: ` <app-login-form (onSubmit)="onSubmit($event)" /> `,
  styleUrl: './login-container.component.scss',
})
export class LoginContainerComponent {
  constructor(private authService: AuthService) {}

  onSubmit(userLogin: UserLoginType): void {
    console.log(' onSubmit  - userLogin', userLogin);
  }
}
