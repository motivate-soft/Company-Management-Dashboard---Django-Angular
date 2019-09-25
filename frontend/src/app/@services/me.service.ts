import { Injectable } from '@angular/core';
import { some } from 'lodash';
import {TranslateService} from "@ngx-translate/core";
import {isString} from "util";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class MeService {

  user?: User = null;
  token?: string = null;

  constructor(private translate: TranslateService) { }

  setToken(token: string) {
    this.token = token;
  }

  setUser(user: any) {
    this.user = user;
  }

  forget() {
    this.user = null;
    this.token = null;
  }

  hasRole(role: string): boolean {
    if (this.user === null) {
      return false;
    }
    //return some(this.user.roles, roleName => roleName === role);
  }

}
