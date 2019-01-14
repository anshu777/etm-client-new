import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'et-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.css']
})

export class SidebarComponent {
    @Input() menuItems: Array<any>;
    @Input() sidebarTitle: String = '';
    heading = 'Employee & Timesheet Management';

    constructor(private auth: UserService) { }

    logout() {
        this.auth.logout();
    }
}


