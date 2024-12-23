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

  onSubmit(userLoginType: UserLoginType): void {
    console.log(' onSubmit - userLogin', userLoginType);

    this.authService.login(userLoginType);
    this.router.navigate(['']); // redirect to index page
  }
}
