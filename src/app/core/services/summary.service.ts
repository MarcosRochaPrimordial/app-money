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

  // Get debts of the last month to further
  getLastDebts(): Observable<Expense[]> {
    const date = moment();
    return this.expenseRepository.getAllDebits().pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.filter(expense =>
            expense.date.getMonth() >= date.subtract('1', 'month').toDate().getMonth());
        }
      })
    );
  }

  // Get debts of the month
  getDebtsOfTheMonth(): Observable<Expense[]> {
    const date = new Date();
    return this.getLastDebts().pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.filter(expense => {
            if (expense.date.getMonth() === date.getMonth()
              || (expense.date.getMonth() < date.getMonth()
                && moment(expense.date).isAfter(moment().date(expense.wallet.flipDate)))) {
              return expense;
            }
          });
        }
      })
    );
  }

  // Get total value from debts
  getTotalValueFromDebts(): Observable<number> {
    return this.getDebtsOfTheMonth().pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.reduce((acc, curr) => {
            acc.value += curr.value;
            return acc;
          }).value;
        }
      })
    );
  }

  // Get categories from Debts of the month
  getCategoriesOfDebts(): Observable<any> {
    return this.getDebtsOfTheMonth().pipe(
      map((expenses: Expense[]) => {
        if (expenses.length > 0) {
          return expenses.reduce((acc, curr) => ({
            ...acc,
            [curr.category.description]: [...(acc[curr.category.description] || []), curr]
          }), {});
        }
      })
    );
  }

  // Get total account credit
  getTotalCash(): Observable<number> {
    return this.userRepository.getAccountCredit().pipe(
      map((users: User[]) => {
        if (users.length > 0) {
          return users.reduce((acc, curr) => {
            return acc;
          }).account;
        }
      })
    );
  }
}
