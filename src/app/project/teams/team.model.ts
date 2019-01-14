import { List } from 'immutable';

export class Team {
    id: number;
    name: string;
    setupDate: Date;
    projectId: number;
    projectName: string;
}

export class TeamTasksDto {
    teamId: number;
    taskIds: Array<number>;
}
