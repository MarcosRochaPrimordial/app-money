import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-summary-charts',
  templateUrl: './summary-charts.component.html',
  styleUrls: ['./summary-charts.component.scss']
})
export class SummaryChartsComponent implements OnInit {
  chart: any;

  constructor(
    private sumaryService: SummaryService
  ) { }

  ngOnInit() {
    this.chart = new Chart(document.getElementById('chart-category'), {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      }
    });

    this.sumaryService.getCategoriesOfDebts().subscribe((value: any) => {
      if (value) {
        this.chart.data.labels = Object.keys(value);
        const qtd = [];
        Object.keys(value).forEach((key: string) => {
          qtd.push(value[key].length);
          this.chart.data.datasets[0].backgroundColor.push(this.getRandomColor());
        });
        this.chart.data.datasets[0].data = qtd;
        this.chart.update();
      }
    });
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
