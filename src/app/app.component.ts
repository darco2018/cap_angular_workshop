import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginContainerComponent } from "./auth/login-container/login-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginContainerComponent],
  template: `
    <app-header 
      [header]="title" 
      (onLogoClick)="onTitleClick()"
    />
    <app-login-container></app-login-container>   
    <router-outlet />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Cost Evidence';

  onTitleClick() {
    console.log('Logo has been clicked.');
  }
}
