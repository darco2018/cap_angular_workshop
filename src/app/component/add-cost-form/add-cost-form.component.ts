import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  CategoryWithCost,
  DashboardCategory,
} from '../../dashboard/models/dashboard-category.type';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-cost-form',
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  template: `
    <h2 mat-dialog-title>Add {{ category.title }}</h2>
    <mat-dialog-content>
      <!-- The fontIcon input is part of Angular Material’s <mat-icon> component. It is used to specify 
        the icon to be displayed when using a font-based icon set, such as Material Icons or FontAwesome. -->
      <mat-icon
        aria-hidden="false"
        aria-label="Example icon"
        [fontIcon]="category.icon"
        [ngStyle]="iconStyle"
        >{{ category.icon }}</mat-icon
      >
      <!-- reactive form -->
      <form [formGroup]="costForm">
        <mat-form-field>
          <mat-label>Cost</mat-label>
          <input type="number" matInput name="cost" formControlName="cost" />
          <!-- validation not really working as the error appears when only when a button is pressed -->
          <mat-error
            *ngIf="
              costForm.get('cost')?.hasError('min') &&
              costForm.get('cost')?.touched
            "
          >
            Cost must be greater than or equal to 0
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="saveCost()">Add cost</button>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
    <!-- mat-dialog-close -	[Attr] Added to a <button>, makes the button close the dialog with an optional result from the bound value. -->
  `,
  styleUrl: './add-cost-form.component.scss',
})

// represents modal dialog
export class AddCostFormComponent {
  costForm = new FormGroup({
    cost: new FormControl<number | undefined>(undefined, [Validators.min(0)]),
    subcategory: new FormControl(''),
  });

  public iconStyle: { color: string };

  constructor(
    // 2nd param defines the type that .dialogRef.close returns
    public dialogRef: MatDialogRef<AddCostFormComponent, CategoryWithCost>,
    @Inject(MAT_DIALOG_DATA) public category: DashboardCategory
  ) {
    this.iconStyle = {
      color: this.category.color,
    };
  }

  public saveCost(): void {
    // the value that this method returns is visible in the console
    this.dialogRef.close({ category: this.category, cost: this.getCost() }); // close(CategoryWithCost)
  }

  public getCost(): number {
    return this.costForm.get('cost')!.value as number; // casting
  }
}
