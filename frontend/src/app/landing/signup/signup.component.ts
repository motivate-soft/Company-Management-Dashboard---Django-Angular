import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../@api/api.service';
import {LoaderService} from '../../@services/loader.service';
import {AuthService} from '../../@services/auth.service';
import {ScriptLoaderService} from "../../@services/script-loader.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  hostname: string;
  submitted = false;
  error: Array<any> = [];
  store_info = {
    email: null,
    password: null,
    store: null
  };

  constructor(
    private api: ApiService,
    private loaderService: LoaderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
    this.hostname = window.location.hostname;

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      store: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,}')]]
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      store: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,}')]]
    });
  }

  get f() { return this.registerForm.controls; }

  gotoLogin() {
    if (this.hostname == 'localhost') {
      this.route.navigate(['login']);
    } else {
      this.loaderService.display(true);
      window.location.replace('http://account.dropify.net/login');
    }
  }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loaderService.display(true);
    this.api.register.post(this.store_info).promise().then(resp => {
      this.route.navigate(['verify']);
      this.loaderService.display(false);
    }).catch(e => {
      this.error['email'] = e.error.email ? e.error.email[0] : '';
      this.error['password'] = e.error.password? e.error.password[0] : '';
      this.loaderService.display(false);
    });
  }
  back() {
    window.location.replace('http://dropify.net');
  }

}
