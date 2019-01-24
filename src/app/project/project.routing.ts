import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { TeamsComponent } from './teams/teams.component';
import { AssignTaskComponent } from './teams/assign-task/assign-task.component';
import { ProjectComponent } from './project.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { ApproveMrfComponent } from './approve-mrf/approve-mrf.component';
import { AppraisalsComponent } from './appraisals/appraisals.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const projectRoutes: Routes = [
    {
        path: '', component: ProjectComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'projects', component: ProjectsComponent },
            { path: 'tasks', component: TasksComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'assigntask', component: AssignTaskComponent },
            { path: 'pm/approve-mrf', component: ApproveMrfComponent },
            { path: 'pm/approve-timesheet', component: ApproveTimesheetComponent },
            { path: 'pm/appraisals', component: AppraisalsComponent },
            { path: 'pm/dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'pm/dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'pm', redirectTo: 'pm/dashboard', pathMatch: 'full' },
    { path: 'approve-timesheet', redirectTo: 'pm/approve-timesheet', pathMatch: 'full' }
];

export const projectRouting = RouterModule.forChild(projectRoutes);
