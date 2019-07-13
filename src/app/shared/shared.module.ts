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
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { HeadComponent } from './components/head/head.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RealPipe } from './pipes/real.pipe';

@NgModule({
  declarations: [
    HeadComponent,
    SidenavComponent,
    RealPipe
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
    MatSelectModule
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
    MatSelectModule
  ]
})
export class SharedModule { }
