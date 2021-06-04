import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public budgetChartOptions: any;

  constructor(
    private translateService: TranslateService,
    private currencyService: CurrencyService,
  ) {
    this.budgetChartOptions = {
      series: [
        {
          name: this.translateService.translate('budget'),
          type: "column",
          data: [10, 41, 35, 51, 49, 62]
        },
        {
          name: this.translateService.translate('total_spendings'),
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9]
        },
        {
          name: this.translateService.translate('salary'),
          type: "line",
          data: [20, 50, 48, 60, 70, 80]
        }
      ],
      chart: {
        height: 285,
        type: "line",
        stacked: true,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      title: {
        text: this.translateService.translate('strategic_vision'),
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      },
      dataLabels: {
        enabled: true,
        distributed: true,
        formatter: (value: number) => {
          value = value * 100;
          return `${this.currencyService.currencyType} ${this.currencyService.transform(value)}`;
        },
      }
    };
  }

  ngOnInit(): void {
  }

}
