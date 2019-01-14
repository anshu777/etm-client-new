import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from './employee.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    selector: 'et-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.css']
})

export class EmployeesComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'name', 'designation', 'category', 'projectstatus', 'status', 'team'];
    employees: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    errorMessage: string;
    title = 'Employees';
    private employeeArray: Employee[];
    private isSelected: boolean;
    private isSingleSelected: boolean;
    private selectedRows: Array<any> = [];
    private disableSave = false;
    private showEditMode = false;
    private employee: Employee = new Employee();

    private showAssignTeam = false;
    private selectedEmp = [];
    private teamId: number;
    private showSpinner: Boolean = false;
    private dataFetchSub: Subscription;

    constructor(private dataService: DataService, private router: Router) {
    }

    ngOnInit() {
        this.bindData();
    }
    ngOnDestroy() {
        if (!!this.dataFetchSub) {
            this.dataFetchSub.unsubscribe();
        }
    }
    bindData() {
        this.showSpinner = true;
        this.dataFetchSub = this.dataService.getList('employee/getlist')
            .finally(() => this.showSpinner = false)
            .subscribe(
                data => {
                    this.mapData(data);
                }
            );
    }
    mapData(data: any) {
        this.employees = new MatTableDataSource(data);
        this.employees.paginator = this.paginator;
        this.employees.sort = this.sort;
    }

    selectRecord(event: any) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.selectedRows.push(checkbox.value);
            this.isSelected = true;
        } else {
            this.selectedRows.splice(this.selectedRows.indexOf(Number(checkbox.value)), 1);
            if (this.selectedRows.length === 0) {
                this.isSelected = false;
            }
        }
        this.isSingleSelected = this.selectedRows.length === 1;
    }

    editRecrod() {
        this.employee = Object.assign({}, this.employees.filteredData.find(x => x.Id === Number(this.selectedRows)));
        const employeeId = Number(this.selectedRows);
        //this.showEditMode = true;
        this.router.navigate([`employees/employee-edit/${employeeId}`]);
    }

    cancelEmployee() {
        this.showEditMode = false;
    }
    saveEmployee() {
        const emp = this.employees.filter(x => x.id === Number(this.selectedRows));
        emp[0].name = this.employee.Name;
        this.showEditMode = false;
    }
    deleteRecord() {
        // let removeIndex = this.employees.findIndex(x => x.id === Number(this.selectedRows));
        // this.employees = this.employees.splice(removeIndex, 1);
    }
    assignTeam() {
        //this.employeeArray = this.employees.filteredData;
        this.router.navigate(['employees/assign-team']);
    }

    addNewEmployee() {
        this.router.navigate(['employees/employee-create']);
    }

    MRF() {
        this.router.navigate(['employees/MRF']);
    }
}
