import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletListComponent } from './wallet-list/wallet-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WalletListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
