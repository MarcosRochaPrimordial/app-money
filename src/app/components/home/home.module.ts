import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryIndexComponent } from './summary-index/summary-index.component';
import { SummaryChartsComponent } from './summary-charts/summary-charts.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@NgModule({
  declarations: [
    SummaryComponent,
    SummaryIndexComponent,
    SummaryChartsComponent,
    ExpenseListComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
