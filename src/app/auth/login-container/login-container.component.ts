import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../auth.service';
import { UserLoginType } from '../userLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  imports: [LoginFormComponent],
  template: ` <app-login-form (onSubmit)="onSubmit($event)" /> `,
  styleUrl: './login-container.component.scss',
})
export class LoginContainerComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(userLogin: UserLoginType): void {
    console.log(' onSubmit  - userLogin', userLogin);

    this.authService.login(userLogin);
    this.router.navigate(['']); // redirect to index page
  }
}
