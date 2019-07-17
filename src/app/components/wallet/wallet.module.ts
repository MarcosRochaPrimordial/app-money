import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletAddComponent } from './wallet-add/wallet-add.component';

@NgModule({
  declarations: [WalletListComponent, WalletAddComponent],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule
  ],
  entryComponents: [
    WalletAddComponent
  ]
})
export class WalletModule { }
