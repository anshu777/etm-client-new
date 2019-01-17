import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { TimesheetRequest } from './unlock-timesheet.model';

@Component({
  selector: 'app-unlock-timesheet',
  templateUrl: './unlock-timesheet.component.html',
  styleUrls: ['./unlock-timesheet.component.css']
})
export class UnlockTimesheetComponent implements OnInit {
  title="Request to unlock TimeSheet";
  private prjmngrId:number=0;
  private managers:any[];
  private reason:any=0;
  private reasontext:any;
  private finalreason:any;
  private timesheetRequest:TimesheetRequest = new TimesheetRequest();
  constructor(private dataservice:DataService,private router:Router) { }

  ngOnInit() {
    this.managers = this.dataservice.getEmpListByDesignationId(6);
   
  }

  saveRequest()
  {
    if(this.reason==1)
    this.finalreason="forgot";
    else
    this.finalreason=this.reasontext;
    console.log(this.finalreason);
    
    this.timesheetRequest.empid=6;
    this.timesheetRequest.managerid = 5;
    this.timesheetRequest.reason=this.finalreason;
    this.timesheetRequest.status=1;
    
     this.dataservice.save('timesheet/request',this.timesheetRequest)
     .subscribe(
       data => {
         console.log(data);
       }
     );

    this.reason=0;
    this.reasontext="";
    
    
  }

}
