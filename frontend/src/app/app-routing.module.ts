import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './@guards/auth-guard.service';
import {PublicGuardService} from './@guards/public-guard.service';

const routes: Routes = [
  { path: 'store',
    canActivate: [AuthGuardService],
    loadChildren: 'app/store/store.module#StoreModule' },
  { path: '',
    // canActivate: [PublicGuardService],
    loadChildren: 'app/landing/landing.module#LandingModule' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
