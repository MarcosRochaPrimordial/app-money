import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { Subject } from 'rxjs';
import { ToggleState } from '../interfaces/toggleState';
import { UserService } from './user.service';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {

  private loginSubject: Subject<ToggleState> = new Subject<ToggleState>();
  loginState = this.loginSubject.asObservable();

  constructor(
    private router: Router,
    private userRepository: UserRepositoryService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  get userCookie() {
    return this.userService.user;
  }

  get isAuthenticated(): boolean {
    if (this.userCookie) {
      this.show();
      return true;
    }

    this.hide();
    return false;
  }

  login(user: User): void {
    const submit = this.userRepository.getUser(user).subscribe((loggedUsers: User[]) => {
      if (loggedUsers.length > 0) {
        this.userService.user = loggedUsers.filter(u => u.email === user.email)[0];
        this.router.navigate(['home']);
      } else {
        user.account = 0;
        this.userRepository.addUser(user);
        this.login(user);
      }
      submit.unsubscribe();
    });
  }

  logoff() {
    this.authService.signOut();
    this.router.navigate(['login']);
    this.deleteUserCookie();
    this.hide();
  }

  private deleteUserCookie() {
    this.userService.delete();
  }

  show() {
    this.loginSubject.next({show: true} as ToggleState);
  }

  hide() {
    this.loginSubject.next({show: false} as ToggleState);
  }
}
