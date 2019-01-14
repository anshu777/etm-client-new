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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    //if (this.form.valid) {
     this.dataFetchSub$ = this.userService.userAuthentication(this.form.value.email, this.form.value.password);
     this.dataFetchSub$.subscribe((data: any) => {
          localStorage.setItem('userToken', data.access_token);
          localStorage.setItem('userRoles', data.role);
          this.myRoute.navigate(['dashboard']);
        },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
          });
    //}


  }

}