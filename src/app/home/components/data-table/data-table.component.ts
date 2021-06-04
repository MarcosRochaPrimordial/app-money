import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Spendings } from './../../../shared/models/Spending.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {

  @Input() set elements(_elements: Spendings[]) {
    this.dataSource.data = _elements;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['checkbox', 'description', 'importance', 'actions'];
  dataSource = new MatTableDataSource<Spendings>();

  constructor(
    public currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
