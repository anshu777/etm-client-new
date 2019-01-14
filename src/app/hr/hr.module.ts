import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HrComponent } from './hr.component';

/* Employees Feature Module */
import { EmployeesComponent } from './employees/employees.component';
import { CreateEmployeeComponent } from './employees/employee-create/employee-create.component';
import { AssignTeamComponent } from './employees/assign-team/assign-team.component';
import { SidebarComponent } from '../shared/layout/sidebar.component';
/* Employees Router */
import { hrRouting } from './hr.routing';
import { RaiseMrfComponent } from './raise-mrf/raise-mrf.component';
import { ExitInterviewComponent } from './exit-interview/exit-interview.component';
import { ExitClearanceComponent } from './exit-clearance/exit-clearance.component';
import { AppraisalsComponent } from './appraisals/appraisals.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, SharedModule, hrRouting],
  declarations: [
    //SidebarComponent,
    HrComponent,
    EmployeesComponent,
    AssignTeamComponent,
    CreateEmployeeComponent,
    RaiseMrfComponent,
    ExitInterviewComponent,
    ExitClearanceComponent,
    AppraisalsComponent,
    DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrModule { }
