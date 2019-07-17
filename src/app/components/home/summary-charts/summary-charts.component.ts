import { Component, OnInit, Input } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import Chart from 'chart.js';
import { Expense } from 'src/app/core/interfaces/expense';

@Component({
  selector: 'app-summary-charts',
  templateUrl: './summary-charts.component.html',
  styleUrls: ['./summary-charts.component.scss']
})
export class SummaryChartsComponent implements OnInit {

  chartCategory: any;
  chartWallet: any;

  @Input() set expenses(expenses: Expense[]) {
    this.chartCategory = new Chart(document.getElementById('chart-category'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      }
    });
    this.chartWallet = new Chart(document.getElementById('chart-wallet'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      }
    });

    const value = this.sumaryService.getCategoriesOfDebts(expenses);
    if (value) {
      this.chartCategory.data.labels = Object.keys(value);
      const qtd = [];
      Object.keys(value).forEach((key: string) => {
        qtd.push(value[key].length);
        this.chartCategory.data.datasets[0].backgroundColor.push(this.getRandomColor());
      });
      this.chartCategory.data.datasets[0].data = qtd;
      this.chartCategory.update();
    }
    const valuewallets = this.sumaryService.getWalletsOfDebts(expenses);
    if (valuewallets) {
      this.chartWallet.data.labels = Object.keys(valuewallets);
      const qtd = [];
      Object.keys(valuewallets).forEach((key: string) => {
        qtd.push(valuewallets[key].length);
        this.chartWallet.data.datasets[0].backgroundColor.push(this.getRandomColor());
      });
      this.chartWallet.data.datasets[0].data = qtd;
      this.chartWallet.update();
    }
  }

  constructor(
    private sumaryService: SummaryService
  ) { }

  ngOnInit() {
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
