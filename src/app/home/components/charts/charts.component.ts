import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { SpendingService } from 'src/app/core/services/spending.service';
import { Period } from 'src/app/shared/models/Period.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public budgetChartOptions: any;
  private chart: any;

  constructor(
    private translateService: TranslateService,
    private currencyService: CurrencyService,
    private spendingService: SpendingService,
  ) { }

  ngOnInit(): void {
    this.budgetChartOptions = {
      // colors: [],
      // labels: [],
      // responsive: [],
      series: [
        {
          name: this.translateService.translate('budget'),
          data: [],
        },
      ],
      chart: {
        height: 285,
        type: "bar",
      },
      title: {
        text: this.translateService.translate('strategic_vision'),
      },
      xaxis: {
        categories: []
      },

      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        },
        offsetY: -20,
        formatter: (value: number) => {
          value = value * 100;
          return `${this.currencyService.currencyType} ${this.currencyService.transform(value)}`;
        },
      }
    };
    this.chart = new ApexCharts(document.querySelector("#budgetChart"), this.budgetChartOptions);
    this.chart.render();
    this.getTotalBudgets();
  }

  private getTotalBudgets() {
    this.spendingService.getSpendingsNextPeriods(new Date(), 6)
      .subscribe(nextPeriods => {
        this.budgetChartOptions.xaxis.categories = [];
        this.budgetChartOptions.series[0].data = [];
        nextPeriods.forEach((subscriber: any) => {
          subscriber
            .subscribe(([fixeds, outgoings, incomes, period]: [number, number, number, Period]) => {
              const { budget } = this.spendingService.calculateValues(fixeds, outgoings, incomes, period.importance);
              this.budgetChartOptions.xaxis.categories.push(period.name);
              this.budgetChartOptions.series[0].data.push(budget);
              this.chart.updateOptions(this.budgetChartOptions);
            });
        });
      });
  }
}
