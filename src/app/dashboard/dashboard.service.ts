import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardCategory } from './models/dashboard-category.type';
import { DASHBOARD_CATEGORIES_LIST } from './constants/dashboard-categories';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _dashboardCategoryList$ = new BehaviorSubject<DashboardCategory[]>(
    []
  );
  dashboardCategoryList$ = this._dashboardCategoryList$.asObservable();

  // simulates httpClient API call
  public fetchDashboardCategories(): void {
    // executes code after delay - simulates http response delay here
    setTimeout(() => {
      console.log(
        'DashboardService - setTimeout - DASHBOARD_CATEGORIES_LIST:',
        DASHBOARD_CATEGORIES_LIST
      );
      this._dashboardCategoryList$.next([...DASHBOARD_CATEGORIES_LIST]); //  emit a new value to all subscribers of this observable
    }, 1000);
    //This uses the spread operator (...) to create
    //a shallow copy of the DASHBOARD_CATEGORIES_LIST array.
    //By emitting a copy, you ensure that the original array remains unchanged
    //even if the emitted array is modified by subscribers.
  }
}
