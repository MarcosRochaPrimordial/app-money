import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getUser(user: User): Observable<User[]> {
    return this.afs.collection<User>('user',
      ref => ref.where('email', '==', user.email)
        .where('password', '==', user.password)
    ).valueChanges();
  }
}
