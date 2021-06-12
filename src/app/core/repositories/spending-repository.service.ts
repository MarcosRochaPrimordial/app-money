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

  public createSpending(spending: Spending, periodId: string) {
    spending.period = this.periodRepository.periodDoc(periodId);
    this.firestore.collection(this.SPENDING_COLLECTION).add(spending);
  }

  public updateSpending(spending: Spending) {
    this.firestore.doc(`${this.SPENDING_COLLECTION}/${spending.id}`).update(spending);
  }

  public deleteSpending(spending: Spending) {
    this.firestore.doc(`${this.SPENDING_COLLECTION}/${spending.id}`).delete();
  }

  public getSpendingByPeriodId(periodId: string) {
    const periodDoc = this.periodRepository.periodDoc(periodId);
    return this.firestore
      .collection<Spending>(this.SPENDING_COLLECTION, ref => ref
        .where('period', '==', periodDoc)
        .orderBy('paid', 'asc'))
      .snapshotChanges()
      .pipe(map(this.toSpending));
  }

  private toSpending(docs: DocumentChangeAction<Spending>[]): Spending[] {
    return docs.map(doc => ({
      ...doc.payload.doc.data(),
      id: doc.payload.doc.id,
    }) as Spending);
  }
}
