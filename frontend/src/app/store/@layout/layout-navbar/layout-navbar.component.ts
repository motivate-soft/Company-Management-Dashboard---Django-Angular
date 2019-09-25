import {Component, Input, HostBinding, OnInit} from '@angular/core';
import {StoreService} from '../../store.service';
import {LayoutService} from '../../@layout/layout.service';
import {AuthService} from "../../../@services/auth.service";
import {HandleSocketService} from "../../../@services/handle-socket.service";
import {SocketNotification} from "../../../models/notification";
import * as io from 'socket.io-client';
import {MeService} from "../../../@services/me.service";

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = false;
  newMsg = false;
  isRTL: boolean;
  notifications: SocketNotification[] = [];
  private socket: SocketIOClient.Socket;
  private namespace = '';
  private base_url = 'http://localhost:8000';

  socketActions = {};

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;

  constructor(
    private storeService: StoreService,
    private layoutService: LayoutService,
    private auth: AuthService,
    private me: MeService,
    private handleSocket: HandleSocketService
  ) {
    http://localhost:4200/store/orders/11/edit
    this.base_url = this.handleSocket.getBaseUrl();
    this.namespace = this.handleSocket.getNameSpace();

    this.socketActions = {
      'create_change_product': "updateProducts",
      'create_change_customer': "updateCustomers",
      'create_change_order': "updateOrders"
    };

    this.isRTL = storeService.isRTL;
    this.socket = io.connect(this.base_url + this.namespace);
    handleSocket.notificationReceiver.subscribe((notification: SocketNotification) => {
      if (notification.user) {
        this.newMsg = true;
        this.notifications.push(notification);
      }
    })
  }

  ngOnInit(): void {
    for (let event of Object.keys(this.socketActions)) {
      this.socket.on(event, (resp) => {
        if (this.me.user.id !== resp.data.user.id) {
          this["handleSocket"][this.socketActions[event]](resp);
        }
      });
    }

    this.socket.on('connect', function () {
      console.log("connect");
    });
    this.socket.on('disconnect', function () {
      console.log("disconnect");
    });
    this.socket.on('my response', function (msg) {
      console.log("my response");
    });
  }

  currentBg() {
    return `bg-${this.storeService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout() {
    this.auth.logout();
  }

  checkNewMsg() {
    this.newMsg = false;
  }
}
