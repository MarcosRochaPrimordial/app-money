import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  private collectionName: string = 'user';

  constructor(
    private afs: AngularFirestore
  ) { }

  getUser(user: User): Observable<User[]> {
    return this.afs.collection<User>(this.collectionName,
      ref => ref.where('email', '==', user.email)
        .where('password', '==', user.password)
    ).snapshotChanges().pipe(
      map((documents: DocumentChangeAction<User>[]) => {
        return this.toUser(documents);
      })
    );
  }

  toUser(documents: DocumentChangeAction<User>[]) {
    return documents.map(document => {
      return {
        id: document.payload.doc.id,
        ...document.payload.doc.data()
      } as User;
    });
  }

  updateUser(user: User): void {
    this.afs.doc(`${this.collectionName}/${user.id}`).update(user);
  }
}
