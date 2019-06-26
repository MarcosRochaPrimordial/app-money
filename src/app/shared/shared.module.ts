import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { HeadComponent } from './components/head/head.component';

@NgModule({
  declarations: [
    HeadComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    HeadComponent,
    MatTabsModule
  ]
})
export class SharedModule { }
