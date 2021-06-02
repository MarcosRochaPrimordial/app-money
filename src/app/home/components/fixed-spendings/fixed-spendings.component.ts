import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Spendings } from 'src/app/shared/models/Spending.model';

const ELEMENT_DATA: Spendings[] = [
  { description: 'Hydrogen', importance: 3000 },
  { description: 'Helium', importance: 3000 },
  { description: 'Lithium', importance: 3000 },
  { description: 'Beryllium', importance: 3000 },
  { description: 'Boron', importance: 3000 },
  { description: 'Carbon', importance: 3000 },
  { description: 'Nitrogen', importance: 3000 },
  { description: 'Oxygen', importance: 3000 },
  { description: 'Fluorine', importance: 3000 },
  { description: 'Neon', importance: 3000 },
];

@Component({
  selector: 'app-fixed-spendings',
  templateUrl: './fixed-spendings.component.html',
  styleUrls: ['./fixed-spendings.component.scss']
})
export class FixedSpendingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['checkbox', 'description', 'importance', 'actions'];
  dataSource = new MatTableDataSource<Spendings>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
