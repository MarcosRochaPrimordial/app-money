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
    return JSON.parse(this.cookieService.get('user')) as User;
  }

  set user(user: User) {
    this.cookieService.set('user', JSON.stringify(user));
  }

  delete() {
    this.cookieService.delete('user');
  }
}
