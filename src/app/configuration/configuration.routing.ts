import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { ConfigurationComponent } from './configuration.component';
import { ApproverComponent } from './approver/approver.component';
import { AuthGuard } from '../auth.guard';
import { ExitClearanceComponent } from '../hr/exit-clearance/exit-clearance.component';

const configurationRoutes: Routes = [
    {
        path: '', component: ConfigurationComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] },
        children: [
            { path: 'cf/status', component: StatusComponent },
            { path: 'cf/skillset', component: SkillsetComponent },
            
            { path: 'cf/approver', component: ApproverComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'configuration', redirectTo: 'configuration', pathMatch: 'full' }
];

export const configurationRouting = RouterModule.forChild(configurationRoutes);
