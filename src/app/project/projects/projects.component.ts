import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, Directive } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Project } from './project.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../shared/services/data.service';
import { ModalWindowComponent } from '../../shared/modal-window/modal-window.component';
import { ProjectCrudComponent } from './project-crud/project-crud.component';


@Component({
    selector: 'et-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./project.css'],
    // directives: ['ProjectCrudComponent']
})

export class ProjectsComponent implements OnInit {
    displayedColumns = ['id', 'projectName', 'projectManager', 'clientName', 'officeAddress', 'startDate', 'dueDate'];
    projects: MatTableDataSource<Project>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private disableSave = false;
    showEditMode = false;
    editMode = false;
    errorMessage: string;
    isSelectAll: boolean = false;
    title = 'Projects';
    project: Project = new Project();
    private getDataSub: Subscription;
    private saveDataSub: Subscription;
    private clientDataSub: Subscription;
    private selectedRows: Array<any> = [];
    private isSelected: boolean;
    private isSingleSelected: boolean;
    clients: Array<any> = [];
    managers: Array<any> = [];
    showSpinner: Boolean = false;
    @ViewChild(ProjectCrudComponent)
    private projectCrudComponent: ProjectCrudComponent;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.bindList();
        this.managers = this.dataService.getEmpListByDesignationId(6);
        this.clientDataSub = this.dataService.getList('client/getlist')
            .subscribe(
                (data) => {
                    data.forEach(x => {
                        this.clients.push({ id: x.Id, name: x.Name });
                    });

                },
                error => {

                }
            );
    }

    bindList() {
        /* Initialize this.* bindable members with data.* members */
        this.showSpinner = true;
        this.getDataSub = this.dataService.getList('project/getlist')
            .finally(() => this.showSpinner = false)
            .subscribe(pData => this.mapData(pData));

    }

    mapData(pData: any) {
        this.projects = new MatTableDataSource(pData);
        this.projects.paginator = this.paginator;
        this.projects.sort = this.sort;
    }

    selectAllRows(){
        this.isSelectAll = !this.isSelectAll;
    }

    editRecrod() {
        this.project = Object.assign({}, this.projects.filteredData.find(x => x.id === Number(this.selectedRows)));
        // this.projectCrudComponent.PrimarySkills = this.project.primarySkillIds;
        // this.projectCrudComponent.selectedSecondarySkills = this.project.secondarySkillIds;
        this.showEditMode = true;
        this.editMode = true;
    }

    cancel() {
        this.showEditMode = false;
        this.editMode = false;
        this.projectCrudComponent.selectedPrimarySkills = [];
        this.projectCrudComponent.selectedSecondarySkills = [];
    }

    addProject() {
        this.project = new Project();
        this.showEditMode = true;
    }

    saveProject() {
        this.showSpinner = true;
        if(this.project.id!=null && this.project.id!=0)
        {
            this.saveDataSub = this.dataService.put('project/put', this.project)
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
        else{
            this.saveDataSub = this.dataService.save('project/post', this.project)
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
    }

    deleteRecord() {
        // let removeIndex = this.employees.filteredData.findIndex(x => x.id === Number(this.selectedRows));
        // this.employees.filteredData = this.employees.filteredData.splice(removeIndex, 1);
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

    setClient(id: number) {
        this.project.clientId = id;
    }

    setEmployee(id: number) {
        this.project.projectManagerId = id;
    }

    setPrimarySkills(pSkills: any) {
        this.project.primarySkillIds = pSkills;
    }

    setSecondarySkills(sSkills: any) {
        this.project.secondarySkillIds = sSkills;
    }
}