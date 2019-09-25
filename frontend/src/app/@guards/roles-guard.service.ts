import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {ApiService} from "../@api/api.service";
import {MeService} from "../@services/me.service";

@Injectable({
  providedIn: 'root'
})

export class RolesGuardService {

  roles: any[] = [];
  constructor(private api: ApiService, private me: MeService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //this.roles = this.me.user.roles;
    let roles = route.data['roles'];
    if (this.roles.indexOf('admin') !== -1) {
      return true;
    } else if (roles) {
      let checkRole = roles.some((role) => {
        return this.roles.indexOf(role) !== -1;
      });

      if (checkRole) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return true;
  }
}
