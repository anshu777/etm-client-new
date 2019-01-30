import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { UserDateDto } from '../../employee/timesheet/timesheet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetRequest } from '../../employee/unlock-timesheet/unlock-timesheet.model'
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.css']
})
export class ApproveTimesheetComponent implements OnInit {

  displayedColumns = ['id', 'Empid', 'reason', 'status', 'action'];

  title: String = 'Approve Timesheet';
  weekDate: Date;
  setApprove: Boolean = false;
  setUnlock: Boolean = false;
  teamFetchSub: Subscription;
  teams: Array<any> = [];
  teamId: number;
  showSpinner: Boolean = false;
  employeeId: number;
  userId: number;
  pending: any;
  constructor(private dataService: DataService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //get from localstorage for loggedin user
    this.userId = 4;
    this.getrequest();
    // console.log(this.pending);
  }

  getrequest() {
    this.dataService.getList('timesheet/requests')
      .subscribe(data => {
        this.mapData(data);
      });
  }

  mapData(data: any) {
    this.pending = new MatTableDataSource(data);
    this.pending.paginator = this.paginator;
    this.pending.sort = this.sort;
  }

  resetWeekDate(event: any) {
    this.weekDate = new Date(this.getLastSunday(new Date(event.target.value)));
  }

  getLastSunday(date: Date) {
    const saturday = this.getLastWeekday(date, 6);
    return this.getLastWeekday(saturday, 0);
  }

  getLastWeekday(date, weekday) { // 0 = sunday, 1 = monday, ... , 6 = saturday
    const d = new Date(date);
    d.setDate(d.getDate() + weekday - d.getDay()); // move to last of given weekday
    return d;
  }

  showApprove() {
    this.setUnlock = false;
    this.setApprove = true;
    this.showSpinner = true;
    this.teamFetchSub = this.dataService.getList('team/getList')
      .finally(() => { this.showSpinner = false; })
      .subscribe(
        data => {
          this.teams = data;
        }
      );
  }

  showUnlock() {
    this.setApprove = false;
    this.setUnlock = true;
  }

  setTeamId(value: any) {
    this.teamId = Number(value);
  }

  approve() {
    const userDate = new UserDateDto();
    userDate.userId = this.userId;
    userDate.date = this.weekDate;
    userDate.teamId = this.teamId;
    this.showSpinner = true;
    this.teamFetchSub = this.dataService.save('timesheet/approve', userDate)
      .finally(() => { this.showSpinner = false; this.teamId = 0; })
      .subscribe(
        //show notification
      );
  }

  unlock() {
    const userDate = new UserDateDto();
    userDate.userId = this.userId;
    userDate.date = this.weekDate;
    userDate.employeeId = this.employeeId;
    this.showSpinner = true;
    this.teamFetchSub = this.dataService.save('timesheet/unlock', userDate)
      .finally(() => { this.showSpinner = false; this.employeeId = 0; })
      .subscribe(
        //show noification
      );
  }

  approved(data: any) {
    var request;
    request = { Id: data.Id, Empid: data.Empid, Reason: data.Reason, Status: 2, ManagerId: data.ManagerId }
    this.dataService.update('timesheet/request/put', request)
      .finally(() => this.showSpinner = false)
      .subscribe(data => {
        this.getrequest();
        this.router.navigate(['approve-timesheet']);
      });
  }
  rejected(data: any) {
    var request;
    request = { Id: data.Id, Empid: data.Empid, Reason: data.Reason, Status: 3, ManagerId: data.ManagerId }
    this.dataService.update('timesheet/request/put', request)
      .finally(() => this.showSpinner = false)
      .subscribe(
        data => {
          this.getrequest();
          this.router.navigate(['approve-timesheet']);
        }
      );
  }

}
