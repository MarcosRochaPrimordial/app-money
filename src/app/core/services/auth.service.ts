import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private userRepository: UserRepositoryService,
    private cookieService: CookieService
  ) { }

  get userCookie() {
    return this.cookieService.get('user');
  }

  get isAuthenticated(): boolean {
    if (this.userCookie) {
      return true;
    }
    return false;
  }

  login(user: User, onEmailOrPasswordWrong: () => void): void {
    const submit = this.userRepository.submitLogin(user).subscribe((loggedUsers: User[]) => {
      if (loggedUsers.length > 0) {
        this.cookieService.set('user', loggedUsers.filter(u => u.email === user.email).join());
        this.router.navigate(['home']);
      } else {
        onEmailOrPasswordWrong();
      }
      submit.unsubscribe();
    });
  }

  logoff() {
    this.router.navigate(['login']);
    this.deleteUserCookie();
  }

  private deleteUserCookie() {
    this.cookieService.delete('user');
  }
}
