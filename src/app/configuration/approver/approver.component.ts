import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {
  showSpinner: Boolean = false;
  managers: Array<any> = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getEmpListByDesignationId(id: number) {
    this.managers = [];

    this.dataService.getList('employee/getByDesignationId/6')
      .subscribe(
        (data) => {
          data.forEach(x => {
            this.managers.push({
              id: x.Id,
              name: x.Name,
            });
          });

        },
        error => {

        }
      );
  }

}
