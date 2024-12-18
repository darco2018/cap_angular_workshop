import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserLoginType } from '../userLogin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  imports: [MatInputModule, MatButtonModule, FormsModule, CommonModule],
})
export class LoginFormComponent {
  userLoginModel: UserLoginType = { password: '', username: '' };

  onLogin() {
    console.log('Login now...');
  }
}
