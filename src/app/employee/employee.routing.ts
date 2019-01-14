import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const employeeRoutes: Routes = [
    {
        path: '', component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'emp/timesheet/:employeeId/:teamId', component: TimesheetComponent },
            { path: 'emp/dashboard', component: DashboardComponent }
        ]
    }
];

export const employeeRouting = RouterModule.forChild(employeeRoutes);
