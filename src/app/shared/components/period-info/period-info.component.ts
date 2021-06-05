import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-period-info',
  templateUrl: './period-info.component.html',
  styleUrls: ['./period-info.component.scss']
})
export class PeriodInfoComponent implements OnInit {

  date = new Date();

  constructor(
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
  }

}
