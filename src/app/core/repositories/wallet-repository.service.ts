import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryService {

  constructor() { }
}
