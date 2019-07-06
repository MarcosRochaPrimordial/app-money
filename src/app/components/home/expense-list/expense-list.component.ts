import { Component, OnInit, Input } from '@angular/core';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Expense } from 'src/app/core/interfaces/expense';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  @Input() expenses: Expense[];

  constructor() { }

  ngOnInit() {}

}
