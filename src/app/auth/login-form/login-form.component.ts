import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  imports: [MatInputModule, MatButtonModule],
})
export class LoginFormComponent {

}
