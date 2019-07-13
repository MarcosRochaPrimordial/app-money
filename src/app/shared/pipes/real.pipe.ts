import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyFormatService } from 'src/app/core/services/currency-format.service';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return CurrencyFormatService.format(value);
  }

}
