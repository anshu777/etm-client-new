import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { UserDateDto } from '../../employee/timesheet/timesheet.model';

@Component({
  selector: 'app-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.css']
})
export class ApproveTimesheetComponent implements OnInit {
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
  constructor(private dataService: DataService) { }

  ngOnInit() {
    //get from localstorage for loggedin user
    this.userId = 4;
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

}
