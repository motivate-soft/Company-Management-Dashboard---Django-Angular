import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { MeService } from './me.service';
import {ApiService} from '../@api/api.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolesPromise?: Promise<any> = null;
  private hostname: string;
  constructor(
    private api: ApiService,
    private me: MeService,
    private router: Router,
  ) {
    this.hostname = window.location.hostname;
  }

  rememberToken(token) {
    localStorage.setItem('dropify.token', token);
  }

  getToken() {
    return localStorage.getItem('dropify.token');
  }

  canAutoLogin(): boolean {
    return this.getToken() !== null;
  }

  isAuthenticated(): boolean {
    return this.me.token !== null;
  }

  autoLogin(): Promise<any> {
    let token = this.getToken();
    if (token === null) {
      return Promise.reject({'error': 'No saved user session'});
    }
    this.me.setToken(token);
    return this.api.me.get().promise()
      .then(user => {
        this.me.setUser(user);
        return user;
      });
  }

  login(auth): Promise<any> {
    return this.api.login.post(auth).promise()
      .then(token => {
        this.me.setToken(token.token);
        this.rememberToken(token.token);
      })
      .then(() => this.api.me.get().promise())
      .then(user => {
        this.me.setUser(user);
      });
  }

  logout(){
    this.me.forget();
    localStorage.removeItem('dropify.token');
    if(this.hostname=="localhost") {
      this.router.navigate(['']);
    } else {
      window.location.replace('http://dropify.net');
    }
  }

  getRoles(): Promise<any> {
    if (this.rolesPromise === null) {
      this.rolesPromise = this.api.roles.list().unwrap().promise()
        .then(roles => map(roles, r => r.name));
    }
    return this.rolesPromise;
  }

}
