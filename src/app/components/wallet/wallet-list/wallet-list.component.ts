import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/core/services/wallet.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { MatDialog, MatSnackBar } from '@angular/material';
import { WalletAddComponent } from '../wallet-add/wallet-add.component';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent implements OnInit {

  wallets: Wallet[] = [];
  user: User;

  constructor(
    private walletService: WalletService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.walletService.getAllWallets(this.user).subscribe((wallets: Wallet[]) => {
      this.wallets = wallets;
    });
  }

  addWallet() {
    this.dialog.open(WalletAddComponent, {
      width: '600px',
      height: '510px',
      data: {}
    });
  }

  deleteWallet(id: string) {
    const result = this.walletService.deleteWallet(id);
    if (result) {
      this.snackbar.open('Aconteceu um erro inesperado', 'Ok', {
        duration: 0
      });
    } else {
      this.snackbar.open('Carteira excluída com sucesso!', 'Ok', {
        duration: 5000
      });
    }
  }

}
