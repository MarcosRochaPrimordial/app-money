import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spending } from 'src/app/shared/models/Spending.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { UserStorageService } from 'src/app/shared/services/user-storage.service';
import { SpendingRepositoryService } from '../repositories/spending-repository.service';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  constructor(
    private spendingRepository: SpendingRepositoryService,
    private periodService: PeriodService,
    private userStorage: UserStorageService,
    private currencyService: CurrencyService,
  ) { }

  public createSpending(spending: Spending, periodId: string) {
    this.spendingRepository.createSpending(spending, periodId);
  }

  public updateSpending(spending: Spending) {
    this.spendingRepository.updateSpending(spending);
  }

  public deleteSpending(spending: Spending) {
    this.spendingRepository.deleteSpending(spending);
  }

  public getFixedSpendings(periodId: string) {
    return this.spendingRepository.getSpendingByPeriodId(periodId)
      .pipe(map(val => val.filter(value => value.type === 'fixed_spendings')));
  }

  public getTotalFixedSpendings(periodId: string) {
    return this.getFixedSpendings(periodId)
      .pipe(map(val => val.reduce((acc, curr) => acc += curr.importance, 0)));
  }

  public getOutgoings(periodId: string) {
    return this.spendingRepository.getSpendingByPeriodId(periodId)
      .pipe(map(val => val.filter(value => value.type === 'outgoings')));
  }

  public getTotalOutgoings(periodId: string) {
    return this.getOutgoings(periodId)
      .pipe(map(val => val.reduce((acc, curr) => acc += curr.importance, 0)));
  }

  public getIncomes(periodId: string) {
    return this.spendingRepository.getSpendingByPeriodId(periodId)
      .pipe(map(val => val.filter(value => value.type === 'incomes')));
  }

  public getTotalIncomes(periodId: string) {
    return this.getIncomes(periodId)
      .pipe(map(val => val.reduce((acc, curr) => acc += curr.importance, 0)));
  }

  public getSpendingsLastPeriod(date: Date) {
    return this.periodService.getPeriodBeforeDate(date, this.userStorage.user.id!)
      .pipe(map(val => {
        if (!!val) {
          return combineLatest([
            this.getTotalFixedSpendings(val.id!),
            this.getTotalOutgoings(val.id!),
            this.getTotalIncomes(val.id!),
            of(val.importance),
          ]);
        }
        return val;
      }));
  }

  public getSpendingsNextPeriods(date: Date, qtPeriods: number) {
    return this.periodService
      .getPeriodsAfterDate(date, qtPeriods, this.userStorage.user.id!)
      .pipe(map(val => {
        if (!!val && !!val.length) {
          return val.map(value => {
            return combineLatest([
              this.getTotalFixedSpendings(value.id!),
              this.getTotalOutgoings(value.id!),
              this.getTotalIncomes(value.id!),
              of(value),
            ]);
          });
        }
        return [];
      }));
  }

  public calculateValues(fixeds: number, outgoings: number, incomes: number, periodImportance: number): { budget: string, savings: string, finalBudget: string } {
    const budget = ((periodImportance + incomes) - (fixeds + outgoings));
    const savings = (budget * 0.3);
    const finalBudget = (budget - savings);
    return {
      budget: this.currencyService.transform(budget),
      savings: this.currencyService.transform(savings),
      finalBudget: this.currencyService.transform(finalBudget),
    }
  }

}
