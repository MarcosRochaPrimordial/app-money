import { Injectable } from '@angular/core';
import { WalletRepositoryService } from '../repositories/wallet-repository.service';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private walletRepository: WalletRepositoryService
  ) { }

  getAllWallets(user: User): Observable<Wallet[]> {
    return this.walletRepository.getAllWallets(user);
  }

  saveWallet(wallet: Wallet) {
    try {
      this.walletRepository.save(wallet);
      return null;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  deleteWallet(id: string) {
    try {
      this.walletRepository.delete(id);
      return null;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
