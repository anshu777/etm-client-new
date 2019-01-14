export class DesignationHeadCountReportDto {
    Role: string;
    DesignationStatusDto: Array<DesignationStatusDto>;

}

export class DesignationStatusDto {
    EmployeeDesignation: string;
    Approved: number;
    Shadow: number;
    Total: number;
}
