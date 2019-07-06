import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return this.toCurrencyReal(value);
  }

  toCurrencyReal(value: number): string {
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

}
