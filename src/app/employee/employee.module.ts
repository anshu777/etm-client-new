import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TableComponent } from './timesheet//table/table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { employeeRouting } from './employee.routing';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnlockTimesheetComponent } from './unlock-timesheet/unlock-timesheet.component';

@NgModule({
  imports: [employeeRouting, CommonModule, SharedModule],
  declarations: [EmployeeComponent, TimesheetComponent, TableComponent, DashboardComponent, UnlockTimesheetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
