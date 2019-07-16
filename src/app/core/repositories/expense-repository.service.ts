import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
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
    ).snapshotChanges().pipe(
      map((expenses: DocumentChangeAction<ExpenseBase>[]) => {
        return this.toDate(expenses);
      })
    );
  }

  toDate(expenses: DocumentChangeAction<ExpenseBase>[]): Expense[] {
    return expenses.map(expense => {
      return {
        id: expense.payload.doc.id,
        ...expense.payload.doc.data(),
        date: expense.payload.doc.data().date.toDate()
      };
    });
  }

  save(expense: Expense): void {
    this.afs.collection(this.collectionName).add(expense);
  }

  delete(id: string): void {
    this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
