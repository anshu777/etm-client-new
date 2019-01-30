import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { TaskTime } from '../../shared/models/task-time.model';
declare let d3: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../node_modules/nvd3/build/nv.d3.css', './dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  pieChartOptions: {};
  pieChartData: {};
  lineChartOptions: {};
  lineChartData: {};
  taskvsTimeData: Array<any> = [];
  resignedJoined: Array<any> = [];
  resignedJoinedBarChartData: Array<any> = [];
  yearsofService: Array<any> = [];
  yearsofServiceBarChartData: Array<any> = [];
  averageTimeStay: Array<any> = [];
  averageTimeStayBarChartData: Array<any> = [];
  trainingCost: Array<any> = [];
  trainingCostBarChartData: Array<any> = [];
  maleFemaleRatio: Array<any> = [];
  maleFemaleRatioBarChartData: Array<any> = [];
  private taskTimeDto: Array<TaskTime>;
  private selectedMonthId: number;
  private selectedTeamId: number;
  private selectedYearId: number;
  private selectedMonth: string;
  private selectedTeam: number;
  private selectedYear: string;
  private showSpinner: Boolean = false;
  private dataFetchSub: Subscription;
  private isMonthlyReport: Boolean = false;
  private isQuarterlyReport: Boolean = false;
  private isYearlyReport: Boolean = false;
  private reportType: string;
  private xAxisLabel: string;
  private yAxisLabel: string;

  private reportTypes: Array<any> = [
    { id: 1, name: 'Resigned vs Joined', url: 'resignedvsjoined' },
    { id: 2, name: 'Attrition', url: 'attrition' },
    { id: 3, name: 'Years of Service', url: 'yearsofservice' },
    { id: 4, name: 'Average Time Stay', url: 'averagetimestay' },
    { id: 5, name: 'Training Costs', url: 'trainingcost' },
    { id: 6, name: 'Male to Female Ratio', url: 'malefemaleratio' }
  ];

  private duration: Array<any> = [
    { id: 1, name: 'Monthly' },
    { id: 2, name: 'Quarterly' },
    { id: 3, name: 'Yearly' }
  ];
  private quarter: Array<any> = [
    { id: 1, name: 'Q1' },
    { id: 2, name: 'Q2' },
    { id: 3, name: 'Q3' },
    { id: 4, name: 'Q4' }
  ];
  private years: Array<any> = [];
  private months: Array<any> = [
    { id: 1, name: 'Jan' },
    { id: 2, name: 'Feb' },
    { id: 3, name: 'Mar' },
    { id: 4, name: 'Apr' },
    { id: 5, name: 'May' },
    { id: 6, name: 'Jun' },
    { id: 7, name: 'Jul' },
    { id: 8, name: 'Aug' },
    { id: 9, name: 'Sep' },
    { id: 10, name: 'Oct' },
    { id: 11, name: 'Nov' },
    { id: 12, name: 'Dec' }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.years = [
      { id: 1, name: 2018 },
      { id: 2, name: 2019 }
    ];



  }

  onSelectMonth(id: any) {
    this.selectedMonthId = id;
    this.selectedMonth = this.months.find(x => x.id === Number(id)).name;
  }

  onSelectQuarter(id: any) {
    this.selectedTeamId = id;
  }

  onSelectYear(id: any) {
    this.selectedYearId = id;
    this.selectedYear = this.years.find(x => x.id === Number(id)).name;

  }

  getTeams() {
    this.showSpinner = true;
    // this.dataFetchSub = this.dataService.getList('team/getlist')
    //   .finally(() => this.showSpinner = false)
    //   .subscribe(
    //     data => {
    //       this.teams = data;
    //     }
    //   );
  }

  generateReport() {
    this.showSpinner = true;
    this.preparePieChart();
    this.prepareBarChart();
    this.bindReportData();
    this.showSpinner = false;
  }

  preparePieChart() {
    this.resignedJoined = [
      {
        'key': 'Resigned',
        'value': 7
      },
      {
        'key': 'Joined',
        'value': 2
      },
    ];

    this.yearsofService = [
      {
        'key': '1 Year',
        'value': 40
      },
      {
        'key': '2 Year',
        'value': 34
      },
      {
        'key': '3 Year',
        'value': 30
      },
      {
        'key': '5 Year',
        'value': 12
      }
    ];

    this.averageTimeStay = [
      {
        'key': '1 Year',
        'value': 44
      },
      {
        'key': '2 Year',
        'value': 26
      },
      {
        'key': '3 Year',
        'value': 27
      },
      {
        'key': '5 Year',
        'value': 3
      }
    ];

    this.trainingCost = [
      {
        'key': 'Quarter 1',
        'value': 40
      },
      {
        'key': 'Quarter 2',
        'value': 34
      },
      {
        'key': 'Quarter 3',
        'value': 30
      },
      {
        'key': 'Quarter 4',
        'value': 12
      }
    ];



    // const actionUrl = this.reportTypes.find(x => x.id === 1).url;
    // const reportUrl = `dashboard/` + actionUrl + `/` + this.selectedMonthId + `/` + this.selectedYear + `/` + this.selectedTeamId;
    // this.dataFetchSub = this.dataService
    //   .getList(reportUrl)
    //   .finally(() => {
    //     this.showSpinner = false;
    this.showPieChart();
    //   })
    //   .subscribe(
    //     data => {
    //       this.taskvsTimeData = [];
    //       this.taskTimeDto = data;
    //       this.taskTimeDto.forEach((elem: any) => {
    //         this.taskvsTimeData.push({ 'key': elem.TaskName, 'value': elem.HoursPercentage });
    //       });
    //     }
    //   );
  }

  showPieChart() {
    // Configure options for the pie chart
    this.pieChartOptions = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) { return d.key; },
        y: function (d) { return d.value; },
        showLabels: true,
        valueFormat: function (d) {
          return d3.format(',.0f')(d) + ' %';
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

  }



  prepareBarChart() {
    this.lineChartOptions = {
      chart: {
        type: 'multiBarChart',
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
          axisLabel: this.xAxisLabel,
          rotateLabels: 0
        },
        yAxis: {
          axisLabel: this.yAxisLabel,
          axisLabelDistance: -10
        },
        showLegend: true
      }
    };

    //  this.resignedJoinedBarChartData = [
    //   {
    //     'key': 2009,
    //     'value': 9
    //   },
    //   {
    //     'key': 2010,
    //     'value': 16
    //   },
    //   {
    //     'key': 2011,
    //     'value': 23
    //   },
    //   {
    //     'key': 2012,
    //     'value': 31
    //   },
    //   {
    //     'key': 2013,
    //     'value': 37
    //   },
    //   {
    //     'key': 2014,
    //     'value': 39
    //   },
    //   {
    //     'key': 2015,
    //     'value': 41
    //   },
    //   {
    //     'key': 2016,
    //     'value': 42
    //   }
    // ];
    this.resignedJoinedBarChartData = [
      {
        'key': 'Quarter 1',
        'values': [
          { 'label': 'Resigned', 'value': 3, 'color': '#a02728' },
          { 'label': 'Joined', 'value': 1, 'color': '#1f77b4' }
        ]
      },
      {
        'key': 'Quarter 2',
        'values': [
          { 'label': 'Resigned', 'value': 1, 'color': '#a02728' },
          { 'label': 'Joined', 'value': 2, 'color': '#1f77b4' }
        ]
      },
      {
        'key': 'Quarter 3',
        'values': [
          { 'label': 'Resigned', 'value': 3, 'color': '#a02728' },
          { 'label': 'Joined', 'value': 3, 'color': '#1f77b4' }
        ]
      },
      {
        'key': 'Quarter 4',
        'color': '#cc77b4',
        'values': [
          { 'label': 'Resigned', 'value': 2, 'color': '#a02728' },
          { 'label': 'Joined', 'value': 1, 'color': '#1f77b4' }
        ]
      }
    ];

    this.yearsofServiceBarChartData = [
      {
        'key': '1 Year',
        'color': '#d62728',
        'values': [
          { 'label': 'Group A', 'value': 40 }
        ]
      },
      {
        'key': '2 Years',
        'color': '#1f77b0',
        'values': [
          { 'label': 'Group B', 'value': 22 }
        ]
      },
      {
        'key': '3 Years',
        'color': '#cc2727',
        'values': [
          { 'label': 'Group C', 'value': 34 }
        ]
      },
      {
        'key': '5 Years',
        'color': '#dd77b3',
        'values': [
          { 'label': 'Group D', 'value': 6 }
        ]
      }
    ];

    // Bind data to the bar chart

    // [{
    //   values: employeesPerYear,
    //   color: '#7777ff',
    //   area: true
    // }];
  }

  bindReportData() {
    // Bind data to the pie chart
    if (this.reportType === 'resignedvsjoined') {
      this.pieChartData = this.resignedJoined;
      this.lineChartData = this.resignedJoinedBarChartData;
    } else if (this.reportType === 'attrition') {
      this.pieChartData = this.resignedJoined;
      this.lineChartData = this.resignedJoinedBarChartData;
    } else if (this.reportType === 'yearsofservice') {
      this.pieChartData = this.yearsofService;
      this.lineChartData = this.yearsofServiceBarChartData;
      this.yAxisLabel = 'Years of Service';
    } else if (this.reportType === 'averagetimestay') {
      this.pieChartData = this.averageTimeStay;
      this.lineChartData = this.averageTimeStayBarChartData;
      this.yAxisLabel = 'Average Time';
    } else if (this.reportType === 'trainingcost') {
      this.pieChartData = this.trainingCost;
      this.lineChartData = this.trainingCostBarChartData;
      this.yAxisLabel = 'Average Cost';
    } else if (this.reportType === 'malefemaleratio') {
      this.pieChartData = this.maleFemaleRatio;
      this.lineChartData = this.maleFemaleRatioBarChartData;
    }

  }

  onSelectReportType(id: any) {
    this.reportType = this.reportTypes.find(x => x.id === Number(id)).url;
  }

  onSelectDuration(id: any) {
    this.isMonthlyReport = this.isQuarterlyReport = this.isYearlyReport = false;
    if (Number(id) === 1) {
      this.isMonthlyReport = true;
      this.xAxisLabel = 'Months';
    } else if (Number(id) === 2) {
      this.isQuarterlyReport = true;
      this.xAxisLabel = 'Quarters';
    } else if (Number(id) === 3) {
      this.isYearlyReport = true;
      this.xAxisLabel = 'Years';
    }
  }
}
