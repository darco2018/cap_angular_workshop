import { ResolveFn } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { inject } from '@angular/core';

// the function you assign to ResolveFn can return an Observable
export const dashboardCategoryResolver: ResolveFn<boolean> = (route, state) => {
  const dashboardService = inject(DashboardService);
  return dashboardService.fetchDashboardCategories();
};

// a resolver is used to PRE-FETCH data BEFORE navigating to a route. This ensures that 
// the necessary data is available as soon as the route is activated, improving the 
// user experience by avoiding loading indicators or incomplete views.
