import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Team } from './team.model';
import { DataService } from '../../shared/services/data.service';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { Router } from '@angular/router';

@Component({
    selector: 'et-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.css']
})

export class TeamsComponent implements OnInit {
    displayedColumns = ['id', 'name', 'setupDate', 'projectName'];
    teams: MatTableDataSource<Team>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private getTeamsSub: Subscription;
    private getTasksSub: Subscription;
    private getProjectSub: Subscription;
    private saveDataSub: Subscription;
    errorMessage: string;
    title = 'Teams';
    showEditMode = false;
    showAssignTask = false;
    team: Team = new Team();
    projects: Array<any> = [];
    tasks: Array<any> = [];
    showSpinner: Boolean = false;
    constructor(private router: Router, private dataService: DataService) { }

    ngOnInit() {
        /* Initialize this.* bindable members with data.* members */
        this.bindList();

        this.getProjectSub = this.dataService.getList('project/getlist')
            .subscribe(
                (data) => {
                    data.forEach(x => {
                        this.projects.push({ id: x.id, name: x.projectName });
                    });

                },
                error => {

                }
            );

        this.getTasksSub = this.dataService.getList('task/getlist')
            .subscribe(
                (data) => {
                    data.forEach(x => {
                        this.tasks.push({ id: x.id, name: x.name });
                    });

                },
                error => {

                }
            );
    }

    bindList() {
        this.showSpinner = true;
        this.getTeamsSub = this.dataService.getList('team/getlist')
            .finally(() => this.showSpinner = false)
            .subscribe(pData => this.mapData(pData));
    }

    mapData(pData: any) {
        this.teams = new MatTableDataSource(pData);
        this.teams.paginator = this.paginator;
        this.teams.sort = this.sort;
    }

    addTeam() {
        this.team = new Team();
        this.showEditMode = true;
    }

    cancel() {
        this.showEditMode = false;
    }

    saveTeam() {

        this.saveDataSub = this.dataService.save('team/post', this.team)
            .subscribe(
                (success) => {
                    // this.onSuccess(success);
                    this.showEditMode = false;
                    this.bindList();
                },
                err => {
                    // this.handleError(err);
                    console.log(err);
                });
    }

    setProjectId(id: number) {
        this.team.projectId = id;
    }

    assignTasks() {
        this.router.navigate(['assigntask']);
    }


}
