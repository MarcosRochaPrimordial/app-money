import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  public create(spending: Spending, periodId: string): void {
    spending.period = this.periodRepository.doc(periodId);
    this.firestore.collection(this.SPENDING_COLLECTION).add(spending);
  }

  public update(spending: Spending): void {
    this.firestore.doc(`${this.SPENDING_COLLECTION}/${spending.id}`).update(spending);
  }

  public delete(spending: Spending): void {
    this.firestore.doc(`${this.SPENDING_COLLECTION}/${spending.id}`).delete();
  }

  public getByPeriodId(periodId: string): Observable<Spending[]> {
    const periodDoc = this.periodRepository.doc(periodId);
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
