import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Expense, ExpenseBase } from '../interfaces/expense';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ExpenseRepositoryService {

  private collectionName: string = 'expense';

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllExpenses(user: User): Observable<Expense[]> {
    return this.afs.collection<ExpenseBase>(this.collectionName,
      ref => ref.where('user.email', '==', user.email)
        .orderBy('date', 'desc')
    ).valueChanges().pipe(
      map((expenses: ExpenseBase[]) => {
        return this.toDate(expenses);
      })
    );
  }

  toDate(expenses: ExpenseBase[]): Expense[] {
    return expenses.map(expense => ({
      ...expense,
      date: expense.date.toDate()
    }));
  }

  save(expense: Expense): void {
    this.afs.collection('expense').add(expense);
  }
}
