import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { MRF } from './MRF.model';
import { SkillSet } from '../../shared//models/skill-set.model';
import { ETNotificationService } from '../../shared/services/notification.service'
import { Project } from '../../project/projects/project.model';

@Component({
    selector: 'app-raise-mrf',
    templateUrl: './raise-mrf.component.html',
    styleUrls: ['./raise-mrf.component.css']
})

export class RaiseMrfComponent implements OnInit {
    public MRF: MRF = new MRF();
    public projects: any;
    public designations: any;
    private designationFetchSub: Subscription;
    private skillFetchSub: Subscription;
    private primarySkillsArray: Array<any> = [];
    private secondarySkillsArray: Array<any> = [];
    selectedPrimarySkills: SkillSet[] = [];
    selectedSecondarySkills: SkillSet[] = [];
    settings = {};
    private showSpinner: Boolean = false;
    private managers: any[];
    private IsCitySelected: boolean = false;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
         private dataService: DataService, private notificationService: ETNotificationService) {
    }



    ngOnInit() {
        this.dataService.getList('project/getlist')
            .subscribe(
                data => {
                    console.log(data);
                    this.projects = data;
                }
            );

        this.designationFetchSub = this.dataService.getList('designation')
            .subscribe(
                data => {
                    this.designations = data;
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

        this.getEmpListByDesignationId(6);
    }

    addNewMRFRaise() {
        this.dataService.save('MRF/post', this.MRF)
        .finally(() => this.router.navigate['employees'])
            .subscribe(
                (success) => {
                    // this.onSuccess(success);
                    this.notificationService.success('Saved Successfully'); 
                }
                
            );
    }

    setIsCitySelected(){
        this.IsCitySelected = true;
    }
    resetIsCitySelected(){
        this.IsCitySelected = false;
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

    onItemSelect(item: any, skillId: number) {
        this.MRF.skillsId.push(item.id);
    }

    OnItemDeSelect(item: any, skillId: number) {
        this.MRF.skillsId.splice(this.MRF.skillsId.find(item.id), 1);
    }

    onSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsArray.forEach(element => {
                this.MRF.skillsId.push(element.id);
            });

        } else {
            this.secondarySkillsArray.forEach(element => {
                this.MRF.skillsId.push(element.id);
            });
        }
    }

    onDeSelectAll(items: any, skillId: number) {
        if (skillId === 1) {
            this.primarySkillsArray.forEach(element => {
                this.MRF.skillsId.splice(this.MRF.skillsId.find(element.id), 1)
            });
        } else {
            this.secondarySkillsArray.forEach(element => {
                this.MRF.skillsId.splice(this.MRF.skillsId.find(element.id), 1)
            });
        }
    }




}
