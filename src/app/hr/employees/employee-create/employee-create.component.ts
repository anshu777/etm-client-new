import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { SkillSet } from '../../../shared/models/skill-set.model';
import { Employee } from '../../../shared/models/employee.model';


@Component({
    selector: 'app-create-employee',
    templateUrl: './employee-create.html',
    styleUrls: ['./employee-create.css']
})

export class CreateEmployeeComponent implements OnInit, OnDestroy {
@Input() empid:number; 

    private designations;
    private categories;
    private teams;
    private status;
    private employee: Employee = new Employee();
    private employeeId: number;
    private designationFetchSub: Subscription;
    private emplooyeeFetchSub: Subscription;
    private categoryFetchSub: Subscription;
    private skillFetchSub: Subscription;
    private teamFetchSub: Subscription;
    private statusFetchSub: Subscription;
    private primarySkillsArray: Array<any> = [];
    private secondarySkillsArray: Array<any> = [];
    selectedPrimarySkills: any[]=[];
    selectedSecondarySkills:  any[]=[];
    settings = {};
    private takeAction: boolean;
    private actionHire: boolean;
    private showSpinner: Boolean = false;
    private managers: any[] = [];
    private isEditmode:boolean = false;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {

    }

    ngOnInit() {
        this.activatedRoute.params.forEach(params => {
            this.employeeId = params['employeeId'];
        });

        this.employee.skillsId = [];
        if (this.employeeId) {

            this.emplooyeeFetchSub = this.dataService.get('employee/get/' + this.employeeId)
                .finally(() => this.getOtherFields())
                .subscribe(
                    data => {
                        this.isEditmode=true;
                        this.employee = data;
                        data.Primary.forEach(item => {
                            this.selectedPrimarySkills.push({ id: item.Id, itemName: item.Name });
                           //this.onItemSelect(item,1);
                        });
                        data.Secondry.forEach(item => {
                            this.selectedSecondarySkills.push({ id: item.Id, itemName: item.Name });
                            //this.onItemSelect(item,2);
                        });
                    }
                );

        }
        if (!this.employeeId)
            this.getOtherFields();

        this.settings = {
            text: '--Select Skill--',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class'
        };



    }

    getOtherFields() {

        this.designationFetchSub = this.dataService.getList('designation')
            .subscribe(
                data => {
                    this.designations = data;
                }
            );
        this.categoryFetchSub = this.dataService.getList('category')
            .subscribe(
                data => {
                    this.categories = data;
                }
            );
        this.teamFetchSub = this.dataService.getList('team/getlist')
            .subscribe(
                data => {
                    this.teams = data;
                }
            );

        this.statusFetchSub = this.dataService.getList('status/getbyStatusTypeId/1')
            .subscribe(
                data => {
                    this.status = data;
                }
            );
        this.skillFetchSub = this.dataService.getList('skillset/getlist')
            .subscribe(
                data => {
                    this.primarySkillsArray = [];
                    this.secondarySkillsArray = [];
                    data.forEach(item => {
                        if (item.IsPrimary === 1) {
                            this.primarySkillsArray.push({ id: item.Id, itemName: item.Name });
                        } else {
                            this.secondarySkillsArray.push({ id: item.Id, itemName: item.Name });
                        }

                    });
                }
            );
        this.getEmpListByDesignationId(11);
    }

    getEmpListByDesignationId(id: number) {
        this.managers = [];

        this.dataService.getList('employee/getByDesignationId/' + id)
            .subscribe(
                (data) => {
                    data.forEach(x => {
                        this.managers.push({
                            id: x.Id,
                            name: x.Name,
                        });
                    });

                },
                error => {

                }
            );
    }

    ngOnDestroy() {
        if (!!this.designationFetchSub) {
            this.designationFetchSub.unsubscribe();
        }
        if (!!this.categoryFetchSub) {
            this.categoryFetchSub.unsubscribe();
        }
    }

    addNewEmployee() {
        if(this.isEditmode)
        {
            this.dataService.update('employee/put',this.employee)
            .finally(() => this.showSpinner=false )
            .subscribe(() => {
                this.router.navigate(['employees']);
            })
        }
        else{
            this.dataService.save('employee/post', this.employee)
            .finally(() => this.showSpinner = false)
            .subscribe(() => {
                this.router.navigate(['employees']);
            });
        }

    }

    cancel() {
        this.router.navigate(['employees']);
    }

    /* skill set */


    selectStatus(id: string) {
        this.takeAction = id === '3';
        console.log("team: " + this.employee.TeamId + this.employee.TeamName);
        console.log("desgination" + this.employee.Designation + this.employee.DesignationId);
        console.log("cat: " + this.employee.CategoryId + this.employee.Category);
    }

    selectCategory(id: string) {
        this.takeAction = id === '1';
    }

    selectAction(actionId: string) {
        this.actionHire = actionId === '1';
    }

    onItemSelect(item: any, skillId: number) {
        this.employee.skillsId.push(item.id);
    }

    OnItemDeSelect(item: any, skillId: number) {
        this.employee.skillsId.splice(this.employee.skillsId.indexOf(item.id), 1)
    }

    onSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsArray.forEach(element => {
                this.employee.skillsId.push(element.id)
            });

        } else {
            this.secondarySkillsArray.forEach(element => {
                this.employee.skillsId.push(element.id)
            });
        }
    }

    onDeSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsArray.forEach(element => {
                this.employee.skillsId.splice(this.employee.skillsId.find(element.id), 1)
            });
        } else {
            this.secondarySkillsArray.forEach(element => {
                this.employee.skillsId.splice(this.employee.skillsId.find(element.id), 1)
            });
        }
    }
}
