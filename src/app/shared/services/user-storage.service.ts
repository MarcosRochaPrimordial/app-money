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
    return JSON.parse(localStorage.getItem(this.USER_CREDENTIAL) || '') as User;
  }

  get hasUser(): boolean {
    return !!this.user.id;
  }

  public terminateUser() {
    localStorage.removeItem(this.USER_CREDENTIAL);
  }
}
