import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/core/interfaces/expense';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  @Input() expenses: Expense[];

  user: User;

  constructor(
    private snackbar: MatSnackBar,
    private expenseService: ExpenseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  deleteExpense(expense: Expense) {
    const result = this.expenseService.deleteExpense(expense, this.user);
    if (result) {
      this.snackbar.open('Aconteceu um erro inesperado.', 'Ok', {
        duration: 0
      });
    } else {
      this.snackbar.open('Excluído com sucesso!', 'Ok', {
        duration: 5000
      });
    }
  }

}
