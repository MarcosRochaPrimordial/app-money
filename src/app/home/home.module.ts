import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ModalSpendingsComponent } from './components/modal-spendings/modal-spendings.component';
import { SharedModule } from '../shared/shared.module';
import { SpendingsComponent } from './components/spendings/spendings.component';
import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    HomeComponent,
    ModalSpendingsComponent,
    SpendingsComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
