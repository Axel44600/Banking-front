import {Component, OnInit} from '@angular/core';
import {LightInfoInput} from "../../components/light-info/light-info.component";
import {StatisticsService} from "../../services/services/statistics.service";
import {HelperService} from "../../services/helper/helper.service";
import {lastValueFrom} from "rxjs";
import {Label} from "ng2-charts";
import {ChartDataSets, ChartType} from "chart.js";
import {DatepickerOptions} from "ng2-datepicker";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  accountInfoList: Array<LightInfoInput> = [];
  private accoutBalance = 0;
  private highestTransfer = 0;
  private highestDeposit = 0;
  chartType: ChartType = 'line';
  dataset: ChartDataSets[] | any = [];
  labels: Label[] = [];
  chartOptions: any = {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 16,
        usePointStyle: true
      }
    }
  };
  dateOptions: DatepickerOptions = {
    format: 'yyyy-MM-dd'
  };
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(
    private statisticService: StatisticsService,
    private helperService: HelperService,
    private datePipe: DatePipe
  ) {
  }

  filterStatistics() {
    console.log(this.startDate);
    this.statisticService.findSumTractionsByDate({
    'id': this.helperService.userId,
    'start-date': this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string,
    'end-date': this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string
    }).subscribe({
      next: (data) => {
        this.dataset = [];
        this.labels = [];
        const chartDataSet: ChartDataSets = {};
        const dataValues: Array<number> = [];
        for(let record of data) {
          this.labels.push(record.transactionDate as string);
          dataValues.push(record.amount as number);
        }
        chartDataSet.data = dataValues;
        chartDataSet.label = 'Sum transactions by day'
        this.dataset.push(chartDataSet);
      }
    })
  }

  ngOnInit(): void {
    this.initializeAccountInfo();
  }

  private async initializeAccountInfo() {
    this.accoutBalance = await lastValueFrom(this.statisticService.getAccountBalance({'id': this.helperService.userId}));
    this.highestTransfer = await lastValueFrom(this.statisticService.highestTransfert({'id': this.helperService.userId}));
    this.highestDeposit = await lastValueFrom(this.statisticService.highestDeposit({'id': this.helperService.userId}));

    this.accountInfoList = [
      {
        title: 'Account balance',
        amount: this.accoutBalance,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest transfer',
        amount: this.highestTransfer,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest deposit',
        amount: this.highestDeposit,
        infoStyle: 'bg-success'
      }
    ];
  }

}
