import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Expense } from '../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseRepositoryService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllDebits(): Observable<Expense[]> {
    return this.afs.collection<Expense>('expense',
      ref => ref.where('isGain', '==', false)
        .orderBy('category')
    ).valueChanges();
  }
}
