import { Routes } from '@angular/router';
import { LoginContainerComponent } from './auth/login-container/login-container.component';
import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { loginGuard } from './auth/login.guard';
import { dashboardCategoryResolver } from './dashboard/dashboard-category.resolver';

export const routes: Routes = [
  // EAGER LOADING 
  // { path: 'login', component: LoginContainerComponent },

  // LAZY LOADING ENTIRE MODULES:
 // (NOTE:  @defer block is NEW feature (angular 17) specifically designed for lazy loading STANDALONE components, not modules. 
//  So, the loadChildren property with dynamic imports remains the standard way to lazy load ENTIRE MODULES.)

  // LAZY LOADING entire modules:
  // ONLY WHEN the user never navigates to the /login path, the AuthModule - containing import to AuthRoutingModule,
  // which provides LoginContainerComponent - will be loaded.

  // TO TEST IT:go to '' and check that no LoginContainerComponent in main.js. Then go to /login,
  // check LoginContainerComponent appears in a chunk.js, also @angular_forms is loaded and some other files

  // Path Resolution
// When the user navigates to /login, the router loads the AuthModule.
// Inside the AuthModule, the AuthRoutingModule takes over.
// The AuthRoutingModule sees the empty path ('') and maps it to the LoginContainerComponent.
// So, the /login path in the main routing configuration effectively becomes /login/ within the AuthModule,
//  which matches the empty path ('') in the AuthRoutingModule and displays the LoginContainerComponent.

{
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },

  // { path: '', component: DashboardContainerComponent, canActivate: [loginGuard] },
  // we are automatically redirected to /login if guard returns false


  // LAZY LOAD STANDALONE components (modern way):
  // loadComponent is used -  the root path ('') will load the DashboardContainerComponent when the user navigates to this path
  {
    path: '',
    canActivate: [loginGuard],
    resolve: [dashboardCategoryResolver], // Once the resolver has fetched the data, the route is activated, and the component specified in loadComponent is loaded.
    // The resolver fetches the data after the loginGuard check but before the component is loaded.
    // load the component lazily:
    loadComponent: () =>
      import(
        './dashboard/dashboard-container/dashboard-container.component'
      ).then((module) => module.DashboardContainerComponent), // DashboardContainerComponent  is not @ngModule but @Copmponenet
  },

  // wildcard ** - you are automatically redirected when you put something after http://localhost:4200/''
  { path: '**', redirectTo: 'login' },
];
