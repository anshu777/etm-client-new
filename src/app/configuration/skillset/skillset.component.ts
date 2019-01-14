import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { SkillSet } from './skillset.model';

@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  styleUrls: ['./skillset.component.css']
})
export class SkillsetComponent implements OnInit {
  displayedColumns = ['id', 'name', 'primary'];
  skillSet: any;

  errorMessage: string;
  title = 'Employee Status';
  private isSelected: boolean;
  private isSingleSelected: boolean;
  private selectedRows: Array<any> = [];
  private disableSave = false;
  private showEditMode = false;
  private showSpinner: Boolean = false;
  private dataFetchSub: Subscription;
  private Skset: SkillSet = new SkillSet();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {

    this.getskilllist();

  }
  mapData(data: any) {
    this.skillSet = new MatTableDataSource(data);
    this.skillSet.paginator = this.paginator;
    this.skillSet.sort = this.sort;
  }

  addNewSkill() {
    this.showSpinner = true;
    this.dataService.save('skillset/post', this.Skset)
      .finally(() => this.showSpinner = false)
      .subscribe(() => {
        this.getskilllist();
        this.Skset = new SkillSet();
        this.router.navigate(['cf/skillset']);
      });


  }

  cancel() {
    this.router.navigate(['configuration']);
  }

  getskilllist() {
    this.showSpinner = true;
    this.dataFetchSub = this.dataService.getList('skillset/getlist')
      .finally(() => this.showSpinner = false)
      .subscribe(
        data => {
          this.mapData(data);
        }
      );
  }
}
