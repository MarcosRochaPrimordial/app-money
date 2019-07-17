import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryService {

  collectionName: string = 'wallet';

  constructor(
    private afs: AngularFirestore
  ) { }

  getAllWallets(user: User): Observable<Wallet[]> {
    return this.afs.collection<Wallet>(this.collectionName,
      ref => ref.where('user.email', '==', user.email)
    ).snapshotChanges().pipe(
      map((docs: DocumentChangeAction<Wallet>[]) => {
        return this.toWallet(docs);
      })
    );
  }

  toWallet(docs: DocumentChangeAction<Wallet>[]): Wallet[] {
    return docs.map(doc => {
      return {
        id: doc.payload.doc.id,
        ...doc.payload.doc.data()
      } as Wallet;
    });
  }

  save(wallet: Wallet): void {
    this.afs.collection(this.collectionName).add(wallet);
  }

  delete(id: string): void {
    this.afs.doc(`${this.collectionName}/${id}`).delete();
  }
}
