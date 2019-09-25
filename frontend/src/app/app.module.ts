import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// *******************************************************************************
// Libs

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ContextMenuModule } from 'ngx-contextmenu';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BlockUIModule } from 'ng-block-ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ThemeSettingsModule } from '../vendor/libs/theme-settings/theme-settings.module';
import {ScriptLoaderService} from './@services/script-loader.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LoaderService} from './@services/loader.service';


// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,

    // App
    AppRoutingModule,
    ThemeSettingsModule,

    // Libs
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-primary',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),

    // transalte
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

    ToastrModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'default btn-sm',
      confirmButtonType: 'primary btn-sm'
    }),
    BlockUIModule.forRoot(),
    ContextMenuModule.forRoot(),
    TourNgBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      /* NOTE: When using Google Maps on your own site you MUST get your own API key:
               https://developers.google.com/maps/documentation/javascript/get-api-key
               After you got the key paste it in the URL below. */
      apiKey: 'AIzaSyCHtdj4L66c05v1UZm-nte1FzUEAN6GKBI'
    }),
    BlockUIModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],

  providers: [
    Title,
    AppService,
    LoaderService,
    ScriptLoaderService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
