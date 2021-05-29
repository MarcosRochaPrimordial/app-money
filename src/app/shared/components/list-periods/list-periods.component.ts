import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Period } from '../../models/Period.model';
import { ModalPeriodsComponent } from '../modal-periods/modal-periods.component';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.scss']
})
export class ListPeriodsComponent implements OnInit {

  active = 1;
  periods: Period[] = [];

  constructor(
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModalAddPeriod() {
    this.modal.open(ModalPeriodsComponent, {
      width: '450px',
    });
  }

}
