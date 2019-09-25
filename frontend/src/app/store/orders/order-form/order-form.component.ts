import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from "../../../app.service";
import {Variation} from "../../../models/variation";
import {ApiService} from "../../../@api/api.service";
import {Order} from "../../../models/order";
import {MeService} from "../../../@services/me.service";
import {LoaderService} from "../../../@services/loader.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HandleSocketService} from "../../../@services/handle-socket.service";

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  products: Array<Variation> = [];
  addedProducts: Array<Variation> = [];
  order: Order = new Order();
  tax: number = 0;
  constructor(
    private router: Router,
    private api: ApiService,
    private appService: AppService,
    private http: HttpClient,
    private me: MeService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
  ) {
    this.appService.pageTitle = 'Create order';
    this.loadProducts();
    this.order.owner = this.me.user.id;
  }

  ngOnInit() {
    this.getOrder();
  }

  loadProducts() {
    this.http.get('assets/json/pages_e-commerce_product-list.json')
      .subscribe((data: any) => {
        this.products = data.slice(0);

        // this.addedProducts = data.slice(0);
      });
  }
  selectProduct(variations) {
    variations.forEach(variation => {
      let is_exist = false;
      this.addedProducts.forEach(product => {
        if (product.id === variation.id) {
          is_exist = true;
          product.amount += variation.amount;
        }
      });
      if (!is_exist) {
        this.addedProducts.push(variation);
      }
    });
  }

  getOrder() {
    let orderId = this.route.snapshot.params['id'];
    if (orderId) {
      this.loaderService.display(true);
      this.api.order.getOrder(orderId).promise().then(resp => {

        this.loaderService.display(false);
        if(resp.length === 0) {
          window.history.back();
          return;
        }

        this.order = resp[0];
        this.addedProducts = resp[0].products_info || [];
        this.order.customer = resp[0].customer_info.id;

        let amounts = resp[0].amounts;
        this.addedProducts.forEach((product, index) => {
          product.amount = amounts[index];
        });
      })
    }
  }
  removeProduct(id) {
    this.addedProducts = this.addedProducts.filter((variation, index, arr) => {
      return variation.id !== id;
    })
  }

  calcTotal() {
    let subTotal = 0;
    let total = 0;
    this.addedProducts.forEach(variation => {
      subTotal += variation.amount * variation.price;
    });
    total = Math.max(0, subTotal - this.tax);

    this.order.total_price = total;
    this.order.total_tax = 0;

    return [subTotal, total];
  }

  selectCustomer(customer) {
    console.log(customer);
    this.order.customer = customer.id;
  }

  submit() {
    let products = [];
    let amounts = [];
    this.addedProducts.forEach(product => {
      products.push(product.id);
      amounts.push(product.amount);
    });
    this.order.products = products;
    this.order.amounts = amounts;
    this.loaderService.display(true);
    if(this.order.id) {
      this.api.order.update(this.order).promise().then(resp => {
      this.loaderService.display(false);
      this.router.navigate(['/store/orders'])
    })
    } else {
      this.api.order.post(this.order).promise().then(resp => {
      this.loaderService.display(false);
      this.router.navigate(['/store/orders'])
    })
    }

  }
}
