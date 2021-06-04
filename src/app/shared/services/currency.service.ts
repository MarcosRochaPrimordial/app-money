import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';

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

  get currencyType() {
    return `${this.userStorage.user.currency} `;
  }
}
