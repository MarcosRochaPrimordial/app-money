import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: './components/home/home.module#HomeModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'expense',
    pathMatch: 'full',
    loadChildren: './components/expense/expense.module#ExpenseModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
