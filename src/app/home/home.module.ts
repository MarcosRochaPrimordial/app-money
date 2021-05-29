import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ModalSpendingsComponent } from './components/modal-spendings/modal-spendings.component';


@NgModule({
  declarations: [
    HomeComponent,
    ModalSpendingsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
