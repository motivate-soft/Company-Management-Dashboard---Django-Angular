import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {ApiService} from '../../@api/api.service';
import {LoaderService} from '../../@services/loader.service';
import {MeService} from "../../@services/me.service";
import {User} from "../../models/user";
import {AuthService} from "../../@services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Member} from "../../models/member";

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/styles/pages/account.scss',
    './general-setting.component.scss'
  ]
})
export class GeneralSettingComponent implements OnInit {
  user: User;
  userTempData: User;
  editable: boolean;
  teamMembers: Array<any>;
  curTab = 'overview';

  constructor(
    private appService: AppService,
    private api: ApiService,
    private me: MeService,
    private auth: AuthService,
    private loaderService: LoaderService,
    private modalService: NgbModal,
  ) {
    this.appService.pageTitle = 'Account settings - Pages';
  }

  ngOnInit() {
    this.editable = false;
    this.setUser(this.me.user);
    this.getTeamMembers(this.me.user.company_id);
  }

  setUser(user) {
    this.user = user;
    this.user.name = this.user.first_name + (this.user.last_name !== "" ? (' ' + this.user.last_name) : '');
    this.user.website = 'http://' + this.user.company + '.dropify.net';
    this.user.photo = '5-small.png';
    this.user.verified = false;

    this.userTempData = Object.assign({}, this.user);
  }

  onEdit() {
    if (this.editable) {
      console.log("update=>", '~~~~~~~~~~~~~~~~');
      this.updateProfile();
    } else {
      this.editable = true;
    }
  }
  onCancelEdit() {
    this.editable = false;
    this.userTempData = Object.assign({}, this.user);
  }
  onChange() {
    this.userTempData.website = 'http://' + this.userTempData.company + '.dropify.net';
    let name_array = this.userTempData.name.trim().replace(/ +(?= )/g, '').split(' ');
    this.userTempData.first_name = name_array[0] || "";
    this.userTempData.last_name = name_array[1] || "";
  }

  getTeamMembers(companyID) {
    this.loaderService.display(true);
    this.api.company.getStuffByCompanyId(companyID).promise()
      .then(members => {
        this.loaderService.display(false);
        this.teamMembers = members;
      }).
      catch((error) => {
        this.loaderService.display(false);
        console.dir("update user error=>", error);
    })
  }

  updateProfile() {
    this.loaderService.display(true);
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

  openAddMemberModal(content, options = {}) {
    this.modalService.open(content, options);
  }
  close(c) {
    c('Cross click');
  }

  inviteMember(new_member: Member, c) {
    this.loaderService.display(true);
    let inviteString = {email: new_member.email};
    this.api.company.invite(inviteString).promise().then(resp => {
      console.log('invite resp=>', resp);
      this.loaderService.display(false);
      c('Cross click');
    }).catch( e => {
      this.loaderService.display(false);
      c('Cross click');
    })
  }

}
