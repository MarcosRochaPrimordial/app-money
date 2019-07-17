import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatSelectModule,
  MatRippleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { HeadComponent } from './components/head/head.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RealPipe } from './pipes/real.pipe';
import { IsNullPipe } from './pipes/is-null.pipe';

@NgModule({
  declarations: [
    HeadComponent,
    SidenavComponent,
    RealPipe,
    IsNullPipe
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRippleModule
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
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    SidenavComponent,
    RealPipe,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    IsNullPipe,
    MatRippleModule
  ]
})
export class SharedModule { }
