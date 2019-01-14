import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  menuItems: Array<any>;
  sidebarTitle: String = 'HR-Management';
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      { 'link': '/hr/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Dashboard' },
      { 'link': '/employees', 'iconName': 'fa fa-table', 'linkText': 'Employees' },
      { 'link': '/hr/raise-mrf', 'iconName': 'fa fa-table', 'linkText': 'Raise MRF' },
      { 'link': '/hr/exit-interview', 'iconName': 'fa fa-table', 'linkText': 'Exit Interview' },
      { 'link': '/hr/exit-clearance', 'iconName': 'fa fa-table', 'linkText': 'Exit Clearance' },
      { 'link': '/hr/appraisals', 'iconName': 'fa fa-table', 'linkText': 'Appraisals' },
    ];
  }

}
