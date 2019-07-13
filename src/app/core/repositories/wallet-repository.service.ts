import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllWallets(user: User): Observable<Wallet[]> {
    return this.afs.collection<Wallet>('wallet',
      ref => ref.where('user.email', '==', user.email)
    ).valueChanges();
  }
}
