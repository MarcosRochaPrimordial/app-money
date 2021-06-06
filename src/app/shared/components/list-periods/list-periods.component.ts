import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeriodRepositoryService } from 'src/app/core/repositories/period-repository.service';

import { Period } from '../../models/Period.model';
import { CurrencyService } from '../../services/currency.service';
import { UserStorageService } from '../../services/user-storage.service';
import { ModalPeriodsComponent } from '../modal-periods/modal-periods.component';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss']
})
export class ListPeriodsComponent implements OnInit {

  active = null;
  periods: Period[] = [];

  constructor(
    private modal: MatDialog,
    private periodRepository: PeriodRepositoryService,
    private userStorage: UserStorageService,
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    this.periodRepository
      .getPeriodsByUserId(this.userStorage.user.id!)
      .subscribe((periods: Period[]) => {
        this.periods = periods;
      });
  }

  openModalAddPeriod(period?: Period) {
    this.modal.open(ModalPeriodsComponent, {
      width: '450px',
      data: period,
    });
  }

}
