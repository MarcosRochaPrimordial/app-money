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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaskModule } from 'ngx-mask';

import { ListPeriodsComponent } from './components/list-periods/list-periods.component';
import { PeriodInfoComponent } from './components/period-info/period-info.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserComponent } from './components/user/user.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { ModalPeriodsComponent } from './components/modal-periods/modal-periods.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { RouterModule } from '@angular/router';

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
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  NgApexchartsModule,
  MatSelectModule,
  MatButtonToggleModule,
  NgxMaskModule.forChild(),
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
  MultiSelectComponent,
  ConfirmComponent,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    RouterModule,
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
