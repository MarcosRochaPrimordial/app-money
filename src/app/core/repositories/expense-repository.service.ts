import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Expense, ExpenseBase } from '../interfaces/expense';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseRepositoryService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllDebits(): Observable<Expense[]> {
    return this.afs.collection<ExpenseBase>('expense',
      ref => ref.where('isGain', '==', false)
        .orderBy('category')
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
}
