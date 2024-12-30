import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DashboardCategory } from '../../dashboard/models/dashboard-category.type';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-cost-form',
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatIconModule,
    CommonModule
  ],
  template: `
    <h2 mat-dialog-title>Add {{ category.title }}</h2>
    <mat-dialog-content>
      <mat-icon
        aria-hidden="false"
        aria-label="Example icon"
        [fontIcon]="category.icon"
        [ngStyle]="iconStyle"
        >{{ category.icon }}</mat-icon
      >
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button>Add cost</button>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styleUrl: './add-cost-form.component.scss',
})
export class AddCostFormComponent {
  public iconStyle: { 'color': string };

  constructor(@Inject(MAT_DIALOG_DATA) public category: DashboardCategory) {
    this.iconStyle = {
      'color': this.category.color,
    };
  }
}
