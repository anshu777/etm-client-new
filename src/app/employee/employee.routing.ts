import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UnlockTimesheetComponent } from './unlock-timesheet/unlock-timesheet.component';

const employeeRoutes: Routes = [
    {
        path: '', component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'emp/timesheet/:employeeId/:teamId', component: TimesheetComponent },
            { path: 'emp/dashboard', component: DashboardComponent },
            { path: 'emp/unlock-timesheet', component: UnlockTimesheetComponent }
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
