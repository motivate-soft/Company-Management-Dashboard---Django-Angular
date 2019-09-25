import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../@services/auth.service';
import {SocketService} from "../@services/socket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  socket: SocketIOClient.Socket;
  failedUrl?: string = null;
  hostname: string;
  subdomain: string = 'test';
  constructor(
    private auth: AuthService,
    private router: Router,
    private socketService: SocketService
  ) {
    this.hostname = window.location.hostname;
    if (this.hostname.indexOf('.') < 0 || this.hostname.split('.')[0] === 'www') {
    this.subdomain = '';
  } else {
    this.subdomain = this.hostname.split('.')[0];
  }
  }

  popFailedUrl(): string {
    let url = this.failedUrl;
    this.failedUrl = null;
    return url;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.auth.isAuthenticated()) {
      return Promise.resolve(true);
    }
    if (this.auth.canAutoLogin()) {
      return this.auth.autoLogin()
        .then(user => {
          if (this.hostname !== 'localhost' && user.company.toLowerCase() !== this.subdomain ) {
            this.auth.logout();
            return false;
          }
          if (this.hostname == 'dropify.net') {
            window.location.replace("http://"+this.subdomain+".dropify.net/#/admin")
          }
          return true;
        })
        .catch(() => {
          this.auth.logout();
          this.failedUrl = state.url;
          return false;
        })
    }
    this.failedUrl = state.url;
    window.location.replace("http://dropify.net")
    return Promise.resolve(false);
  }


}
