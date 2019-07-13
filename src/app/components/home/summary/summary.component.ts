import { Component, OnInit, OnDestroy } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';
import { User } from 'src/app/core/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  user: User;
  expenses: Expense[] = [];

  debtsSubscribe: Subscription;

  constructor(
    private summaryService: SummaryService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.cookieService.get('user'));
    this.debtsSubscribe = this.summaryService.getDebtsOfTheMonth(this.user).subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
    });
  }

  ngOnDestroy() {
    this.debtsSubscribe.unsubscribe();
  }

}
