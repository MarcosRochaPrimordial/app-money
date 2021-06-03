import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public budgetChartOptions: any;
  public totalSpendingChartOptions: any;

  constructor() {
    this.budgetChartOptions = {
      series: [
        {
          name: "Final budget",
          data: [10, 41, 35, 51, 49, 62]
        },
        {
          name: "To save",
          data: [5, 20.5, 17.5, 25.5, 24.5, 31]
        }
      ],
      chart: {
        height: 285,
        type: "bar",
        stacked: true,
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      }
    };
    this.totalSpendingChartOptions = {
      series: [
        {
          name: "Salary",
          type: "column",
          data: [201, 352, 752, 320, 257, 160]
        },
        {
          name: "Total spendings",
          type: "line",
          data: [201, 352, 752, 320, 257, 160]
        }
      ],
      chart: {
        height: 285,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: ""
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
      ],
      xaxis: {
        type: "text"
      },
      yaxis: [
        {
          title: {
            text: "Salary"
          }
        },
        {
          opposite: true,
          title: {
            text: "Total spendings"
          }
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}
