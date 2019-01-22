import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Employee } from '../../hr/employees/employee.model';
import { ETNotificationService } from '../../shared/services/notification.service'
import { ExitClear } from './ExitClear.model';

@Component({
  selector: 'app-exit-clearance',
  templateUrl: './exit-clearance.component.html',
  styleUrls: ['./exit-clearance.component.css']
})
export class ExitClearanceComponent implements OnInit {
  private empid: number;
  private employee: Employee = new Employee();
  private exitClear: ExitClear = new ExitClear();
  constructor(private dataservice: DataService, private router: Router, private notificationService: ETNotificationService) { }



  ngOnInit() {
  }

  SaveExitClearance() {
    console.log("in exit clearanxce");
    if (this.empid == null || this.empid === 0) {
      this.notificationService.error("Enter a valid Employee Id")
      this.empid = null;
      this.employee = new Employee();

    }
    else {
      this.exitClear.EmployeeId = this.empid;
      console.log(this.exitClear);
      this.dataservice.save('ExitClearances', this.exitClear)
        .subscribe(
          data => {
            console.log(this.exitClear);
          }

        );
    }
  }

  cancel() {
    this.router.navigate(['configuration']);

  }

  getDetails() {
    if (this.empid == null || this.empid === 0) {
      console.log("null");
      this.notificationService.error("Enter a valid Employee Id")
      this.empid = null;
      this.employee = new Employee();
    }
    else {
      console.log("valid");
      this.dataservice.get('employee/get/' + this.empid)
        .subscribe(
          data => {
            if (data == "null") {
              this.notificationService.error("Employee Id does not exist");
              this.employee = new Employee();
            }
            else {
              console.log(data);
              this.mapEmpData(data);
            }
          }
        )


    }

  }

  mapEmpData(data: any) {

    this.employee.Id = data.Id;
    this.employee.Name = data.Name;
    this.employee.Designation = data.Designation;
    this.employee.TeamName = data.TeamName;
    this.employee.DateOfJoin = data.DateOfJoin;
  }

}
