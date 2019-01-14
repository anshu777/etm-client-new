import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { CreateEmployeeComponent } from './employees/employee-create/employee-create.component';
import { AssignTeamComponent } from './employees/assign-team/assign-team.component';
import { AuthGuard } from '../auth.guard';
import { HrComponent } from './hr.component';
import { RaiseMrfComponent } from './raise-mrf/raise-mrf.component';
import { ExitInterviewComponent } from './exit-interview/exit-interview.component';
import { ExitClearanceComponent } from './exit-clearance/exit-clearance.component';
import { AppraisalsComponent } from './appraisals/appraisals.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const hrRoutes: Routes = [
    {
        path: '', component: HrComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'employees', component: EmployeesComponent },
            { path: 'employees/employee-create', component: CreateEmployeeComponent },
            { path: 'employees/employee-edit/:employeeId', component: CreateEmployeeComponent },
            { path: 'employees/assign-team', component: AssignTeamComponent },
            { path: 'hr/raise-mrf', component: RaiseMrfComponent },
            { path: 'hr/exit-interview', component: ExitInterviewComponent },
            { path: 'hr/exit-clearance', component: ExitClearanceComponent },
            { path: 'hr/appraisals', component: AppraisalsComponent },
            { path: 'hr/dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'hr/dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'hr', redirectTo: 'hr/dashboard', pathMatch: 'full' }
];

export const hrRouting = RouterModule.forChild(hrRoutes);
