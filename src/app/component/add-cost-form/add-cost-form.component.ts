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
import { CategoryWithCost, DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  MinValidator,
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
    
    // This parameter is an instance of MatDialogRef, which is used to reference the dialog opened by Angular Material’s MatDialog service.
    // The generic types AddCostFormComponent and CategoryWithCost specify 
    //    the component associated with the dialog and the type of data returned when the dialog is closed ( the type that .dialogRef.close returns), respectively.
    public dialogRef: MatDialogRef<AddCostFormComponent, CategoryWithCost>, // first parameter
    
    
    // @Inject(MAT_DIALOG_DATA is an argument to the @Inject decorator                 (const MAT_DIALOG_DATA: InjectionToken<any>)
    // It tells Angular to inject the data associated with the MAT_DIALOG_DATA token into the category parameter.
    // public category: DashboardCategory is the parameter that will receive the injected value.
                      @Inject(MAT_DIALOG_DATA) public category: DashboardCategory) //constructor's second parameter: a single parameter with an argument. 
    {
        this.iconStyle = {
          color: this.category.color, //DashboardCategory has title, color, icon props
        };
  }

  public saveCost(): void {
    // the value that this method returns is visible in the console
    this.dialogRef.close({category: this.category, cost: this.getCost()}); // close(CategoryWithCost) = in brackets is  'optional result to return to the dialog opener'
  }

  public getCost(): number {
    // .get(controls name) - Retrieves a child control 
    return this.costForm.get('cost')!.value as number; // casting
  }
}
