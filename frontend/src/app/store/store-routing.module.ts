import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {Layout2Component} from './@layout/layout-2/layout-2.component';
import {OrdersComponent} from "./orders/orders.component";
import {ProductsComponent} from "./products/products.component";
import {SettingsComponent} from "./settings/settings.component";
import {FeaturesComponent} from "./features/features.component";
import {CustomersComponent} from "./customers/customers.component";
import {GeneralSettingComponent} from "./general-setting/general-setting.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {FeatureItemComponent} from "./features/feature-item/feature-item.component";
import {OrderFormComponent} from "./orders/order-form/order-form.component";

const routes: Routes = [
  {
    path: '',
    component: Layout2Component,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/create', component: OrderFormComponent },
      { path: 'orders/:id/edit', component: OrderFormComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'general-settings', component: GeneralSettingComponent },
      { path: 'account-settings', component: AccountsComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'features/:id', component: FeatureItemComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule { }
