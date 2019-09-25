import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreRoutingModule} from './store-routing.module';
import { StoreComponent} from './store.component';
import { LayoutModule} from './@layout/layout.module';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { FeaturesComponent } from './features/features.component';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { NouisliderModule} from "ng2-nouislider";
import { FormsModule as NgFormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule} from "@ng-select/ng-select";
import { HttpClientModule} from "@angular/common/http";
import { QuillModule} from "../../vendor/libs/quill/quill.module";
import { PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { TagInputModule} from "ngx-chips";
import { SortablejsModule} from "angular-sortablejs";
import { CustomersComponent } from './customers/customers.component';
import { DropzoneModule} from "ngx-dropzone-wrapper";
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { AddNewMemberComponent } from './general-setting/add-new-member/add-new-member.component';
import { AccountsComponent } from './accounts/accounts.component';
import {SearchProductComponent} from "./search-product/search-product.component";
import {ListModalComponent} from "./search-product/list-modal/list-modal.component";
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { FeatureItemComponent } from './features/feature-item/feature-item.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

@NgModule({
  declarations: [
    StoreComponent,
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    SettingsComponent,
    FeaturesComponent,
    CustomersComponent,
    GeneralSettingComponent,
    AddNewMemberComponent,
    AccountsComponent,
    SearchProductComponent,
    ListModalComponent,
    SearchCustomerComponent,
    FeatureItemComponent,
    CustomerFormComponent,
    OrderFormComponent,
    ProductFormComponent],

  imports: [
    NgSelectModule,
    DropzoneModule,
    ReactiveFormsModule,
    NouisliderModule,
    NgbModule,
    NgFormsModule,
    NouisliderModule,
    Ng2ChartsModule,
    CommonModule,
    LayoutModule,
    StoreRoutingModule,
    CommonModule,
    NgFormsModule,
    HttpClientModule,
    // Libs
    NouisliderModule,
    NgSelectModule,
    QuillModule,
    SortablejsModule,
    TagInputModule,
    PerfectScrollbarModule,
  ]
})
export class StoreModule { }
