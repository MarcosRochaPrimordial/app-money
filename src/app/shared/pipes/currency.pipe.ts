import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  constructor(
    private currencyService: CurrencyService,
  ) { }

  transform(value: number): string {
    return this.currencyService.transform(value);
  }

}
