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
    { budget: 15000, endDate: new Date(), startDate: new Date(), name: 'January' },
  ];

  constructor(
    private modal: MatDialog,
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
  }

  openModalAddPeriod() {
    this.modal.open(ModalPeriodsComponent, {
      width: '450px',
    });
  }

}
