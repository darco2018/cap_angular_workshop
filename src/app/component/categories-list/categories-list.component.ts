import { Component, inject, Input } from '@angular/core';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { CategoriesListItemComponent } from '../categories-list-item/categories-list-item.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  // MatDialog service is used to open dialogs.
  private readonly dialog: MatDialog = inject(MatDialog);

  // This is the non-null assertion operator in TypeScript. It tells the TypeScript compiler 
  //that the property will definitely be initialized before it is used, even though
  // it is not initialized at the point of declaration.
  private dialogRef!: MatDialogRef<AddCostFormComponent, any>;
  // dialogRef: A reference to the currently open dialog

  // void is redundant, you dont have to write return type
  // This method opens a dialog with the AddCostFormComponent component, 
  // passing the selected category as data. 
  // The data: category part in the openDialog method is used to pass data to 
  // the dialog component (AddCostFormComponent) when it is opened.
  //  This data is then accessible within the dialog component through dependency injection.
  //  In the AddCostFormComponent, you can access this data by injecting MAT_DIALOG_DATA:
  openDialog(category: DashboardCategory): void {
    this.dialogRef = this.dialog.open(AddCostFormComponent, {
      data: category,
    });

    // subscribes to the afterClosed event
   //  to perform an action when the dialog is closed ('Close' button is clicked)
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed:', result);
    });
  }

 
}
