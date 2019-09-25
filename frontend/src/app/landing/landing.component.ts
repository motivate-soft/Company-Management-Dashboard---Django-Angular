import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoaderService} from "../@services/loader.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";
import {AppService} from "../app.service";
import {LayoutService} from "../store/@layout/layout.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) {
    // Subscribe to router events to handle page transition
    this.router.events.subscribe(this.navigationInterceptor.bind(this));
  }

  ngOnInit() {
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
      const splashScreen = document.querySelector('.app-splash-screen');
      if (splashScreen) {
        splashScreen['style'].opacity = 0;
        setTimeout(() => splashScreen && splashScreen.parentNode.removeChild(splashScreen), 300);
      }
    }
  }
}
