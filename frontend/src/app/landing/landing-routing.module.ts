
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FrontpageComponent} from './frontpage/frontpage.component';
import {LandingComponent} from './landing.component';
import {VerifyComponent} from './verify/verify.component';
import {LoginComponent} from './login/login.component';
import {PendingPageComponent} from "./pending-page/pending-page.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: FrontpageComponent,
      },
      {
        path: 'redirect',
        component: PendingPageComponent,
      },
      {
        path: 'verify',
        component: VerifyComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule { }
