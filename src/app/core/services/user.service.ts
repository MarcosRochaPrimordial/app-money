import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookieService: CookieService
  ) { }

  get user() {
    const user = this.cookieService.get('user');
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }

  set user(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  delete() {
    this.cookieService.delete('user');
  }
}
