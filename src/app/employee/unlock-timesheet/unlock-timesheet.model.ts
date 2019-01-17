export class TimesheetRequest
{
    id:number;
    empid:number;
    reason:string;
    status:number;              //1 for pending, 2 for approved, 3 for rejected
    managerid:number;

    constructor()
    {
        this.id=0;
        this.empid=0;
        this.reason="";
        this.status=0;
        this.managerid=0;
    }
}