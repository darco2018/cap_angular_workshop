import { Routes } from '@angular/router';
import { LoginContainerComponent } from './auth/login-container/login-container.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { loginGuard } from './auth/login.guard';

export const routes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  { path: '', component: DashboardContainerComponent, canActivate: [loginGuard] },
  // we are automatically redirected to /login if guard returns false

  // wildcard ** - you are automatically redirected when you put somethong after http://localhost:4200/''
  {path: '**', redirectTo: 'login'}
  
];
