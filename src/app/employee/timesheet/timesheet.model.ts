export class TimesheetColumn {
  id: number;
  employeeId: number;
  taskId: number;
  dayName: string;
  date: Date;
  hours: number;
 // approved: boolean;
}

export class TimesheetRow {
  id: number;
  taskId: number;
  taskName: string;
  timesheetColumns: TimesheetColumn[];
  totalHours: number;
}

export class EmployeeTimesheet {
  employeeId: number;
  teamId: number;
  timesheetRows: TimesheetRow[];
}

export class UserDateDto {
  userId: number;
  date: Date;
  employeeId: number;
  teamId: number;
}
