import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  public login = this.loginSubject.asObservable();

  constructor(
    private socialService: SocialAuthService,
    private userStorage: UserStorageService,
    private router: Router,
  ) { }

  get logged() {
    return this.userStorage.hasUser;
  }

  signin() {
    this.socialService.authState.subscribe(user => {
      this.userStorage.user = {
        id: user.id,
        email: user.email,
        name: user.firstName,
        photoUrl: user.photoUrl,
        language: 'enUS',
        currency: 'U$',
      };
      this.loginSubject.next(true);
      this.router.navigate(['']);
    });
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  singout() {
    this.socialService.signOut();
    this.loginSubject.next(false);
    this.userStorage.terminateUser();
    this.router.navigate(['login']);
  }
}
