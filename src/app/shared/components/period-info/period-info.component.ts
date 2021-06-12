import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ActualPeriodService } from 'src/app/core/services/actual-period.service';
import { SpendingService } from 'src/app/core/services/spending.service';
import { Period } from '../../models/Period.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-period-info',
  templateUrl: './period-info.component.html',
  styleUrls: ['./period-info.component.scss']
})
export class PeriodInfoComponent implements OnInit {

  date = new Date();
  budget: string = '0';
  savings: string = '0';
  finalBudget: string = '0';
  remaining: string = '0';

  constructor(
    public currencyService: CurrencyService,
    private spendingService: SpendingService,
    private actualPeriod: ActualPeriodService,
  ) { }

  ngOnInit(): void {
    this.actualPeriod.period.subscribe(period => {
      this.zeroValues();
      this.calculateBudget(period.id!, period.importance);
      this.calculateLastPeriodFinalBudget(period);
    });
  }

  calculateBudget(periodId: string, periodImportance: number) {
    combineLatest([
      this.spendingService.getTotalFixedSpendings(periodId),
      this.spendingService.getTotalOutgoings(periodId),
      this.spendingService.getTotalIncomes(periodId),
    ]).subscribe(([fixeds, outgoings, incomes]) => {
      const { budget, savings, finalBudget } = this.calculateValues(fixeds, outgoings, incomes, periodImportance);
      this.budget = budget;
      this.savings = savings;
      this.finalBudget = finalBudget;
    });
  }

  calculateLastPeriodFinalBudget(period: Period) {
    this.spendingService.getSpendingsLastPeriod(period.startDate)
      .subscribe(lastPeriodSpendingsSub => {
        if (!!lastPeriodSpendingsSub) {
          lastPeriodSpendingsSub.subscribe(([fixed, outgoings, incomes, periodImportance]) => {
            const { finalBudget } = this.calculateValues(fixed, outgoings, incomes, periodImportance);
            this.remaining = finalBudget;
          });
        }
      });
  }

  private calculateValues(fixeds: number, outgoings: number, incomes: number, periodImportance: number): { budget: string, savings: string, finalBudget: string } {
    const budget = ((periodImportance + incomes) - (fixeds + outgoings));
    const savings = (budget * 0.3);
    const finalBudget = (budget - savings);
    return {
      budget: this.currencyService.transform(budget),
      savings: this.currencyService.transform(savings),
      finalBudget: this.currencyService.transform(finalBudget),
    }
  }

  private zeroValues() {
    this.budget = '0';
    this.savings = '0';
    this.finalBudget = '0';
    this.remaining = '0';
  }

}
