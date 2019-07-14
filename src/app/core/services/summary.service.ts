import { Injectable } from '@angular/core';
import { ExpenseRepositoryService } from '../repositories/expense-repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Expense } from '../interfaces/expense';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(
    private expenseRepository: ExpenseRepositoryService,
    private userRepository: UserRepositoryService
  ) { }

  // Get debts of the month
  getExpensesOfTheMonth(user: User): Observable<Expense[]> {
    return this.expenseRepository.getAllExpenses(user).pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.filter(expense => {
              if (expense.date.getMonth() >= moment().subtract('1', 'month').toDate().getMonth()) {
                return expense;
              }
            })
            .filter(expense => {
              if (expense.date.getMonth() === moment().month()
                || (expense.date.getMonth() < moment().month()
                  && moment(expense.date).isAfter(moment().date(expense.wallet.flipDate)))) {
                return expense;
              }
            });
        }

        return expenses;
      })
    );
  }

  // Get total value from debts
  getTotalValueFromDebts(expenses: Expense[]): number {
    if (expenses.length > 0) {
      return expenses.reduce((acc, curr) => {
        acc.value += curr.value;
        return acc;
      }).value;
    }

    return 0;
  }

  // Get categories from Debts of the month
  getCategoriesOfDebts(expenses: Expense[]): any {
    if (expenses.length > 0) {
      return expenses.reduce((acc, curr) => ({
        ...acc,
        [curr.category.description]: [...(acc[curr.category.description] || []), curr]
      }), {});
    }
  }

  // Get total account credit
  getTotalCash(user: User): Observable<number> {
    return this.userRepository.getUser(user).pipe(
      map((users: User[]) => {
        if (users.length > 0) {
          return users.reduce((acc, curr) => {
            return acc;
          }).account;
        }

        return 0;
      })
    );
  }
}
