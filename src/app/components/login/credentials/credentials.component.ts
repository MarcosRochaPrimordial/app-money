import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { User } from 'src/app/core/interfaces/user';
import { AuthAppService } from 'src/app/core/services/auth-app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private authAppService: AuthAppService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
  }

  googleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      if (user) {
        const userLogin: User = {
          email: user.email,
          name: user.name
        };
        this.authAppService.login(userLogin);
      }
    });
  }

}
