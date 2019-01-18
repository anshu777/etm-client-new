import { Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Subscription, Observable } from 'rxjs/Rx';
import { SkillSet } from '../../../shared/models/skill-set.model';
import { Project } from '../project.model';
import { Client } from '../../../shared/models/client.model';
import { Employee } from '../../../hr/employees/employee.model';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';

@Component({
    selector: 'et-project-crud',
    templateUrl: './project-crud.component.html',
    styleUrls: ['./project-crud.component.css']
})

export class ProjectCrudComponent implements OnInit, OnDestroy {
    @Input() project: Project = new Project();
    @Input() clients: Array<any> = [];
    @Input() projectManagers: Array<any> = [];
    @Output() clientItemIdChange = new EventEmitter();
    @Output() empItemIdChange = new EventEmitter();
    @Output() primarySkillsChange = new EventEmitter();
    @Output() secondarySkillsChange = new EventEmitter();
    primarySkillsArray: Array<any> = [];
    secondarySkillsArray: Array<any> = [];
    selectedPrimarySkills: Array<SkillSet> = [];
    public selectedSecondarySkills: Array<SkillSet> = [];
    private disableSave: Boolean = true;
    private skillFetchSub: Subscription;

    constructor(private router: Router, private dataService: DataService) {
    }

    ngOnInit() {
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
           if(this.project.id){
            this.selectedPrimarySkills = this.project.primarySkillIds;
            this.selectedSecondarySkills = this.project.secondarySkillIds;
           }
    }

    ngOnDestroy() {
        this.project = null;
        
        console.log("ngdestroy");
    }

    selectClientItem(id: number) {
        this.clientItemIdChange.emit(id);
    }

    selectEmployeeItem(id: number) {
        this.empItemIdChange.emit(id);
    }

    onItemSelect(item: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsChange.emit(this.selectedPrimarySkills);
        } else {
            this.secondarySkillsChange.emit(this.selectedSecondarySkills);
        }
    }

    OnItemDeSelect(item: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsChange.emit(this.selectedPrimarySkills);
        } else {
            this.secondarySkillsChange.emit(this.selectedSecondarySkills);
        }
    }

    onSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.selectedPrimarySkills = this.primarySkillsArray;
            this.primarySkillsChange.emit(this.selectedPrimarySkills);
        } else {
            this.selectedSecondarySkills = this.secondarySkillsArray;
            this.secondarySkillsChange.emit(this.selectedSecondarySkills);
        }
    }

    onDeSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.selectedPrimarySkills = [];
            this.primarySkillsChange.emit(this.selectedPrimarySkills);
        } else {

            this.selectedSecondarySkills= [];
            this.secondarySkillsChange.emit(this.selectedSecondarySkills);
        }
    }

   public clearSkills(){
        this.selectedPrimarySkills = [];
        this.selectedSecondarySkills = [];
    }
}
