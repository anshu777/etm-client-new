import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Task } from '../../tasks/task.model';
import { DataService } from '../../../shared/services/data.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { TeamTasksDto } from '../team.model';
import { ETNotificationService } from '../../../shared/services/notification.service';

@Component({
    selector: 'et-assign-task',
    templateUrl: './assign-task.html',
    styleUrls: ['./assign-task.css']
})

export class AssignTaskComponent implements OnInit, OnDestroy {
    private selectedTask = [];
    settings = {};

    @Output() teamIdChange = new EventEmitter();
    @Output() selectedEmpChange = new EventEmitter();

    private teams;
    private taskArray: Array<any> = [];
    private dataFetchSub: Subscription;
    private taskFetchSub: Subscription;
    private assignTaskSub: Subscription;
    private teamTasksDto: TeamTasksDto = new TeamTasksDto();
    private selectedTeamId: number;
    showSpinner: Boolean = false;
    constructor(private router: Router,
        private dataService: DataService,
        private notificationService: ETNotificationService) {

    }

    ngOnInit() {
        this.showSpinner = true;
        this.settings = {
            text: '--Select Tasks--',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class'
        };
        this.dataFetchSub = this.dataService.getList('team/getlist')
        .finally(() => this.showSpinner = false)
            .subscribe(
                data => {
                    this.teams = data;
                }
            );

        this.taskFetchSub = this.dataService.getList('task/getlist')
        .finally(() => this.showSpinner = false)
            .subscribe(
                data => {
                    this.taskArray = [];
                    data.forEach(item => {
                        this.taskArray.push({ id: item.id, itemName: item.name });
                    });
                }
            );
    }
    ngOnDestroy() {
        if (!!this.dataFetchSub) {
            this.dataFetchSub.unsubscribe();
        }
    }

    selectTeam(id: number) {
        this.selectedTeamId = id;
    }

    cancel() {
        this.router.navigate(['teams']);
    }

    assignTeam() {
        this.teamTasksDto.teamId = this.selectedTeamId;
        this.teamTasksDto.taskIds = this.selectedTask.map(x => x.id);
        this.assignTaskSub = this.dataService.save('team/assigntasks', this.teamTasksDto)
        .finally(() => this.showSpinner = false)   
        .subscribe(
                data => {
                    this.selectedTask = [];
                    this.teamTasksDto = null;
                    this.notificationService.success('Saved successfully!');
                }
            );
        console.log(this.selectedTask);
    }
}
