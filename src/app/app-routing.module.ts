import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'settings',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'period',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    component: SidebarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
