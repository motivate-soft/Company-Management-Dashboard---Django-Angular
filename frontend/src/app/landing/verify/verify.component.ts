import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthService} from '../../@services/auth.service';
import {ApiService} from '../../@api/api.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  uid: string;
  token: string;
  title: string;
  verify_state: boolean = false;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.uid = this.route.snapshot.queryParams['uid'];
    this.token = this.route.snapshot.queryParams['token'];
    if (this.uid && this.token) {
      this.verify_state = true;
    } else {
      this.verify_state = false;
    }
  }

  ngOnInit() {
    this.activateUser();
  }

  activateUser() {
    if (this.verify_state) {
      this.api.activeUser.post({uid: this.uid, token: this.token}).promise().then(resp => {
        console.log(resp);
        if (!resp) {
          this.title = 'Congratulate! Your Email is verified';
          this.router.navigate(['/store']);
        }
      });
    }
  }

  back() {
    this.router.navigate(['']);
  }

}
