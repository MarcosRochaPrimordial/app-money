import { Injectable } from '@angular/core';

import * as translate from '../translate';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private userStorage: UserStorageService,
  ) { }

  public translate(jsonKey: string): string {
    return (translate as any)[this.userStorage.user.language][jsonKey];
  }
}
