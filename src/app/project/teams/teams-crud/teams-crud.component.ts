import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Subscription, Observable } from 'rxjs/Rx';

import { Team } from '../team.model';
import { Client } from '../../../shared/models/client.model';
import { Employee } from '../../../hr/employees/employee.model';
// import { Client } from '_debugger';

@Component({
    selector: 'et-teams-crud',
    templateUrl: './teams-crud.component.html',
    styleUrls: ['./teams-crud.component.css']
})

export class TeamCrudComponent implements OnInit, OnDestroy {
    @Input() team: Team = new Team();
    @Input() projects: Array<any> = [];
    @Output() projItemIdChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    selectProjectItem(id: number) {
        this.projItemIdChange.emit(id);
    }

}
