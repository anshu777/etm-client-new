export class MRF {
    Project: number;
    ProjectMgr: number;
    DesignationId: number;
    NoOfEmployess: number;
    OfferedSalary: number;
    PositionRequestedBudgeted: boolean;
    Remarks: string;
    IsApproved: boolean;
    Date: Date;
    skillsId: number[];
    NewRequest: boolean;
    YearsOfExp: number;
    Location: string;

    constructor() {
        this.Project = 0;
        this.ProjectMgr = 0;
        this.DesignationId = 0;
        this.NoOfEmployess = 0;
        this.OfferedSalary = 0;
        this.PositionRequestedBudgeted = null;
        this.Remarks = null;
        this.IsApproved = null;
        this.Date = null;
        this.skillsId = [];
        this.NewRequest = null;
        this.YearsOfExp = 0;
        this.Location = '';
    }
}