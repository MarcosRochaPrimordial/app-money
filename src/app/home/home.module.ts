import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { SpendingsComponent } from './components/spendings/spendings.component';
import { FixedSpendingsComponent } from './components/fixed-spendings/fixed-spendings.component';


@NgModule({
  declarations: [
    HomeComponent,
    ChartsComponent,
    SpendingsComponent,
    FixedSpendingsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
