import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee.model';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  menuItems: Array<any>;
  sidebarTitle: String = 'Employee';
  employee: Employee = new Employee();
  employeeId: number;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach(params => {
      this.employeeId = params['employeeId'];
  });
     

    this.menuItems = [
      { 'link': '/emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Dashboard' },
      { 'link': '/emp/timesheet', 'iconName': 'fa fa-table', 'linkText': 'Timesheet' },
      { 'link': '/emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Parking lot request' },
      { 'link': '/emp/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Referrals' },
      { 'link': '/emp/unlock-timesheet', 'iconName': 'fa fa-table', 'linkText': 'Request to unlock Timesheet' },
      { 'link': '/emp/employee-create', 'iconName': 'fa fa-table', 'linkText': 'Edit Profile' },
    ];
  }

}
