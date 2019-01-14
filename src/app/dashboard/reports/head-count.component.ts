import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Employee } from '../../hr/employees/employee.model';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs/Rx';
import { DesignationHeadCountReportDto, DesignationStatusDto } from './report.models';
declare let d3: any;

@Component({
    selector: 'et-head-count',
    templateUrl: './head-count.component.html',
    styleUrls: ['../../../../node_modules/nvd3/build/nv.d3.css', 'head-count.css'],
    encapsulation: ViewEncapsulation.None
})

export class HeadCountReportComponent implements OnInit, OnDestroy {
    title = 'HeadCount';
    positions: number;
    offices: number;
    employees: Array<any> = [];
    lineChartOptions: {};
    lineChartData: {};
    pieChartOptions: {};
    pieChartData: {};
    private employeeArray: Employee[];
    private techSummaryArray: Array<any> = [];
    private techDetailsArray: Array<any> = [];
    private designationDetailArray: Array<DesignationHeadCountReportDto> = [];
    private dataFetchSub: Subscription;
    private dataTechnologySub: Subscription;
    showProjectReport: boolean;
    showTechSummaryReport: boolean;
    showDesignationReport: boolean;
    showSpinner: boolean;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        /* Initialize this.* bindable members with data.* members */
        //let data = this.route.snapshot.data['dashboard'];
        // this.positions = data.totalPositions;
        // this.offices = data.totalOffices;
        // this.employees = data.totalEmployees;
        // this.setupCharts(data);
    }


    ngOnDestroy() {
        if (!!this.dataFetchSub) {
            this.dataFetchSub.unsubscribe();
        }
    }

    getProjectReport() {
        this.showSpinner = true;
        this.dataFetchSub = this.dataService.getList('employee/getallbyclients')
            .subscribe(
                data => {
                    this.employees = data;
                    this.showProjectReport = true;
                    this.showSpinner = false;
                }
            );
    }

    getTechnologyReport() {

        this.dataFetchSub = this.dataService.getList('employee/getsummarybytechnology')
            .subscribe(
                data => {
                    this.techSummaryArray = data;
                }
            );
        this.showSpinner = true;
        this.dataTechnologySub = this.dataService.getList('employee/getdetailbytechnology')
            .finally(() =>
                this.prepareTechnologyReport()
            )
            .subscribe(
                data => {
                    this.employees = data;
                }
            );
    }

    prepareTechnologyReport() {
        this.techDetailsArray = [];
        this.techSummaryArray.forEach(x => {
            this.techDetailsArray.push({
                name: x.Technology,
                employee: this.employees.filter(y => y.TechnologyName === x.Technology)
            });
        });

        this.showTechSummaryReport = true;
        this.showSpinner = false;
    }

    getDesignationReport() {
        this.showSpinner = true;
        this.dataFetchSub = this.dataService.getList('designation/getsummarybydesignation')
            .finally(() =>
                this.prepareDesignationReport()
            )
            .subscribe(
                data => {
                    this.designationDetailArray = data;
                }
            );
    }

    prepareDesignationReport() {
        // this.designationDetailArray = [];
        // this.techSummaryArray.forEach(x => {
        //     this.techDetailsArray.push({
        //         name: x.Technology,
        //         employee: this.employees.filter(y => y.TechnologyName === x.Technology)
        //     });
        // });

        this.showDesignationReport = true;
        this.showSpinner = false;
    }


    selectKey(reportTypeId) {
        this.showDesignationReport = this.showProjectReport = this.showTechSummaryReport = false;
        if (reportTypeId === '1') {
            this.getProjectReport();

        } else if (reportTypeId === '2') {
            this.getTechnologyReport();
        } else if (reportTypeId === '4') {
            this.getDesignationReport();
        }
    }

    private setupCharts(data) {
        // Configure options for the bar chart
        this.lineChartOptions = {
            chart: {
                type: 'historicalBarChart',
                height: 500,
                margin: {
                    top: 40,
                    right: 50,
                    bottom: 60,
                    left: 30
                },
                x: function (d) { return d.key; },
                y: function (d) { return d.value; },
                xAxis: {
                    axisLabel: 'Years',
                    rotateLabels: 30
                },
                yAxis: {
                    axisLabel: 'Employees',
                    axisLabelDistance: -10
                },
                showLegend: false
            }
        };

        // Bind data to the bar chart
        this.lineChartData = [{
            values: data.employeesPerYear,
            color: '#7777ff',
            area: true
        }];

        // Configure options for the pie chart
        this.pieChartOptions = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function (d) { return d.key; },
                y: function (d) { return d.value; },
                showLabels: true,
                valueFormat: function (d) {
                    return d3.format(',.0f')(d) + ' employees';
                },
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        // Bind data to the pie chart
        this.pieChartData = data.employeesPerOffice;
    }
}