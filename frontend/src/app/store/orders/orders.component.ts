import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../../models/order";
import {ApiService} from "../../@api/api.service";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../@services/loader.service";
import {HandleSocketService} from "../../@services/handle-socket.service";
import * as io from "socket.io-client";
import {Customer} from "../../models/customer";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order> = [];
  selectAll: boolean = false;
  searchKeys = ['id', 'customer', 'payment', 'fulfillment'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  ordersData: Array<Order> = [];
  originalOrdersData: Array<Order> = [];
  filterStatus = 'Any';

  order: Order;
  private socket: SocketIOClient.Socket;
  private namespace = '';
  private base_url = 'http://localhost:8000';

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private api: ApiService,
    private loaderService: LoaderService,
    private handleSocket: HandleSocketService
    ) {
    this.appService.pageTitle = 'Orders';

    this.base_url = this.handleSocket.getBaseUrl();
    this.namespace = this.handleSocket.getNameSpace();

    this.socket = io.connect(this.base_url + this.namespace);
    handleSocket.orderReceiver.subscribe( (order: Order) => {
      if(order.id) {
        this.orders = this.orders.filter(this_order => {
          return this_order.id !== order.id;
        });
        if(order.socket_state !== 'deleted') {
          this.orders.push(order);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.api.order.get().promise().then(resp => {
      this.orders = resp;
    })
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalOrdersData);

    this.totalItems = data.length;

    this.sort(data);
    this.ordersData = this.paginate(data);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.update();
  }

  selectAllOrders() {
    this.orders.forEach((order) => {
      order.selected = this.selectAll;
    })
  }

  deleteOrder(order_id) {
    this.loaderService.display(true);
    this.api.order.delete(order_id).promise().then(resp => {
      this.loaderService.display(false);
      console.dir('delete customer=> ', resp);
      this.orders = this.orders.filter(order => {
        return order.id !== order_id;
      })
    }).catch( e => {
      this.loaderService.display(false);
    })
  }
}

