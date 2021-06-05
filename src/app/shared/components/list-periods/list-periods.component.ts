import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Period } from '../../models/Period.model';
import { CurrencyService } from '../../services/currency.service';
import { ModalPeriodsComponent } from '../modal-periods/modal-periods.component';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss']
})
export class ListPeriodsComponent implements OnInit {

  active = null;
  periods: Period[] = [
    { id: 'çl234kj5rl-4534k', importance: 15000, endDate: new Date(), startDate: new Date(), name: 'January' },
    { id: '2kj43uh5jh4-2k3j', importance: 16000, endDate: new Date(), startDate: new Date(), name: 'Febuary' },
  ];

  constructor(
    private modal: MatDialog,
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
  }

  openModalAddPeriod(period?: Period) {
    this.modal.open(ModalPeriodsComponent, {
      width: '450px',
      data: period,
    });
  }

}
