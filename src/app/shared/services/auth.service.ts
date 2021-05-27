import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject = new BehaviorSubject<boolean>(false);
  public logged = this.loginSubject.asObservable();

  constructor(
    private socialService: SocialAuthService,
    private userStorage: UserStorageService,
  ) { }

  login() {
    this.socialService.authState.subscribe(user => {
      this.userStorage.user = {
        id: user.id,
        email: user.email,
        name: user.firstName,
        photoUrl: user.photoUrl,
      };
      this.loginSubject.next(true);
    });
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.socialService.signOut();
    this.loginSubject.next(false);
    this.userStorage.terminateUser();
  }
}
