import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CredentialsComponent } from './credentials/credentials.component';

@NgModule({
  declarations: [CredentialsComponent],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
