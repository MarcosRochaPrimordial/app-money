import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';
import { User } from 'src/app/core/interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  user: User;
  expenses: Expense[] = [];
  debts: Expense[] = [];

  debtsSubscribe: Subscription;

  constructor(
    private summaryService: SummaryService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.debtsSubscribe = this.summaryService.getExpensesOfTheMonth(this.user).subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.debts = expenses.filter(expense => expense.wallet && expense.wallet.isCredit && !expense.isGain);
    });
  }

  routeRegisterExpense() {
    this.router.navigate(['expense']);
  }

  ngOnDestroy() {
    this.debtsSubscribe.unsubscribe();
  }

}
