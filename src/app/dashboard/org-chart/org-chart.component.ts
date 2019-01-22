import { Component,OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector:    'et-org-chart',
    templateUrl: './org-chart.component.html'
})

export class OrgChartComponent implements OnInit {
    topEmployee: any 
    private projectId: number
    public projects: any;
    private showSpinner: boolean;
    private showOrgChart: boolean;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    }
    ngOnInit(){
        this.showOrgChart = false;
        this.dataService.getList('project/getlist')
        .subscribe(
            data =>{
                this.projects = data;
            }
        );
    }
    
    getEmpByProject(){
        this.showOrgChart = true;
        this.showSpinner = true;
        this.topEmployee = null;
        this.dataService.get('getByProjectId/' + this.projectId) 
        .finally(() => this.showSpinner=false)
        .subscribe(
            data => {
                this.topEmployee = data;
            }
        );
    }
}
