import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app.service";
import {ApiService} from '../../@api/api.service';
import {LoaderService} from '../../@services/loader.service';
import {MeService} from "../../@services/me.service";
import {User} from "../../models/user";
import {AuthService} from "../../@services/auth.service";
import {LoginHistory} from "../../models/login_history";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/styles/pages/account.scss',
    './accounts.component.scss']

})
export class AccountsComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileFormSubmitted = false;
  passwordFormSubmitted = false;

  user: User;
  userTempData: User;
  editable: boolean;
  curTab = 'acc_info';
  login_history: Array<LoginHistory> = [];

  current_password = '';
  new_password = '';
  repeat_password = '';
  reset_auth= {
    current_password: null,
    new_password: null
  };

  cur_password_error = '';
  new_password_error = '';
  constructor(
    private appService: AppService,
    private api: ApiService,
    private me: MeService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder
  ) {
    this.appService.pageTitle = 'Account settings - Pages';
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
    this.passwordForm = this.formBuilder.group({
        current_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
        repeat_password: ['']
      },
      {validator: this.checkPasswordMatch});

    this.editable = false;
    this.setUser(this.me.user);
    this.loadLoginHistory();
  }

  checkPasswordMatch(formGroup: FormGroup) {
    let newPass = formGroup.controls.new_password.value;
    let confirmPass = formGroup.controls.repeat_password.value;
    return newPass === confirmPass ? formGroup.controls.repeat_password.setErrors(null) : formGroup.controls.repeat_password.setErrors({not_match: true})
  }

  get pf() {
    return this.profileForm.controls;
  }

  get cp() {
    return this.passwordForm.controls;
  }

  setUser(user) {
    this.user = user;
    this.user.photo = '5-small.png';
    this.userTempData = Object.assign({}, this.user);
  }

  loadLoginHistory() {
    this.api.history.get().promise().then(resp => {
      this.login_history = resp;
    })
  }

  onAccountEdit() {
    if (this.editable) {
      this.profileFormSubmitted = true;
      console.log('preparing submit', this.profileForm.invalid);
      if (this.profileForm.invalid) {
        return;
      }
      this.updateProfile();
    } else {
      this.editable = true;
    }
  }

  onCancelAccountEdit() {
    this.editable = false;
    this.userTempData = Object.assign({}, this.user);
  }

  onSaveChangePassword() {
    this.passwordFormSubmitted = true;
    console.log('preparing change password', this.passwordForm.invalid);
    if (this.passwordForm.invalid) {
      return;
    }
    this.changePassword();
  }

  onCancelChangePassword() {
    this.current_password = '';
    this.new_password = '';
    this.repeat_password = '';
  }

  updateProfile() {
    this.loaderService.display(true);
    console.log('submitting');
    this.api.me.put(this.userTempData).promise()
      .then(user => {
        this.setUser(user);
        this.editable = false;
        this.loaderService.display(false);
        return true;
      })
      .catch((error) => {
        this.loaderService.display(false);
        console.dir("update user error=>", error);
      });
  }

  changePassword() {
    this.loaderService.display(true);
    this.reset_auth.current_password = this.current_password;
    this.reset_auth.new_password = this.new_password;

    this.api.me.resetPassword(this.reset_auth).promise()
      .then(token => {
        this.loaderService.display(false);
        this.reset();
      }).catch(e => {
        this.loaderService.display(false);
        this.reset();
        this.cur_password_error = e.error.current_password ? e.error.current_password[0] : '';
        this.new_password_error = e.error.new_password ? e.error.new_password[0] : '';
      });
    console.log('changing password');
  }

  reset() {
    this.passwordFormSubmitted = false;
    this.new_password = null;
    this.current_password = null;
    this.repeat_password = null;
  }


}
