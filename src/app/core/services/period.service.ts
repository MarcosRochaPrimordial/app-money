import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Period } from 'src/app/shared/models/Period.model';
import { PeriodRepositoryService } from '../repositories/period-repository.service';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(
    private periodRepository: PeriodRepositoryService,
    private userStorage: UserStorageService,
  ) { }

  public createPeriod(period: Period) {
    const userId = this.userStorage.user.id!;
    return this.periodRepository.create(period, userId);
  }

  public updatePeriod(period: Period) {
    return this.periodRepository.update(period);
  }

  public getPeriodsByUserId() {
    const userId = this.userStorage.user.id!;
    return this.periodRepository.getByUserId(userId);
  }

  public deletePeriod(period: Period) {
    return this.periodRepository.delete(period);
  }

  public getPeriodBeforeDate(date: Date) {
    const userId = this.userStorage.user.id!;
    return this.periodRepository.getByUserId(userId)
      .pipe(map(val => {
        const periodsBefore = val.filter(value => value.endDate < date);
        return periodsBefore[(periodsBefore.length - 1)];
      }));
  }

  public getPeriodsAfterDate(date: Date, qtPeriods: number) {
    const userId = this.userStorage.user.id!;
    return this.periodRepository.getByUserId(userId)
      .pipe(map(val => {
        return val
          .filter(value => value.startDate >= date)
          .slice(0, qtPeriods);
      }));
  }
}
