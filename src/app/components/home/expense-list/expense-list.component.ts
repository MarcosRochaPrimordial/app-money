import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = [];

  constructor(
    private summaryService: SummaryService
  ) { }

  ngOnInit() {
    this.summaryService.getDebtsOfTheMonth().subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
    });
  }

}
