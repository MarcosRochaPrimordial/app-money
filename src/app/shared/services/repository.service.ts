import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { User } from '../models/User.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private USER_COLLECTION = 'userCollection';

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

  toUser(docs: DocumentChangeAction<User>[]): User {
    return docs.map(doc => {
      return {
        id: doc.payload.doc.id,
        ...doc.payload.doc.data()
      } as User;
    })[0];
  }
}
