import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const exports = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
];
const declarations: any = [];

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
