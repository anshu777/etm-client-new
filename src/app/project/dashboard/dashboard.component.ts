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
  private taskTimeDto: Array<TaskTime>;
  private selectedMonthId: number;
  private selectedTeamId: number;
  private selectedYearId: number;
  private selectedMonth: string;
  private selectedTeam: number;
  private selectedYear: string;
  private showSpinner: Boolean = false;
  private dataFetchSub: Subscription;
  private teams: Array<any> = [];
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


    this.getTeams();

  }

  onSelectMonth(id: any) {
    this.selectedMonthId = id;
    this.selectedMonth = this.months.find(x => x.id === Number(id)).name;
  }

  onSelectTeam(id: any) {
    this.selectedTeamId = id;
  }

  onSelectYear(id: any) {
    this.selectedYearId = id;
    this.selectedYear = this.years.find(x => x.id === Number(id)).name;

  }

  getTeams() {
    this.showSpinner = true;
    this.dataFetchSub = this.dataService.getList('team/getlist')
      .finally(() => this.showSpinner = false)
      .subscribe(
        data => {
          this.teams = data;
        }
      );
  }

  taskTimeReport() {
    this.getTaskVsTimeData();
    this.prepareBarChart();
  }

  getTaskVsTimeData() {
    // this.taskvsTimeData = [
    //   {
    //     'key': 'Analysis',
    //     'value': 7
    //   },
    //   {
    //     'key': 'Coding',
    //     'value': 9
    //   },
    //   {
    //     'key': 'Bug Fixing',
    //     'value': 7
    //   },
    //   {
    //     'key': 'Sprint Meetings',
    //     'value': 11
    //   },
    //   {
    //     'key': 'Training',
    //     'value': 2
    //   },
    //   {
    //     'key': 'Others',
    //     'value': 2
    //   },
    //   {
    //     'key': 'Leave',
    //     'value': 4
    //   }
    // ];

    this.showSpinner = true;
    const reportUrl = `dashboard/gettasktimechart/` + this.selectedMonthId + `/` + this.selectedYear + `/` + this.selectedTeamId;
    this.dataFetchSub = this.dataService
      .getList(reportUrl)
      .finally(() => {
        this.showSpinner = false;
        this.prepareTaskVsTimeChart();
      })
      .subscribe(
        data => {
          this.taskvsTimeData = [];
          this.taskTimeDto = data;
          this.taskTimeDto.forEach((elem: any) => {
            this.taskvsTimeData.push({ 'key': elem.TaskName, 'value': elem.HoursPercentage });
          });
        }
      );
  }

  prepareTaskVsTimeChart() {
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

    // Bind data to the pie chart
    this.pieChartData = this.taskvsTimeData;
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
          axisLabel: 'Team',
          rotateLabels: 0
        },
        yAxis: {
          axisLabel: 'Hours',
          axisLabelDistance: -10
        },
        showLegend: true
      }
    };

    const employeesPerYear = [
      {
        'key': 'Planned',
        'color': '#d62728',
        'values': [
          { 'label': 'Group A', 'value': 61 }
        ]
      },
      {
        'key': 'Actual',
        'color': '#1f77b4',
        'values': [
          { 'label': 'Group A', 'value': 45 }
        ]
      }
    ];

    // Bind data to the bar chart
    this.lineChartData = employeesPerYear;
    // [{
    //   values: employeesPerYear,
    //   color: '#7777ff',
    //   area: true
    // }];
  }

}
