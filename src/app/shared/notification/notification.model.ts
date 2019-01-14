export class ETNotification {
    type: ETNotificationType;
    message: string;
}

export enum ETNotificationType {
    Success,
    Error,
    Info,
    Warning
}
