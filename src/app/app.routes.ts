import { Routes } from '@angular/router';
import { LoginContainerComponent } from './auth/login-container/login-container.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { loginGuard } from './auth/login.guard';
import { dashboardCategoryResolver } from './dashboard/dashboard-category.resolver';

export const routes: Routes = [
  // { path: 'login', component: LoginContainerComponent },

  // used in 99% of projects because new way is very fresh
  // old way of LAZY LOADING using loadChildren(using auth.module & auth-routing.module and this below)
  // ONLY WHEN the user never navigates to the /login path, the AuthModule(containing import { AuthRoutingModule/LoginContainerComponent) will be loaded.
  // TO TEST IT:go to '', check no LoginContainerComponent in main.js, then go to /login,
  // check LoginContainerComponent appears in a chunk.js, also @angular_forms is loaded and some other files
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },

  // { path: '', component: DashboardContainerComponent, canActivate: [loginGuard] },
  // we are automatically redirected to /login if guard returns false

  // dashboard route po dodaniu LAZY LOADING (modern way)
  {
    path: '',
    canActivate: [loginGuard],
    resolve: [dashboardCategoryResolver],
    loadComponent: () =>
      import(
        './dashboard/dashboard-container/dashboard-container.component'
      ).then((module) => module.DashboardContainerComponent),
  },

  // wildcard ** - you are automatically redirected when you put somethong after http://localhost:4200/''
  { path: '**', redirectTo: 'login' },
];
