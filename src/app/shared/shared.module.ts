import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from './pipes/translate.pipe';

const exports = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
];
const declarations: any = [
  HeaderComponent,
  TranslatePipe,
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
