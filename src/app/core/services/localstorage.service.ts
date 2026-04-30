import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly AUTH_KEY = 'auth';
  private readonly TOKEN_KEY = 'token';
  private readonly AUTH_EXP_KEY = 'auth_exp';

  private get storage(): Storage | null {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  setItem<T = unknown>(key: string, value: T): void {
    const s = this.storage;
    if (!s) return;
    s.setItem(key, JSON.stringify(value));
  }

  getItem<T = unknown>(key: string): T | null {
    const s = this.storage;
    if (!s) return null;
    const raw = s.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  }

  removeItem(key: string): void {
    const s = this.storage;
    if (!s) return;
    s.removeItem(key);
  }

  clear(): void {
    const s = this.storage;
    if (!s) return;
    s.clear();
  }

  // Auth helpers
  saveAuth(payload: { token: string; expirationDate: string } & Record<string, unknown>): void {
    const s = this.storage;
    if (!s) return;
    s.setItem(this.AUTH_KEY, JSON.stringify(payload));
    s.setItem(this.TOKEN_KEY, payload.token);
    s.setItem(this.AUTH_EXP_KEY, String(new Date(payload.expirationDate).getTime()));
  }

  getAuth<T = any>(): T | null {
    return this.getItem<T>(this.AUTH_KEY);
  }

  getToken(): string | null {
    const s = this.storage;
    if (!s) return null;
    return s.getItem(this.TOKEN_KEY);
  }

  getAuthExpiration(): number | null {
    const s = this.storage;
    if (!s) return null;
    const raw = s.getItem(this.AUTH_EXP_KEY);
    return raw ? Number(raw) : null;
  }

  isExpired(): boolean {
    const exp = this.getAuthExpiration();
    if (!exp) return true;
    return Date.now() > exp;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isExpired();
  }

  clearAuth(): void {
    this.removeItem(this.AUTH_KEY);
    this.removeItem(this.TOKEN_KEY);
    this.removeItem(this.AUTH_EXP_KEY);
  }
}