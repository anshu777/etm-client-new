export class Project {
    id: number;
    projectName: string;
    projectManagerId: number;
    projectManager: string;
    clientId: number;
    clientName: string;
    officeAddress: string;
    startDate: string;
    dueDate: string;
    comments: string;
    primarySkillIds: Array<any>;
    secondarySkillIds: Array<any>;
}
