import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories-list-item',
  imports: [MatIconModule],
  template: `
   <mat-icon class="flex-item" aria-hidden="false" aria-label="Example home icon" >{{ category.icon }}</mat-icon>
   <h6>{{ category.title }} </h6>
  `,
  styleUrl: './categories-list-item.component.scss'
})
export class CategoriesListItemComponent {
  @Input({required: true}) category!: DashboardCategory;

  @Output() categoryClicked = new EventEmitter<DashboardCategory>();

  // get color() method returns the 'color' property of the 'categor'y object.
  // the decorator binds the return value of this getter to the color style of the host element.
  // This value is then used to set the text color of the host element.
  // all HTML elements have css:    color: givenColor
  @HostBinding('style.color') get color(){        // replaces [style.color]="category.color"  ; [value]="myValue"
    return this.category.color;
  }

  // Listens for click events on the host element
  // replaces <mat-icon (click)="hostClicked() ... and <h6 (click)="hostClicked()   ; (click)="myClick()"
  @HostListener('click', ['$event.target'])
  hostClicked(): void {
    console.log('- hostclicked', this.hostClicked);
  this.categoryClicked.emit(this.category);
  }
}
