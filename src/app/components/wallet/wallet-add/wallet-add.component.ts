import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user';
import { CurrencyFormatService } from 'src/app/core/services/currency-format.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.scss']
})
export class WalletAddComponent implements OnInit {

  user: User;
  walletFormControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private walletService: WalletService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<WalletAddComponent>
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.walletFormControl = this.fb.group({
      isCredit: [true],
      limit: [null, [Validators.required]],
      description: [null, [Validators.required]],
      flipDate: [null, [Validators.required]],
      overdueDate: [null, [Validators.required]],
      user: [this.user]
    });
  }

  get isCreditForm() {
    return this.walletFormControl.controls.isCredit;
  }

  get limitForm() {
    return this.walletFormControl.controls.limit;
  }

  get descriptionForm() {
    return this.walletFormControl.controls.description;
  }

  get flipDateForm() {
    return this.walletFormControl.controls.flipDate;
  }

  get overdueDateForm() {
    return this.walletFormControl.controls.overdueDate;
  }

  walletTypeShower() {
    if (this.isCreditForm.value) {
      this.limitForm.setValidators([]);
      return 'Crédito';
    } else {
      this.limitForm.setValidators([Validators.required]);
      return 'Débito';
    }
  }

  changeWalletType() {
    if (this.isCreditForm.value) {
      this.limitForm.setValidators([]);
    } else {
      this.limitForm.setValidators([Validators.required]);
    }
  }

  formatCurrency() {
    if (!!this.limitForm.value) {
      this.limitForm.setValue(CurrencyFormatService.format(this.limitForm.value));
    }
  }

  unformatCurrency() {
    if (!!this.limitForm.value) {
      this.limitForm.setValue(CurrencyFormatService.unformat(this.limitForm.value));
    }
  }

  saveWallet() {
    const wallet: Wallet = this.walletFormControl.value;
    wallet.limit = CurrencyFormatService.unformat(this.limitForm.value);

    const result = this.walletService.saveWallet(this.walletFormControl.value);
    if (result) {
      this.snackbar.open('Aconteceu um erro inesperado', 'Ok', {
        duration: 0
      });
    } else {
      this.dialogRef.close();
      this.snackbar.open('Carteira registrada com sucesso', 'Ok', {
        duration: 5000
      });
    }
  }

}
