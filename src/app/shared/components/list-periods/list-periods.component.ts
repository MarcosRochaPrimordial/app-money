import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { ActualPeriodService } from 'src/app/core/services/actual-period.service';
import { PeriodService } from 'src/app/core/services/period.service';

import { Period } from '../../models/Period.model';
import { ConfirmService } from '../../services/confirm.service';
import { CurrencyService } from '../../services/currency.service';
import { ModalPeriodsComponent } from '../modal-periods/modal-periods.component';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss']
})
export class ListPeriodsComponent implements OnInit {

  active: string = '';
  periods: Period[] = [];

  constructor(
    private modal: MatDialog,
    private periodService: PeriodService,
    private actualPeriodService: ActualPeriodService,
    private confirm: ConfirmService,
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.actualPeriodService.period,
      this.periodService
        .getPeriodsByUserId()
    ]).subscribe(([period, periods]: [Period, Period[]]) => {
      this.periods = periods;
      if (!period.id) {
        this.selectPeroidBasedOnToday();
      } else {
        this.active = period.id;
      }
    });
  }

  selectPeroidBasedOnToday() {
    let today = new Date();
    this.periods.forEach(period => {
      if (today <= period.endDate && today >= period.startDate) {
        this.openPeriod(period);
      }
    });
  }

  openModalAddPeriod(period?: Period) {
    this.modal.open(ModalPeriodsComponent, {
      width: '450px',
      data: period,
    });
  }

  deletePeriod(period: Period) {
    this.confirm.confirm();
    this.confirm.dialog.afterClosed().subscribe(result => {
      if (result) {
        this.periodService.deletePeriod(period);
      }
    });
  }

  openPeriod(period: Period) {
    this.active = period.id!;
    this.actualPeriodService.selectPeriod(period);
  }

}
