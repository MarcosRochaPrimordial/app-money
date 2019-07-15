import { Component, OnInit, Input } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-summary-index',
  templateUrl: './summary-index.component.html',
  styleUrls: ['./summary-index.component.scss']
})
export class SummaryIndexComponent implements OnInit {

  @Input() set expenses(expenses: Expense[]) {
    const expensess = JSON.parse(JSON.stringify(expenses)) as Expense[];
    this.debit = this.summaryService.getTotalValueFromDebts(expensess);
  }
  user: User;
  debit = 0;
  credit = 0;

  constructor(
    private summaryService: SummaryService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;

    this.summaryService.getTotalCash(this.user).subscribe((credit: number) => {
      this.credit = credit;
    });
  }

}
