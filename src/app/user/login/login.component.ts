import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  isLoginError: boolean;
  private dataFetchSub$: Observable<any>;

  constructor(private fb: FormBuilder,
    private myRoute: Router, private userService: UserService
  ) {
    this.form = fb.group({
      // email: ['', [Validators.required, Validators.email]],
      empid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    //if (this.form.valid) {
    this.dataFetchSub$ = this.userService.userAuthentication(this.form.value.empid, this.form.value.password);
    this.dataFetchSub$.subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRoles', data.role);
      localStorage.setItem('empid', data.empid);
      localStorage.setItem('teamid', data.teamid);
      // route to respective dashboard
      const dashboardUrl: any = this.userService.getDashboardURL(JSON.parse(data.role)[0].Name.toLowerCase());
      this.myRoute.navigate([dashboardUrl]);

    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
    //}


  }

}
