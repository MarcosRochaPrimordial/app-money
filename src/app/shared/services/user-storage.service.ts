import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private USER_CREDENTIAL: string = 'USER_CREDENTIAL';

  constructor() { }

  set user(user: User) {
    localStorage.setItem(this.USER_CREDENTIAL, JSON.stringify(user));
  }

  get user(): User {
    return JSON.parse(localStorage.getItem(this.USER_CREDENTIAL) || '{}') as User;
  }

  get hasUser(): boolean {
    return !!this.user.id;
  }

  set language(language: string) {
    if (this.hasUser) {
      const user = Object.create(this.user);
      user.language = language;
      this.user = user;
    }
  }

  set currency(currency: string) {
    if (this.hasUser) {
      const user = Object.create(this.user);
      user.currency = currency;
      this.user = user;
    }
  }

  public terminateUser() {
    localStorage.removeItem(this.USER_CREDENTIAL);
  }
}
