import { Component, Input } from '@angular/core';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { CategoriesListItemComponent } from '../categories-list-item/categories-list-item.component';
import { CommonModule } from '@angular/common';
import { DASHBOARD_CATEGORIES_LIST } from '../../dashboard/constants/dashboard-categories';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, CategoriesListItemComponent],
  template: `
    @for(category of categoriesList; track category.title){
      <div class="flex-container">
        <app-categories-list-item [category]="category" />
      </div>
    } @empty { 
      <h4>There are no items</h4>
    }
  `,
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {

  @Input({ required: true}) 
  categoriesList: DashboardCategory[] = [];

}
