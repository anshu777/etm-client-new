import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  menuItems: Array<any>;
  sidebarTitle: String = 'Employee';
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      { 'link': 'emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Dashboard' },
      { 'link': 'emp/timesheet', 'iconName': 'fa fa-table', 'linkText': 'Timesheet' },
      { 'link': 'emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Parking lot request' },
      { 'link': 'emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Referrals' }
    ];
  }

}
