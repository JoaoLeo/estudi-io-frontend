import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private localStorageService = inject(LocalStorageService);

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // prefer the centralized LocalStorageService helper
    if (typeof this.localStorageService.isLoggedIn === 'function') {
      return this.localStorageService.isLoggedIn() ? true : this.router.createUrlTree(['/login']);
    }

    // fallback to AuthService helper if available
    if (typeof this.localStorageService.isLoggedIn() === 'function') {
      return this.localStorageService.isLoggedIn() ? true : this.router.createUrlTree(['/login']);
    }

    // final fallback: manual check using LocalStorageService getters
    const token = this.localStorageService.getToken();
    const exp = this.localStorageService.getAuthExpiration() ?? 0;
    const logged = !!token && Date.now() < exp;

    return logged ? true : this.router.createUrlTree(['/login']);
  }
}