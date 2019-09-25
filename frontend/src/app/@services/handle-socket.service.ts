import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SocketNotification} from "../models/notification";
import {User} from "../models/user";
import {Product} from "../models/product";
import {Customer} from "../models/customer";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class HandleSocketService {
  private notification: SocketNotification;
  private user: User;

  private product: Product;
  private customer: Customer;
  private order: Order;

  private notificationContainer = new BehaviorSubject({});
  notificationReceiver = this.notificationContainer.asObservable();

  private productContainer = new BehaviorSubject({});
  productReceiver = this.productContainer.asObservable();

  private customerContainer = new BehaviorSubject({});
  customerReceiver = this.customerContainer.asObservable();

  private orderContainer = new BehaviorSubject({});
  orderReceiver = this.orderContainer.asObservable();

  constructor() {
  }

  getNameSpace() {
    return '/test';
  }
  getBaseUrl() {
    let base_url = 'http://localhost:8000';
    let hostname = window.location.hostname;
    if (hostname !== 'localhost') {
      base_url = hostname;
    }
    return base_url;
  }
  updateProducts(resp: any) {
    this.user = resp.data.user;
    this.product = resp.data.product;
    this.product.socket_state = resp.data.state;

    this.notification = new SocketNotification();
    this.notification.user = this.user.email;
    if (this.product.socket_state == 'created') {
      this.notification.content = 'New Product ' + this.product.name + ' has been added.';
    } else if (this.product.socket_state == 'updated') {
      this.notification.content = 'Product ' + this.product.name + ' has been updated.';

    } else if (this.product.socket_state == 'deleted') {
      this.notification.content = 'Product ' + this.product.name + ' has been deleted.';
    }
    this.notificationContainer.next(this.notification);
    this.productContainer.next(this.product);
  }

  updateCustomers(resp: any) {
    this.user = resp.data.user;
    this.customer = resp.data.customer;
    this.customer.socket_state = resp.data.state;

    this.notification = new SocketNotification();
    this.notification.user = this.user.email;
    if (this.customer.socket_state == 'created') {
      this.notification.content = 'New Customer ' +  this.customer.first_name + ' ' + this.customer.last_name + ' has been added.';
    } else if (this.customer.socket_state == 'updated') {
      this.notification.content = 'Customer ' + this.customer.first_name + ' ' + this.customer.last_name + ' has been updated.';

    } else if (this.customer.socket_state == 'deleted') {
      this.notification.content = 'Customer ' + this.customer.first_name + ' ' + this.customer.last_name + ' has been deleted.';
    }
    this.notificationContainer.next(this.notification);
    this.customerContainer.next(this.customer);
  }

  updateOrders(resp: any) {
    this.user = resp.data.user;
    this.order = resp.data.order;
    this.order.socket_state = resp.data.state;

    this.notification = new SocketNotification();
    this.notification.user = this.user.email;
    if (this.order.socket_state == 'created') {
      this.notification.content = 'New Order ' + ' has been added.';
    } else if (this.order.socket_state == 'updated') {
      this.notification.content = 'Order#' + this.order.id + ' has been updated.';

    } else if (this.order.socket_state == 'deleted') {
      this.notification.content = 'Order# ' + this.order.id + ' has been deleted.';
    }
    this.notificationContainer.next(this.notification);
    this.orderContainer.next(this.order);
  }

}
