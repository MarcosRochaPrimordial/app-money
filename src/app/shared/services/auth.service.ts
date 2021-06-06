import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User.model';
import { RepositoryService } from './repository.service';
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
    private repository: RepositoryService,
  ) { }

  get logged() {
    return this.userStorage.hasUser;
  }

  signin() {
    this.socialService.authState.subscribe(user => {
      this.userStorage.user = {
        googleId: user.id,
        email: user.email,
        name: user.firstName,
        photoUrl: user.photoUrl,
        language: 'en',
        currency: 'U$',
      };
      const subscription = this.repository.getUserByGoogleId(user.id)
        .subscribe((user: User) => {
          if (!user) {
            this.repository.createUser(this.userStorage.user);
          }
          subscription.unsubscribe();
        });
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
