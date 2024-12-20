import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ],
  template: `
    <app-header 
      [header]="title" 
      (onLogoClick)="onTitleClick()"
    />
   
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
