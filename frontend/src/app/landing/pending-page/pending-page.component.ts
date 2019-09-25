import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../../@services/loader.service";
import {AuthService} from "../../@services/auth.service";
import {ApiService} from "../../@api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-pending-page',
  templateUrl: './pending-page.component.html',
  styleUrls: ['./pending-page.component.scss']
})
export class PendingPageComponent implements OnInit {
  hostname: string;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.hostname = window.location.hostname;
    if (this.hostname !== 'account.dropify.net' && this.hostname !== 'dropify.net') {
      this.loaderService.display(true);
      const token = this.route.snapshot.queryParams['token'];
      this.auth.rememberToken(token);
      this.auth.autoLogin().then(resp => {
        this.router.navigate(['store']);
        this.loaderService.display(false);
        this.api.me.location({}).promise().then(resp => {
          console.log("success log");
        })
      }).catch( e => {
        this.auth.logout();
        this.router.navigate(['login']);
        this.loaderService.display(false);
      });
    }
  }
  ngOnInit() {
  }

}
