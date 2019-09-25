import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {AppService} from '../app.service';
import {LayoutService} from './@layout/layout.service';
import {LoaderService} from "../@services/loader.service";
import {HandleSocketService} from "../@services/handle-socket.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

constructor(
  private router: Router,
  private appService: AppService,
  private layoutService: LayoutService,
  private loaderService: LoaderService,
  private handleSocket: HandleSocketService
) {

    // Subscribe to router events to handle page transition
    // Disable animations and transitions in IE10 to increase performance
    if (typeof document['documentMode'] === 'number' && document['documentMode'] < 11) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
      document.head.appendChild(style);
    }
  }

  ngOnInit(): void {

  }
}
