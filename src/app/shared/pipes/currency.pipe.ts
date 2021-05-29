import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    let decimal = parseFloat((value / 100).toString()).toFixed(2);
    return `R$ ${decimal.toString().replace('.', ',')}`;
  }

}
