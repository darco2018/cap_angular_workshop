import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './login-container/login-container.component';

const routes: Routes = [{
  path: '', component: LoginContainerComponent,
}];

// new way of adding routes is in app.config
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
