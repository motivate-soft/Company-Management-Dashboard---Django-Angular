import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../@api/api.service';
import {LoaderService} from '../../@services/loader.service';
import {AuthService} from '../../@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  hostname: string;
  subdomain_name: string;
  unknown_user: boolean = false;
  store_info = {
    email: null,
    password: null,
    store: null
  };
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.hostname = window.location.hostname;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      store: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,}')]]
    });
  }

  get f() { return this.registerForm.controls; }

  gotoSignUp() {
    if (this.hostname == 'localhost') {
      this.router.navigate(['signup']);
    } else {
      this.loaderService.display(true);
      window.location.replace('http://account.dropify.net/signup');
    }
  }

  login() {
    this.loaderService.display(true);
    this.api.login.post(this.store_info).promise()
      .then(token => {
        if (this.hostname === 'localhost') {
          this.subdomain_name = 'http://localhost:4200/redirect?token=' + token.token;
        } else {
          this.subdomain_name = 'http://' + this.store_info.store + '.dropify.net/redirect?token=' + token.token;
        }
        window.location.replace(this.subdomain_name);
      }).catch(e => {
        this.loaderService.display(false);
        this.unknown_user = true;
      });
  }
  back() {
    window.location.replace('http://dropify.net');
  }

}
