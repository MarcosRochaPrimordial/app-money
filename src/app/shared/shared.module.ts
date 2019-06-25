import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
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
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    HeadComponent
  ]
})
export class SharedModule { }
