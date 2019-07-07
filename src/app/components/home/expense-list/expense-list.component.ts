import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/core/interfaces/expense';

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
