import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/User.model';
import { UserRepositoryService } from '../repositories/user-repository.service';
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
    private userRepository: UserRepositoryService,
  ) { }

  get logged() {
    return this.userStorage.hasUser;
  }

  public signin() {
    this.loginWithGoogle();
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private loginWithGoogle() {
    this.socialService.authState.subscribe(googleUser => {
      this.userStorage.user = {
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.firstName,
        photoUrl: googleUser.photoUrl,
        language: 'en',
        currency: 'U$',
      };
      this.loginFirebase(googleUser.id);
    });
  }

  private loginFirebase(googleId: string) {
    const userByGoogleId = this.userRepository.getByGoogleId(googleId)
      .subscribe((user: User) => {
        if (!user) {
          this.signup();
          this.loginFirebase(googleId);
        } else {
          this.userStorage.id = user.id;
          this.enter();
        }
        userByGoogleId.unsubscribe();
      });
  }

  private signup() {
    this.userRepository.create(this.userStorage.user);
  }

  private enter() {
    this.router.navigate(['']);
    this.loginSubject.next(true);
  }

  public singout() {
    this.socialService.signOut();
    this.loginSubject.next(false);
    this.userStorage.terminateUser();
    this.router.navigate(['login']);
  }

  public updateUser(user: User) {
    this.userRepository.update(user);
  }
}
