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
  MatExpansionModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { HeadComponent } from './components/head/head.component';
import { NgBrazil } from 'ng-brazil';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HeadComponent,
    SidenavComponent
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
    NgBrazil,
    MatExpansionModule
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
    NgBrazil,
    MatExpansionModule,
    SidenavComponent
  ]
})
export class SharedModule { }
