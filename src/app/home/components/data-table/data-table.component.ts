import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SpendingService } from 'src/app/core/services/spending.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { ModalCopyComponent } from '../modal-copy/modal-copy.component';
import { ModalSpendingsComponent } from '../modal-spendings/modal-spendings.component';
import { Spending } from './../../../shared/models/Spending.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() set elements(_elements: Spending[]) {
    this.dataSource.data = _elements;
  }
  @Input() type!: string;
  @Input() set total(total: number) {
    this._total = this.currencyService.transform(total);
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['checkbox', 'description', 'importance', 'actions'];
  dataSource = new MatTableDataSource<Spending>();
  _total: string = '';

  constructor(
    public currencyService: CurrencyService,
    private modal: MatDialog,
    private spendingService: SpendingService,
    private confirm: ConfirmService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  copyCurrent(element: Spending) {
    this.modal.open(ModalCopyComponent, {
      width: '450px',
      data: element,
    });
  }

  editCurrent(element: Spending) {
    this.modal.open(ModalSpendingsComponent, {
      width: '450px',
      data: {
        element,
        type: this.type,
      },
    });
  }

  deleteElement(spending: Spending) {
    this.confirm.confirm();
    this.confirm.dialog.afterClosed().subscribe(result => {
      if (result) {
        this.spendingService.deleteSpending(spending);
      }
    });
  }

  markAsPaid(event: any, spending: Spending) {
    spending.paid = event.checked;
    this.spendingService.updateSpending(spending);
  }

}
