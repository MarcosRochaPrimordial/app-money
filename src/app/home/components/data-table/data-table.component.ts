import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['checkbox', 'description', 'importance', 'actions'];
  dataSource = new MatTableDataSource<Spending>();

  constructor(
    public currencyService: CurrencyService,
    private modal: MatDialog,
    private translateService: TranslateService,
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

  deleteElement(id: string) {
    const dialogMessage = this.modal.open(ConfirmComponent, {
      width: '450px',
      data: {
        title: this.translateService.translate('are_you_sure_dot'),
        message: this.translateService.translate('all_data_will_be_deleted'),
        labelBtnLeft: this.translateService.translate('yes'),
        labelBtnRight: this.translateService.translate('no'),
      }
    });

    dialogMessage.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
