import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

/* Project Feature Module */
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCrudComponent } from './projects/project-crud/project-crud.component';

import { ProjectComponent } from './project.component';

/* Tasks Feature Module */
import { TasksComponent } from './tasks/tasks.component';
import { TaskCrudComponent } from './tasks/task-crud/task-crud.component';

/* Team Feature Module */
import { TeamsComponent } from './teams/teams.component';
import { TeamCrudComponent } from './teams/teams-crud/teams-crud.component';
import { AssignTaskComponent } from './teams/assign-task/assign-task.component';
import { projectRouting } from './project.routing';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { ApproveMrfComponent } from './approve-mrf/approve-mrf.component';
import { AppraisalsComponent } from './appraisals/appraisals.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule, SharedModule, projectRouting],
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ProjectCrudComponent,
    TasksComponent,
    TaskCrudComponent,
    TeamsComponent,
    TeamCrudComponent,
    AssignTaskComponent,
    ApproveTimesheetComponent,
    ApproveMrfComponent,
    AppraisalsComponent,
    DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectModule { }
