import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { User } from '../../shared/models/User.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  private USER_COLLECTION = 'users';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  public create(user: User): void {
    this.firestore.collection(this.USER_COLLECTION).add(user);
  }

  public update(user: User): void {
    this.firestore.doc(`${this.USER_COLLECTION}/${user.id}`).update(user);
  }

  public getByGoogleId(googleId: string): Observable<User> {
    return this.firestore
      .collection<User>(this.USER_COLLECTION, ref => ref.where('googleId', '==', googleId))
      .snapshotChanges()
      .pipe(map(this.toUser));
  }

  public doc(userId: string): DocumentReference<User> {
    return this.firestore.collection<User>(this.USER_COLLECTION).doc(userId).ref;
  }

  private toUser(docs: DocumentChangeAction<User>[]): User {
    return docs.map(doc => {
      return {
        ...doc.payload.doc.data(),
        id: doc.payload.doc.id,
      } as User;
    })[0];
  }
}
