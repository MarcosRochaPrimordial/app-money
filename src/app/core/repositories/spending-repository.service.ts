import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Spending } from 'src/app/shared/models/Spending.model';
import { PeriodRepositoryService } from './period-repository.service';

@Injectable({
  providedIn: 'root'
})
export class SpendingRepositoryService {

  private SPENDING_COLLECTION = 'spendings';

  constructor(
    private firestore: AngularFirestore,
    private periodRepository: PeriodRepositoryService,
  ) { }

  createPeriod(spending: Spending, periodId: string) {
    spending.period = this.periodRepository.periodDoc(periodId);
    return this.firestore.collection(this.SPENDING_COLLECTION).add(spending);
  }

  updatePeriod(spending: Spending) {
    return this.firestore.doc(`${this.SPENDING_COLLECTION}/${spending.id}`).update(spending);
  }

  getSpendingByPeriodId(periodId: string) {
    const periodDoc = this.periodRepository.periodDoc(periodId);
    return this.firestore
      .collection<Spending>(this.SPENDING_COLLECTION, ref => ref
        .where('period', '==', periodDoc)
        .orderBy('paid', 'desc'))
      .snapshotChanges()
      .pipe(map(this.toSpending));
  }

  toSpending(docs: DocumentChangeAction<Spending>[]): Spending[] {
    return docs.map(doc => ({
      id: doc.payload.doc.id,
      ...doc.payload.doc.data(),
    }) as Spending);
  }
}
