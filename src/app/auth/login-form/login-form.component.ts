import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { UserLoginType } from '../userLogin';
import { CommonModule } from '@angular/common';
import { ValidatorsModule } from '../../validators/validators.module';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ValidatorsModule,
  ],
})
export class LoginFormComponent {
  // @ViewChild property decorator will look for the element with thie template reference
  // 'loginForm' and assign it to the property 'loginForm'
  @ViewChild('loginForm') loginForm!: NgForm;

  userLoginType: UserLoginType = { password: '', username: '' };
  @Output() onSubmit = new EventEmitter<UserLoginType>();

  onLogin(): void {
    console.log('Login now...');

    //alternative way of getting values from the controls
    // const password = this.loginForm.controls['password']?.value;
    this.onSubmit.emit(this.userLoginType);
    this.loginForm.resetForm();
  }

  isPasswordControlDirty(): boolean {
    return this.loginForm?.controls['password']?.dirty ?? false;
  }
}
