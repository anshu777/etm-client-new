export class Employee {
    Id: number;
    BSIPLid: number;
    Name: string;
    DesignationId: number;
    Designation: string;
    DateOfJoin: Date;
    CategoryId: number;
    Category: string;
    ProjectStatus: number;
    ProjectStatusName: string;
    JoiningCtc: number;
    Status: number;
    StatusName: string;
    TeamId: number;
    TeamName: string;
    ExperienceBeforeJoining: number;
    Remarks: string;
    Aadhar: string;
    PAN: string;
    BankAccAtJoining: string;
    SalaryAcc: string;
    UAN: string;
    ContactNo: string;
    AltContactNo: string;
    ReportingMgr: number;
    ResignationDate: string;
    RelievingDate: string;
    PermanentAddr: string;
    CorrespondenceAddr: string;
    Email: string;
    AltEmail: string;
    skillsId: any[] = [];
    constructor() {
        this.Id = null;
        this.BSIPLid = null;
        this.Name = '';
        this.DesignationId = 0;
        this.Designation = '';
        this.DateOfJoin = null;
        this.CategoryId = 0;
        this.Category = '';
        this.ProjectStatus = 0;
        this.ProjectStatusName = '';
        this.JoiningCtc = null;
        this.Status = 0;
        this.StatusName = '';
        this.TeamId = 0;
        this.TeamName = '';
        this.ExperienceBeforeJoining = null;
        this.Remarks = '';
        this.Aadhar = '';
        this.PAN = '';
        this.BankAccAtJoining = '';
        this.SalaryAcc = '';
        this.UAN = '';
        this.ContactNo = '';
        this.AltContactNo = '';
        this.ReportingMgr = null;
        this.ResignationDate = '';
        this.RelievingDate = '';
        this.PermanentAddr = '';
        this.CorrespondenceAddr = '';
        this.Email = '';
        this.AltEmail = '';
        this.skillsId = [];
    }
}
