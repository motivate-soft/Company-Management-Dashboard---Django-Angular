import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../layout.service';
import {ApiService} from "../../../@api/api.service";

@Component({
  selector: 'app-layout-2',
  templateUrl: './layout-2.component.html',
  styles: [':host { display: block; }', ':host /deep/ .layout-loading .sidenav-link { transition: none !important; }']
})
export class Layout2Component implements AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  public initialized = false;
  orderAmount: number = null;
  constructor(
    private layoutService: LayoutService,
    private api: ApiService
  ) {
    this.getOrderAmount();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized = true;
      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  getOrderAmount() {
    this.api.order.getAmount().promise().then(resp => {
      this.orderAmount = resp;
    })
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }

  closeSidenav() {
    setTimeout(() => {
      this.layoutService.setCollapsed(true);
    });
  }
}
