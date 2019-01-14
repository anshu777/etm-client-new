import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import {Status} from './status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  displayedColumns = ['id', 'name','type'];
  employeeStatus: any;
  status:Status = new Status();
  statustype:any;

  errorMessage: string;
  title = 'Employee Status';
  private isSelected: boolean;
  private isSingleSelected: boolean;
  private selectedRows: Array<any> = [];
  private disableSave = false;
  private showEditMode = false;
  private showSpinner: Boolean = false;
  private dataFetchSub: Subscription;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.getStatuslist();
    this.getTypeList();
    this.showSpinner = false;

      
  }
  mapData(data: any) {
    this.employeeStatus = new MatTableDataSource(data);
    this.employeeStatus.sort = this.sort;
  }

  addNewStatus(){
    console.log("in new status before add");

    this.dataService.save('status/post',this.status)
    .finally(() => this.showSpinner=false)
    .subscribe(
      data => {
        console.log(data);
        this.getStatuslist();
        this.status = new Status();
        this.router.navigate(['status']);
      }
    )
  }

  getStatuslist(){
    this.dataService.getList('status/getlist')
      .finally(() => this.showSpinner = false)
      .subscribe(
        data => {
          this.mapData(data);
        }
      );

  }

  getTypeList(){
    this.dataService.getList('status/gettypelist')
      .finally(() => this.showSpinner = false)
      .subscribe(
        data => {
          this.statustype = data;
        }
      );
  }

  cancel(){
    this.router.navigate(['configuration']);
  }
}
