import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './login-container/login-container.component';

// loadChildren is used when the module has its own routing configuration.
const routes: Routes = [{
  path: '', component: LoginContainerComponent,
}];

// new way of adding routes is in app.config
// The AuthRoutingModule is responsible for defining the routes specific to the AuthModule.
@NgModule({
  imports: [RouterModule.forChild(routes)], // used to register these routes with Angular’s router.
  exports: [RouterModule],
})
export class AuthRoutingModule {}
