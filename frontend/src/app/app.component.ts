/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import { LoaderService } from "./@services/loader.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../vendor/libs/spinkit/spinkit.scss',
  ],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  @BlockUI() blockUIPage: NgBlockUI;
  @BlockUI('element') blockUIElement: NgBlockUI;
  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.router.events.subscribe(this.navigationInterceptor.bind(this));
  }


  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
        if (val) {
          this.blockUIPage.start();
        } else {
          this.blockUIPage.stop();
        }
    });
    this.loaderService.display(true);
  }

  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
      // Set loading state
      document.body.classList.add('app-loading');
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      // Remove loading state
      document.body.classList.remove('app-loading');

      // Remove initial splash screen
      this.loaderService.display(false);
    }
  }

}
