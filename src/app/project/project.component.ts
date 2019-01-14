import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  menuItems: Array<any>;
  sidebarTitle: String = 'Project-Management';
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      { 'link': '/pm/dashboard', 'iconName': 'fa fa-table', 'linkText': 'Dashboard' },
      { 'link': '/projects', 'iconName': 'fa fa-table', 'linkText': 'Projects' },
      { 'link': '/teams', 'iconName': 'fa fa-table', 'linkText': 'Teams' },
      { 'link': '/tasks', 'iconName': 'fa fa-table', 'linkText': 'Tasks' },
      { 'link': '/pm/approve-timesheet', 'iconName': 'fa fa-table', 'linkText': 'Approve Timesheet' },
      { 'link': '/pm/approve-mrf', 'iconName': 'fa fa-table', 'linkText': 'Approve MRF' },
      { 'link': '/pm/appraisals', 'iconName': 'fa fa-table', 'linkText': 'Appraisals' }
    ];
  }

}
