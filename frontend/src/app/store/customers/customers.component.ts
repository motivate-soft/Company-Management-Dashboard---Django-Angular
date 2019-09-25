import {Component, HostBinding, OnInit} from '@angular/core';
import {ApiService} from "../../@api/api.service";
import {Customer} from "../../models/customer";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoaderService} from "../../@services/loader.service";
import {MeService} from "../../@services/me.service";
import {HandleSocketService} from "../../@services/handle-socket.service";
import * as io from "socket.io-client";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  @HostBinding('class') private hostClasses = 'd-flex flex-grow-1 align-items-stretch';
  selected: any = null;
  sideboxOpened = false;
  customers: Customer[];
  customer: Customer; //selected customer for edit/update

  private socket: SocketIOClient.Socket;
  private namespace = '';
  private base_url = 'http://localhost:8000';

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private loaderService: LoaderService,
    private me: MeService,
    private handleSocket: HandleSocketService
  ) {
    this.base_url = this.handleSocket.getBaseUrl();
    this.namespace = this.handleSocket.getNameSpace();

    this.socket = io.connect(this.base_url + this.namespace);
    handleSocket.customerReceiver.subscribe( (customer: Customer) => {
      if(customer.id) {
        this.customers = this.customers.filter(this_customer => {
          return this_customer.id !== customer.id;
        });
        if(customer.socket_state !== 'deleted') {
          this.customers.push(customer);
        }
      }
    })
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.loaderService.display(true);
    this.api.customer.get().promise().then(resp => {
      this.loaderService.display(false);
      this.customers = resp;
    }).catch(e => {
      this.loaderService.display(false);
    })
  }

  edit(content, customer, options = {}) {
    this.customer = customer;
    this.modalService.open(content, options).result.then((result) => {

    }, (reason) => {
      // console.log('rejected');
    });
  }

  open(content, options = {}) {
    this.customer = new Customer();
    this.modalService.open(content, options).result.then((result) => {

    }, (reason) => {
      // console.log('rejected');
    });
  }

  delete(customer_id) {
    this.loaderService.display(true);
    this.api.customer.delete(customer_id).promise().then(resp => {
      this.loaderService.display(false);
      console.dir('delete customer=> ', resp);
      this.customers = this.customers.filter(customer => {
        return customer.id !== customer_id;
      })
    }).catch(e => {
      this.loaderService.display(false);
    })
  }

  close(c) {
    c('Cross click');
  }

  updateCustomer(customer: Customer, c) {
    this.loaderService.display(true);
    this.api.customer.update(customer).promise().then(resp => {
      this.loaderService.display(false);
      console.dir('update custoemr=> ', resp);
      c('Cross click');
    }).catch(e => {
      this.loaderService.display(false);
      c('Cross click');
    })
  }

  createCustomer(customer: Customer, c) {
    this.loaderService.display(true);
    customer.owner = this.me.user.id;
    this.api.customer.post(customer).promise().then(resp => {
      this.loaderService.display(false);
      this.customers.push(resp);
      c('Cross click');
    }).catch(e => {
      this.loaderService.display(false);
      c('Cross click');
    })
  }


  selectClient(customer) {
    this.selected = customer;
    this.sideboxOpened = true;
  }

}
