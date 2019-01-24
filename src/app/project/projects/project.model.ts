export class Project {
    id: number;
    projectName: string;
    projectManagerId: number;
    projectManager: string;
    clientId: number;
    clientName: string;
    officeAddress: string;
    startDate: Date;
    dueDate: Date;
    comments: string;
    primarySkillIds: Array<any>;
    secondarySkillIds: Array<any>;
}
