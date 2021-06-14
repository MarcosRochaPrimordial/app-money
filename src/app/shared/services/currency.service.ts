import { Injectable } from '@angular/core';
import { UserStorageService } from '../../core/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private userStorage: UserStorageService,
  ) { }

  transform(value: number): string {
    let decimal = parseFloat((value / 100).toString()).toFixed(2);
    return decimal.toString().replace('.', ',');
  }

  liveTransform(value: number): string {
    return value.toString().replace(/\D/g, '').replace(/^(\d*)(\d{2})/g, "$1,$2");
  }

  get currencyType() {
    return `${this.userStorage.user.currency} `;
  }
}
