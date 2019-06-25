import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SummaryIndexComponent } from './summary-index/summary-index.component';
import { SummaryBodyComponent } from './summary-body/summary-body.component';

@NgModule({
  declarations: [SummaryComponent, SummaryIndexComponent, SummaryBodyComponent],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
