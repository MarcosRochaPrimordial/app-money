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
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

import { HeadComponent } from './components/head/head.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RealPipe } from './pipes/real.pipe';
import { IsNullPipe } from './pipes/is-null.pipe';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google.clientId)
  }
]);

export function provideConfig() {
  return config;
}

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
    MatRippleModule,
    SocialLoginModule
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
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class SharedModule { }
