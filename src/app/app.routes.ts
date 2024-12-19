import { Routes } from '@angular/router';
import { LoginContainerComponent } from './auth/login-container/login-container.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';

export const routes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  { path: '', component: DashboardContainerComponent }
];
