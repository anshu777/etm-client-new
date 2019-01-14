import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardResolve } from './dashboard-resolve.service';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { HeadCountReportComponent } from './reports/head-count.component';
import { AuthGuard } from '../auth.guard';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        resolve: {
            dashboard: DashboardResolve
        }
    },
    {
        path: 'orgchart',
        component: OrgChartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'hcreport',
        component: HeadCountReportComponent
    }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
