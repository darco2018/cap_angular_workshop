import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar>
      <!-- onLogoClick.emit() inserted dirrectly in html without creating a separate method -->
      <span class="toolbar-logo" (click)="onLogoClick.emit()">{{
        header
      }}</span>
    </mat-toolbar>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) public header = '';
  @Output() onLogoClick = new EventEmitter<void>();
}
