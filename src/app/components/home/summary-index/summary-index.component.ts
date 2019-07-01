import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';
import { Wallet } from 'src/app/core/interfaces/wallet';

@Component({
  selector: 'app-summary-index',
  templateUrl: './summary-index.component.html',
  styleUrls: ['./summary-index.component.scss']
})
export class SummaryIndexComponent implements OnInit {

  debit = 0;
  credit = 0;

  constructor(
    private summaryService: SummaryService
  ) { }

  ngOnInit() {
    this.summaryService.getTotalValueFromDebts().subscribe((debit: number) => {
      if (debit) {
        this.debit = debit;

        this.summaryService.getTotalCash().subscribe((credit: number) => {
          this.credit = credit - this.debit;
        });
      }
    });

  }

}
