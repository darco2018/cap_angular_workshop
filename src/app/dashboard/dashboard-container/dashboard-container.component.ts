import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { DashboardCategory } from '../models/dashboard-category.type';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-container',
  imports: [RouterModule, CommonModule],
  template: `
    <a [routerLink]="['/login']">Back to login</a>

    
    <div *ngFor="let category of categoryList">
      {{ category | json }}
    </div>
  `,
  styleUrl: './dashboard-container.component.scss',
})
export class DashboardContainerComponent implements OnDestroy {
  private subscription?: Subscription;
  categoryList: DashboardCategory[] = [];
  constructor(private dashboardService: DashboardService) {
    //this.ngOnInit();
  }

  // NECESSARY to avoid memory leaks: without it, when componenet is destroyed, 
  //the subscription is not 
  // But a better way to get data from Observables is to use async pipe
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // when we load '', DASHBOARD_CATEGORIES_LIST is emitted
  public ngOnInit(): void {
    this.dashboardService.fetchDashboardCategories();
    this.subscription = this.dashboardService.dashboardCategoryList$.subscribe((categories) => {
      console.log(
        'DashboardContainerComponent - ngOnInit - categories: ',
        categories
      );
      this.categoryList = [...categories];
    });
  }
}
