import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Subscription, Observable } from 'rxjs/Rx';

import { Task } from '../task.model';
import { Client } from '../../../shared/models/client.model';
import { Employee } from '../../../hr/employees/employee.model';
// import { Client } from '_debugger';

@Component({
    selector: 'et-task-crud',
    templateUrl: './task-crud.component.html',
    styleUrls: ['./task-crud.component.css']
})

export class TaskCrudComponent implements OnInit, OnDestroy {
    @Input() task: Task = new Task();
    @Input() taskTypes: Array<any> = [];
    @Output() taskItemIdChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

    selectTaskTypeItem(id: number) {
        this.taskItemIdChange.emit(id);
    }

}
