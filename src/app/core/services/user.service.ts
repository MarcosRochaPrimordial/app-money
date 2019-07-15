import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  get user() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  delete() {
    localStorage.removeItem('user');
  }
}
