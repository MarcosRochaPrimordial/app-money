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
  getDebtsOfTheMonth(user: User): Observable<Expense[]> {
    const date = moment();
    return this.expenseRepository.getAllDebits(user).pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.filter(expense => expense.wallet != null && (expense.wallet.isCredit === true))
            .filter(expense => expense.date.getMonth() >= date.subtract('1', 'month').toDate().getMonth())
            .filter(expense => {
              if (expense.date.getMonth() === date.month()
                || (expense.date.getMonth() < date.month()
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
