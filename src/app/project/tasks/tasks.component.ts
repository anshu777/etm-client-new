import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Task } from './task.model';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../shared/services/data.service';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';

@Component({
    selector: 'et-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.css']
})

export class TasksComponent implements OnInit {
    displayedColumns = ['id', 'name', 'createdBy', 'createdDate'];
    tasks: MatTableDataSource<Task>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    errorMessage: string;
    title = 'Tasks';
    private getTeamsSub: Subscription;
    private getTaskSub: Subscription;
    private saveDataSub: Subscription;
    private deleteDataSub: Subscription;
    showEditMode = false;
    editMode = false;
    task: Task = new Task();
    private teams: Array<any> = [];
    taskTypes: Array<any> = [];
    isSelected: boolean;
    private isSingleSelected: boolean;
    private selectedRows: Array<any> = [];
    showSpinner: Boolean = false;
    @ViewChild('taskCrudComponent')
    private taskCrudComponent: ModalWindowComponent;
    constructor(private dataService: DataService) { }

    ngOnInit() {


        this.bindList();

    }

    bindList() {
        /* Initialize this.* bindable members with data.* members */
        this.showSpinner = true;
        this.getTaskSub = this.dataService.getList('task/getlist')
        .finally(() => this.showSpinner = false)
            .subscribe(pData => this.mapData(pData));
    }

    mapData(pData: any) {
        this.tasks = new MatTableDataSource(pData);
        this.tasks.paginator = this.paginator;
        this.tasks.sort = this.sort;
    }

    addTask() {
        this.task = new Task();
        this.taskTypes = [
            { 'id': 1, 'name': 'Developer' },
            { 'id': 2, 'name': 'QA' },
            { 'id': 3, 'name': 'Both' }
        ];
        this.showEditMode = true;
    }

    cancel() {
        this.showEditMode = false;
    }

    saveTask() {

        this.saveDataSub = this.dataService.save('task/post', this.task)
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

    selectRecord(event: any) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.selectedRows.push(checkbox.value);
            this.isSelected = true;
        } else {
            this.selectedRows.splice(this.selectedRows.indexOf(checkbox.value), 1);
            if (this.selectedRows.length === 0) {
                this.isSelected = false;
            }
        }
        this.isSingleSelected = this.selectedRows.length === 1;
    }

    deleteRecord() {
        // let removeIndex = this.employees.findIndex(x => x.id === Number(this.selectedRows));
        // this.employees = this.employees.splice(removeIndex, 1);
        this.showSpinner = true;
        this.deleteDataSub = this.dataService.delete('task/delete/', this.selectedRows[0])
        .finally(() => this.showSpinner = false)
        .subscribe(
            (success) => {
                // this.onSuccess(success);
                this.showEditMode = false;
                this.bindList();
                this.isSingleSelected  = this.isSingleSelected = false;
            },
            err => {
                // this.handleError(err);
                console.log(err);
            });
    }

    setTaskTypeId(id: any){
        this.task.taskType = id;
        console.log("asd");
    }

    editRecrod() {
        this.task = Object.assign({}, this.tasks.filteredData.find(x => x.id === Number(this.selectedRows)));
        this.showEditMode = true;
        this.editMode = true;
    }
}
