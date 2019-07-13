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

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllDebits(user: User): Observable<Expense[]> {
    return this.afs.collection<ExpenseBase>('expense',
      ref => ref.where('isGain', '==', false)
        .where('user.email', '==', user.email)
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

  save(expense: Expense) {
    this.afs.collection('expense').add(expense);
  }
}
