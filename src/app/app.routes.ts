import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AuthGuard } from './core/guards/authGuard';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.Home), canActivate: [AuthGuard] },
  { path: 'login', component: Login }
];
