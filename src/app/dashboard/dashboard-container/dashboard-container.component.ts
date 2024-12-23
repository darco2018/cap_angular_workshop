import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { DashboardCategory } from '../models/dashboard-category.type';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-container',
  imports: [RouterModule, CommonModule],
  template: `
    <a [routerLink]="['/login']">Back to login</a>
    <!--  1st SOLUTION - grab data directly fro Observables plus use ngOnDestroy()
    <div *ngFor="let category of categoryList">
      {{ category | json }}
    </div> -->

    <!-- async returns values from Observables, The subscription gets CLOSED as well -->
    <div *ngFor="let category of categoriesList$ | async">
      {{ category | json }}
    </div>
    -->
  `,
  styleUrl: './dashboard-container.component.scss',
})
// 1st SOLUTION: implements OnDestroy
export class DashboardContainerComponent {

    // 2nd Solution:

    categoriesList$: Observable<DashboardCategory[]>;

    constructor(private dashboardService: DashboardService) {
      this.categoriesList$ = this.dashboardService.dashboardCategoryList$;
    }
  
    public ngOnInit(): void {
      this.dashboardService.fetchDashboardCategories();
    }


  // 1st SOLUTION - grab data directly fro Observables plus use ngOnDestroy()
  // private subscription?: Subscription;
  // categoryList: DashboardCategory[] = [];
  // constructor(private dashboardService: DashboardService) {}

  // // NECESSARY to avoid memory leaks: without it, when componenet is destroyed,
  // //the subscription is not
  // // But a better way to get data from Observables is to use async pipe
  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }

  // // when we load '', DASHBOARD_CATEGORIES_LIST is emitted
  // public ngOnInit(): void {
  //   this.dashboardService.fetchDashboardCategories();
  //   this.subscription = this.dashboardService.dashboardCategoryList$.subscribe((categories) => {
  //     console.log(
  //       'DashboardContainerComponent - ngOnInit - categories: ',
  //       categories
  //     );
  //     this.categoryList = [...categories];
  //   });
  // }


}
