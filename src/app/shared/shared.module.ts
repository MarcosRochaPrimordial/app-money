import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from './pipes/translate.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { ListPeriodsComponent } from './components/list-periods/list-periods.component';
import { PeriodInfoComponent } from './components/period-info/period-info.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserComponent } from './components/user/user.component';
import { CurrencyPipe } from './pipes/currency.pipe';

const exports = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatSidenavModule,
  MatTooltipModule,
  MatExpansionModule,
  MatListModule,
  MatDividerModule,
];
const declarations: any = [
  HeaderComponent,
  SidebarComponent,
  ListPeriodsComponent,
  PeriodInfoComponent,
  SidebarComponent,
  UserComponent,
  TranslatePipe,
  CurrencyPipe,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    ...exports,
  ],
  exports: [
    ...exports,
    ...declarations,
  ],
})
export class SharedModule { }
