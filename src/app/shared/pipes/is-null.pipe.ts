import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNull'
})
export class IsNullPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      return value[args[0]];
    } else {
      return args[1];
    }
  }

}
