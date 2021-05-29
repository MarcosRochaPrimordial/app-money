import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { ListPeriodsComponent } from './components/list-periods/list-periods.component';
import { PeriodInfoComponent } from './components/period-info/period-info.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserComponent } from './components/user/user.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { ModalPeriodsComponent } from './components/modal-periods/modal-periods.component';



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
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
];
const declarations: any = [
  HeaderComponent,
  SidebarComponent,
  ListPeriodsComponent,
  PeriodInfoComponent,
  SidebarComponent,
  UserComponent,
  ModalPeriodsComponent,
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
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})
export class SharedModule { }
