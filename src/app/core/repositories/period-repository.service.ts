import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Period, PeriodBase } from 'src/app/shared/models/Period.model';
import { UserRepositoryService } from './user-repository.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PeriodRepositoryService {

  private PERIOD_COLLECTION = 'periods';

  constructor(
    private firestore: AngularFirestore,
    private userRepository: UserRepositoryService,
  ) { }

  createPeriod(period: Period, userId: string) {
    period.user = this.userRepository.userDoc(userId);
    return this.firestore.collection(this.PERIOD_COLLECTION).add(period);
  }

  updatePeriod(period: Period) {
    return this.firestore.doc(`${this.PERIOD_COLLECTION}/${period.id}`).update(period);
  }

  getPeriodsByUserId(userId: string) {
    const userDoc = this.userRepository.userDoc(userId);
    return this.firestore
      .collection<PeriodBase>(this.PERIOD_COLLECTION, ref => ref
        .where('user', '==', userDoc)
        .orderBy('startDate', 'asc'))
      .snapshotChanges()
      .pipe(map(this.toPeriod));
  }

  toPeriod(docs: DocumentChangeAction<PeriodBase>[]): Period[] {
    return docs.map(doc => ({
      id: doc.payload.doc.id,
      ...doc.payload.doc.data(),
      startDate: doc.payload.doc.data().startDate.toDate(),
      endDate: doc.payload.doc.data().endDate.toDate()
    }) as Period);
  }
}
