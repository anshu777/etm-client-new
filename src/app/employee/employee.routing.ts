import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UnlockTimesheetComponent } from './unlock-timesheet/unlock-timesheet.component';
import { CreateEmployeeComponent } from './employee-create/employee-create.component';

const employeeRoutes: Routes = [
    {
        path: '', component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Normal'] },
        children: [
            { path: 'emp/timesheet', component: TimesheetComponent },
            { path: 'emp/dashboard', component: DashboardComponent },
            { path: 'emp/unlock-timesheet', component: UnlockTimesheetComponent },
            { path: 'emp/employee-create', component: CreateEmployeeComponent }
        ]
    },
    {
        path: 'emp', redirectTo : 'emp/dashboard'
    },
    {
        path: 'unlock-timesheet', redirectTo : 'emp/unlock-timesheet'
    },    
];

export const employeeRouting = RouterModule.forChild(employeeRoutes);
