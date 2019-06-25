import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
