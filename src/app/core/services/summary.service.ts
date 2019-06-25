import { Injectable } from '@angular/core';
import { ExpenseRepositoryService } from '../repositories/expense-repository.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { WalletRepositoryService } from '../repositories/wallet-repository.service';
import { Expense } from '../interfaces/expense';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(
    private expenseRepository: ExpenseRepositoryService,
    private walletRepository: WalletRepositoryService
  ) { }

  getAllDebits(): Observable<Expense[]> {
    return this.expenseRepository.getAllDebits();
  }

  getDebitsOfTheMonth(): Observable<Expense[]> {
    const date = moment();
    return this.getAllDebits().pipe(
      map((expenses: Expense[]) => {
        return expenses.filter(expense => expense.date.toDate().getFullYear() === date.year()
          && expense.date.toDate().getMonth() === date.month());
      })
    );
  }

  getCategoriesOfDebits(): Observable<any> {
    return this.getDebitsOfTheMonth().pipe(
      map((expenses: Expense[]) => {
        return expenses.reduce((acc, curr) => ({
          ...acc,
          [curr.category.description]: [...(acc[curr.category.description] || []), curr]
        }), {});
      })
    );
  }

  getDebitsFromExpenses(): Observable<number> {
    return this.getDebitsOfTheMonth().pipe(
      map((expenses: Expense[]) => {
        return expenses.reduce((acc, curr) => {
          acc.value += curr.value;
          return acc;
        }).value;
      })
    );
  }

  getTotalCash(): Observable<number> {
    return this.walletRepository.getTotalCash().pipe(
      map((wallets: Wallet[]) => {
        return wallets.reduce((acc, curr) => {
          return acc;
        }).limit;
      })
    );
  }


}
