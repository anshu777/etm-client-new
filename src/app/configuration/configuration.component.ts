import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  menuItems: Array<any>;
  sidebarTitle: String = 'Configuration';
  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      { 'link': '/cf/status', 'iconName': 'fa fa-table', 'linkText': 'Status' },
      { 'link': '/cf/skillset', 'iconName': 'fa fa-table', 'linkText': 'Skill Set' },
      { 'link': '/cf/approver', 'iconName': 'fa fa-table', 'linkText': 'Approver' }
    ];
  }

  gotopage(page: string) {
    this.router.navigate([page]);
}

}
