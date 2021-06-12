import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PeriodRepositoryService } from '../repositories/period-repository.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(
    private periodRepository: PeriodRepositoryService,
  ) { }

  getPeriodBeforeDate(date: Date, userId: string) {
    return this.periodRepository.getPeriodsByUserId(userId)
      .pipe(map(val => {
        const periodsBefore = val.filter(value => value.endDate < date);
        return periodsBefore[(periodsBefore.length - 1)];
      }));
  }
}
