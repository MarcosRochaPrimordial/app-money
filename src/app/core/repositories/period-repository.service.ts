import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Period, PeriodBase } from 'src/app/shared/models/Period.model';
import { UserRepositoryService } from './user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodRepositoryService {

  private PERIOD_COLLECTION = 'periods';

  constructor(
    private firestore: AngularFirestore,
    private userRepository: UserRepositoryService,
  ) { }

  public create(period: Period, userId: string): void {
    period.user = this.userRepository.doc(userId);
    this.firestore.collection(this.PERIOD_COLLECTION).add(period);
  }

  public update(period: Period): void {
    this.firestore.doc(`${this.PERIOD_COLLECTION}/${period.id}`).update(period);
  }

  public delete(period: Period): void {
    this.firestore.doc(`${this.PERIOD_COLLECTION}/${period.id}`).delete();
  }

  public getByUserId(userId: string): Observable<Period[]> {
    const userDoc = this.userRepository.doc(userId);
    return this.firestore
      .collection<PeriodBase>(this.PERIOD_COLLECTION, ref => ref
        .where('user', '==', userDoc)
        .orderBy('startDate', 'asc'))
      .snapshotChanges()
      .pipe(map(this.toPeriod));
  }

  public doc(periodId: string): DocumentReference<Period> {
    return this.firestore.collection<Period>(this.PERIOD_COLLECTION).doc(periodId).ref;
  }

  private toPeriod(docs: DocumentChangeAction<PeriodBase>[]): Period[] {
    return docs.map(doc => ({
      ...doc.payload.doc.data(),
      id: doc.payload.doc.id,
      startDate: doc.payload.doc.data().startDate.toDate(),
      endDate: doc.payload.doc.data().endDate.toDate()
    }) as Period);
  }
}
