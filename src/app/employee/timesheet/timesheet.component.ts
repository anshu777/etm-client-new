import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { DataService } from '../../shared/services/data.service';
import { EmployeeTimesheet, TimesheetRow, TimesheetColumn, UserDateDto } from './timesheet.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ETNotificationService } from '../../shared/services/notification.service';

@Component({
    selector: 'et-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.css']
})

export class TimesheetComponent implements OnInit {
    errorMessage: string;
    title = 'Timesheet';
    @ViewChild('tableComponent') private tableComponent: TableComponent;
    private teamId: number;
    private employeeId: number;
    private employeeTimesheet: EmployeeTimesheet;
    private etDataSub: Subscription;
    private taskDataSub: Subscription;
    private saveDataSub: Subscription;
    private weekDate: Date;
    showSpinner: Boolean = false;
    // Tasks to be fetched based on teamId
    private taskColumns: Array<any> = [
        // { id: 1, name: 'Adhoc Meeting' },
        // { id: 2, name: 'Coding' },
        // { id: 3, name: 'Bug Fixing' },
        // { id: 4, name: 'Daily Standup' },
        // { id: 5, name: 'Code Review' },
        // { id: 6, name: 'Total' }
    ];

    //WeakDates
    private headerDays: Array<any> = [
        { id: 1, name: 'Sun' },
        { id: 2, name: 'Mon' },
        { id: 3, name: 'Tue' },
        { id: 4, name: 'Wed' },
        { id: 5, name: 'Thu' },
        { id: 6, name: 'Fri' },
        { id: 7, name: 'Sat' },
    ];

    private header: Array<any> = [
        { id: 1, name: 'Sun' },
        { id: 2, name: 'Mon' },
        { id: 3, name: 'Tue' },
        { id: 4, name: 'Wed' },
        { id: 5, name: 'Thu' },
        { id: 6, name: 'Fri' },
        { id: 7, name: 'Sat' },
    ];

    constructor(private route: ActivatedRoute,
        private notificationService: ETNotificationService,
        private dataService: DataService) {


    }

    ngOnInit() {
        /* Initialize this.* bindable members with data.* members */
        this.route.params.forEach(params => {
            this.employeeId = params['employeeId'];
            this.teamId = params['teamId'];
        });

        this.employeeTimesheet = new EmployeeTimesheet();
        this.employeeTimesheet.employeeId = this.employeeId;
        this.employeeTimesheet.teamId = this.teamId;
        this.employeeTimesheet.timesheetRows = [];

        this.weekDate = this.getLastSunday(new Date());
        this.resetHeaders();
        this.getTimesheetData();
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

    resetWeekDate(event: any) {
        this.weekDate = new Date(this.getLastSunday(new Date(event.target.value)));
        this.resetHeaders();
        this.getTimesheetData();
    }

    resetHeaders() {
        this.header = [];
        const wDate: Date = new Date();
        wDate.setDate(this.weekDate.getDate() - 1);
        for (let ctr = 1; ctr <= 7; ctr++) {
            this.header.push({
                id: ctr,
                name: this.headerDays.find(x => x.id === ctr).name,
                dDate: new Date(wDate.setDate(wDate.getDate() + 1))
            });
        }
    }

    getTimesheetData() {
        this.showSpinner = true;
        this.taskColumns = [];
        this.taskDataSub = this.dataService.get('task/getbyteamid/' + this.teamId)
            .finally(() => {
                this.showSpinner = false;
                this.taskColumns.push({ id: this.taskColumns.length + 1, name: 'Total' });
            })
            .subscribe(data =>
                data.forEach(x => {
                    this.taskColumns.push({ id: Number(x.id), name: x.name });
                })
            );

        const userDate = new UserDateDto();
        userDate.userId = this.employeeId;
        userDate.date = this.weekDate;
        this.showSpinner = true;
        this.etDataSub = this.dataService.save('timesheet/getbyuserid/', userDate)
            .finally(() => this.showSpinner = false)
            .subscribe(etsheet => this.mapTimesheetData(etsheet));
    }

    saveTimesheet() {
        this.showSpinner = true;
        const employeeTimesheet = new EmployeeTimesheet();
        employeeTimesheet.employeeId = this.employeeId;
        employeeTimesheet.teamId = this.teamId;
        employeeTimesheet.timesheetRows = this.tableComponent.rowFields;

        this.saveDataSub = this.dataService.save('timesheet/save', employeeTimesheet)
            .finally(() => this.showSpinner = false)
            .subscribe(
                (success) => {
                    this.notificationService.success('Saved successfully!');
                },
                err => {
                    this.notificationService.error('Error occurred while saving record: ' + err);
                });
    }

    mapTimesheetData(etsheet) {
        this.employeeTimesheet.timesheetRows = [];
        etsheet.TimesheetRows.forEach(tr => {
            tr.timesheetColumns.forEach(tcol => {
                tcol.date = new Date(tcol.date);
            });
            this.employeeTimesheet.timesheetRows.push(
                {
                    id: tr.id,
                    taskId: tr.taskId,
                    taskName: tr.taskName,
                    timesheetColumns: tr.timesheetColumns,
                    totalHours: tr.totalHours
                });
        });
    }
}
