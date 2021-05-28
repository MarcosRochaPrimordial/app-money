import { Pipe, PipeTransform } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import * as translate from './../translate';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private userStorage: UserStorageService,
  ) { }

  transform(value: string): string {
    return (translate as any)[this.userStorage.user.language][value];
  }

}
