import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { SpendingsComponent } from './components/spendings/spendings.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalSpendingsComponent } from './components/modal-spendings/modal-spendings.component';
import { ModalCopyComponent } from './components/modal-copy/modal-copy.component';
import { ModalSheetImportComponent } from './components/modal-sheet-import/modal-sheet-import.component';


@NgModule({
  declarations: [
    HomeComponent,
    ChartsComponent,
    SpendingsComponent,
    DataTableComponent,
    ModalSpendingsComponent,
    ModalCopyComponent,
    ModalSheetImportComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
