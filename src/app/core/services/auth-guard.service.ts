import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    if (!this.authService.isAuthenticated) {
      this.authService.logoff();
    }

    return this.authService.isAuthenticated;
  }
}
