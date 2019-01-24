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
    editMode = false;
    private selectedRows: Array<any> = [];
    private isSelected: boolean;
    private isSingleSelected: boolean;
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

        if (this.team.id != null && this.team.id != 0) {
            this.saveDataSub = this.dataService.put('team/put', this.team)
                .finally(() => this.showSpinner = false)
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
        else {
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
    }

    setProjectId(id: number) {
        this.team.projectId = id;
    }

    assignTasks() {
        this.router.navigate(['assigntask']);
    }

    selectRecord(event: any) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.selectedRows.push(checkbox.id);
            this.isSelected = true;
        } else {
            var index = this.selectedRows.indexOf((checkbox.id));
            this.selectedRows.splice(index, 1);
            if (this.selectedRows.length === 0) {
                this.isSelected = false;
            }
        }
        this.isSingleSelected = this.selectedRows.length === 1;
    }

    editRecrod() {
        this.team = Object.assign({}, this.teams.filteredData.find(x => x.id === Number(this.selectedRows)));
        this.showEditMode = true;
        this.editMode = true;
    }
}
