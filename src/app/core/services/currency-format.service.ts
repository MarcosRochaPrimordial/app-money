import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFormatService {

  constructor() { }

  public static format(value: number): string {
    let real = 'R$';
    const valueDivided = value.toString().split('');
    const indexComma = valueDivided.indexOf('.');
    if (indexComma > -1) {
      valueDivided[indexComma] = ',';
      if (valueDivided[indexComma + 2] === undefined) {
        valueDivided.push('0');
      }
      real += valueDivided.join('');
    } else {
      real += `${valueDivided.join('')},00`;
    }

    return real;
  }

  public static unformat(value: string): number {
    return parseFloat(value.replace('R$', '').replace(',', '.'));
  }
}
