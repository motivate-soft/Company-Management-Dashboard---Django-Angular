import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../@services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PublicGuardService {

  failedUrl?: string = null;
  hostname: string;
  subdomain: string = 'test';
  constructor(private auth: AuthService, private router: Router) {
    this.hostname = window.location.hostname;
  }

  popFailedUrl(): string {
    let url = this.failedUrl;
    this.failedUrl = null;
    return url;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.hostname != 'dropify.net' && this.hostname != 'localhost') {
      if (this.auth.isAuthenticated()) {
        return Promise.resolve(true);
      }
      if (this.auth.canAutoLogin()) {
        return this.auth.autoLogin()
          .then(user => {
            if (user.company !== this.subdomain ) {
              this.auth.logout();
              return false;
            }
            this.router.navigate(['store']);
            return true;
          })
          .catch(() => {
            this.auth.logout();
            this.failedUrl = state.url;
            return false;
          })
      }
      console.log(route['_routerState'].url );
      if( route['_routerState'].url ! = '/login') {
              console.log("in=====",route['_routerState'].url );
        // window.location.replace("http://dropify.net")
      }
      console.log("out=====",route['_routerState'].url );
    } else {
      return Promise.resolve(true);
    }
  }
}
