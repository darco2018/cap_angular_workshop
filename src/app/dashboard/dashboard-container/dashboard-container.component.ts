import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { DashboardCategory } from '../models/dashboard-category.type';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  interval,
  map,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { CategoriesListComponent } from '../../component/categories-list/categories-list.component';

@Component({
  selector: 'app-dashboard-container',
  imports: [RouterModule, CommonModule, CategoriesListComponent],
  template: `
    <a [routerLink]="['/login']">Back to login</a>
    <!--  1st SOLUTION - grab data directly fro Observables plus use ngOnDestroy()
    <div *ngFor="let category of categoryList">
      {{ category | json }}
    </div> -->

    <!-- async returns values from Observables, The subscription gets CLOSED as well 
    <div *ngFor="let category of categoriesList$ | async">
      {{ category | json }}
    </div>  
    -->
    <app-categories-list [categoriesList]="categoriesList"></app-categories-list>
  `,
  styleUrl: './dashboard-container.component.scss',
})
// 1st SOLUTION: implements OnDestroy
export class DashboardContainerComponent {
  // 2nd Solution:

  categoriesList$: Observable<DashboardCategory[]>;
  categoriesList: DashboardCategory[] = [];

  constructor(private dashboardService: DashboardService) {
    this.categoriesList$ = this.dashboardService.dashboardCategoryList$;

    this.categoriesList$.subscribe((categories) => {
      this.categoriesList = categories;
    });
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

// <input type="text" #v/>
// <button (click)="click$.next(v.value)">Click me</button>

// click$ = new Subject<string>();

// this.click$.subscribe(v => console.log( 'v' , v));

// // each time Observable's value is fired
// of(1, 2, 3)
// .pipe(map(v => v*v)) // map is an operator; more of them on b.next(11);
// .subscribe((value: number) => console.log(value));

// const b = new BehaviorSubject<number>(10);
// b.subscribe((n) =>
// console.log(n)); // the numbers below get logged
// b.next(11);
// b.next(12);
// b.next(13);
// b.next(14);

// interval(1000) // Emits incremental numbers periodically in time.
// .pipe(map(v => v*v)) // map is an operator; more of them on b.next(11);
// .subscribe((value: number) => console.log(value));
