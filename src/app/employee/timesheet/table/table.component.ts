import { Component, Input, Output, OnChanges, OnInit } from '@angular/core';
import { TimesheetRow } from '../timesheet.model';

@Component({
  selector: 'data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() header: Array<any>; //weakDates
  @Input() leftColumns: Array<any>; //tasks
  @Input() employeeId: number;
  rowFields: Array<TimesheetRow> = []; //has one task and rest weakDates ...used internal
  private timeSheetRow: TimesheetRow = new TimesheetRow();
  @Input() inputTimesheetRows: Array<TimesheetRow> = []; //set from timesheet
  //ctr: Array<Number>; 
  ngOnInit() {
    let ctr = 1;
    this.leftColumns.forEach((x) => {
      //use timesheet model here
      this.timeSheetRow = new TimesheetRow();
      this.timeSheetRow.id = ctr;
      this.timeSheetRow.taskId = x.id;
      this.timeSheetRow.taskName = x.name;
      //add dynamic dates
      this.timeSheetRow.timesheetColumns = [];
      this.header.forEach((y) => {
        this.timeSheetRow.timesheetColumns
          .push({
            id: y.id,
            dayName: y.name,
            date: new Date(Date.UTC(y.dDate.getFullYear(), y.dDate.getMonth(), y.dDate.getDate(), 0, 0, 0, 0)),
            employeeId: this.employeeId, taskId: x.id, hours: 0
          });
      });

      // set totalHours if rowFields is having some values
      let totalHours = 0;
      if (!!this.inputTimesheetRows.find(z => z.taskId === ctr)) {
        totalHours = this.inputTimesheetRows.find(z => z.taskId === ctr).totalHours;
      }

      this.timeSheetRow.totalHours = totalHours;
      this.rowFields.push(this.timeSheetRow);
      ctr++;
    });
  }

  getDate(tdate: Date) {
    return tdate.getUTCDate();
  }

  getMonth(tdate: Date) {
    return tdate.getUTCMonth();
  }

  ngOnChanges() {
    let i = 0;
    this.rowFields.forEach((x) => {
      if (!!this.inputTimesheetRows.find(z => z.taskId === this.leftColumns[i].id)) {
        x.timesheetColumns.forEach((col) => {
          // taskid 1, having 7 days
          col.hours = 5;
          this.inputTimesheetRows.filter(z => z.taskId === this.leftColumns[i].id).forEach((tsRow) => {
            if (!!tsRow.timesheetColumns.find(t => t.date.getDate() === col.date.getDate() && t.date.getMonth() === col.date.getMonth())) {
              col.hours = tsRow.timesheetColumns
                .find(t => t.date.getDate() === col.date.getDate() && t.date.getMonth() === col.date.getMonth()).hours;
            }

          });

        });

      }
      i++;
    });


    this.rowFields.forEach(c => {
      let sum = 0;
      c.timesheetColumns.forEach(t => { sum += Number(t.hours); });
      c.totalHours = sum;
    });

    if (!!this.rowFields.find(r => r.id === this.rowFields.length)) {
      this.rowFields.find(r => r.id === this.rowFields.length)
        .timesheetColumns.forEach(y => {
          let csum = 0;
          this.rowFields.forEach(x => {
            if (x.id < this.rowFields.length) {
              if (!!x.timesheetColumns.find(z => z.id === y.id)) {
                csum += Number(x.timesheetColumns.find(z => z.id === y.id).hours);
              }
            }
          });
          y.hours = csum;

        });
    }

  }

  changeValue(tColId: number, date: string, taskId: number, event: any) {
    const tsrow = this.rowFields.find(x => x.id === taskId);
    if (!!tsrow) {
      let sum = 0;
      tsrow.timesheetColumns.forEach(c => { sum += Number(c.hours); });
      tsrow.totalHours = sum;

      //column to set value
      const tcol = this.rowFields.find(x => x.id === this.rowFields.length).timesheetColumns.find(y => y.id === tColId);
      if (!!tcol) {
        let csum = 0;
        this.rowFields.forEach(x => {
          if (x.id < this.rowFields.length) {
            csum += Number(x.timesheetColumns.find(y => y.id === tColId).hours);
          }
        });
        tcol.hours = csum;
      }
    }
  }
}

