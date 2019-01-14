import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggednIn: Boolean = false;
  constructor(private auth: UserService) { }

  ngOnInit() {
    this.isLoggednIn = !this.auth.isLoggednIn();
  }

  logout() {
    this.auth.logout();
  }


}
