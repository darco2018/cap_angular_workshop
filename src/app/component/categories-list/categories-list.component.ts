import { Component, inject, Input } from '@angular/core';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { CategoriesListItemComponent } from '../categories-list-item/categories-list-item.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCostFormComponent } from '../add-cost-form/add-cost-form.component';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, CategoriesListItemComponent],
  template: `
    @for(category of categoriesList; track category.title){
    <div class="flex-container">
      <app-categories-list-item
        [category]="category"
        (categoryClicked)="openDialog($event)"
      />
    </div>
    } @empty {
    <h4>There are no items</h4>
    }
  `,
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent {
  @Input({ required: true })
  categoriesList: DashboardCategory[] = [];

  private readonly dialog: MatDialog = inject(MatDialog);

  // void is redundant, you dont have to write return type
  openDialog(category: DashboardCategory): void {
    console.log('openDialog: ', category);
    this.dialog.open(AddCostFormComponent, { data: category});
  }
}
