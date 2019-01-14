import { NgModule } from '@angular/core';

/* Dashboard Feature Module */
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DashboardResolve } from './dashboard-resolve.service';

/* Dashboard Router */
import { dashboardRouting } from './dashboard.routing';
import { SharedModule } from '../shared/shared.module';
import { OrgChartModule } from 'ng2-org-chart';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { HeadCountReportComponent } from './reports/head-count.component';

@NgModule({
    imports: [dashboardRouting, SharedModule, OrgChartModule ],
    declarations: [DashboardComponent, OrgChartComponent, HeadCountReportComponent],
    providers: [DashboardService, DashboardResolve]
})

export class DashboardModule { }