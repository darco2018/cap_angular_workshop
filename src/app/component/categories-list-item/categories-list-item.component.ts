import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories-list-item',
  imports: [MatIconModule],
  template: `
   <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
   <h6>{{ category.title }} </h6>
  `,
  styleUrl: './categories-list-item.component.scss'
})
export class CategoriesListItemComponent {
  @Input({required: true}) category!: DashboardCategory;

  @Output() categoryClicked = new EventEmitter<DashboardCategory>();

  @HostBinding('style.color') get color(){
    return this.category.color;
  }

  @HostListener('click', ['$event.target'])
  hostClicked(): void {
    console.log('- hostclicked', this.hostClicked);
  this.categoryClicked.emit(this.category);
  }
}
