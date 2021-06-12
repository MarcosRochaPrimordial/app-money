import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../../shared/models/User.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  private USER_COLLECTION = 'users';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  createUser(user: User) {
    return this.firestore.collection(this.USER_COLLECTION).add(user);
  }

  getUser() {
    return this.firestore
      .collection<User>(this.USER_COLLECTION)
      .snapshotChanges()
      .pipe(map(this.toUser));
  }

  getUserByGoogleId(googleId: string) {
    return this.firestore
      .collection<User>(this.USER_COLLECTION, ref => ref.where('googleId', '==', googleId))
      .snapshotChanges()
      .pipe(map(this.toUser));
  }

  updateUser(user: User) {
    return this.firestore.doc(`${this.USER_COLLECTION}/${user.id}`).update(user);
  }

  userDoc(userId: string) {
    return this.firestore.collection<User>(this.USER_COLLECTION).doc(userId).ref;
  }

  toUser(docs: DocumentChangeAction<User>[]): User {
    return docs.map(doc => {
      return {
        ...doc.payload.doc.data(),
        id: doc.payload.doc.id,
      } as User;
    })[0];
  }
}
