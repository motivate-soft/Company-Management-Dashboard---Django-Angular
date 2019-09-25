import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ScriptLoaderService} from '../../@services/script-loader.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../@api/api.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {LoaderService} from '../../@services/loader.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrontpageComponent implements OnInit, AfterViewInit {
  hostname: string;
  registerForm: FormGroup;
  submitted = false;
  error: Array<any> = [];
  store_info = {
    email: null,
    password: null,
    store: null
  };
  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private _script: ScriptLoaderService,
    private formBuilder: FormBuilder,
    private route: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this._script.loadScripts('app-frontpage', ['assets/landing/jquery-3.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/popper.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/bootstrap.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/jquery_002.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/jquery.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/inspinia.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/pace.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/wow.js']);
    this._script.loadScripts('app-frontpage', ['assets/landing/landing-core.js']);

    this.hostname = window.location.hostname;

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      store: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,}')]]
    });
  }

  ngAfterViewInit() {
    console.log('render frontend finish');
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      // successDialog.show();
    }, (reason) => {
      // console.log('rejected');
    });
  }

  gotoLogin(c = null) {
    if ( c!== null) c('Cross click');
    if (this.hostname == 'localhost') {
      this.route.navigate(['login']);
    } else {
      this.loaderService.display(true);
      window.location.replace('http://account.dropify.net/login');
    }
  }

  get f() { return this.registerForm.controls; }

  signup(c) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("invalid");
      return;
    }
    this.loaderService.display(true);
    this.api.register.post(this.store_info).promise().then(resp => {
      this.route.navigate(['verify']);
      c('Cross click');
      this.loaderService.display(false);
    }).catch(e => {
      this.error['email'] = e.error.email ? e.error.email[0] : '';
      this.error['password'] = e.error.password? e.error.password[0] : '';
      console.log(this.error);
      console.log(e.error);
      this.loaderService.display(false);
    });
  }
}
