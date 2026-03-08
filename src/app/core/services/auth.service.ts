import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginDTO } from '../models/login.dto';
import { TokenDTO } from '../models/token.dto';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = inject(ApiService);

  createAccount(user: UserDTO): Observable<string> {
    return this.api.post<string>('auth/create-account', user);
  }

  verifyAccount(token: string, languageOption: string): Observable<string> {
    return this.api.get<string>('auth/verify-account', {
      token,
      languageOption
    });
  }

  login(login: LoginDTO): Observable<TokenDTO> {
    return this.api.post<TokenDTO>('auth/login', login);
  }

  resendVerificationEmail(email: string): Observable<string> {
    return this.api.post<string>('auth/resend-verification-email', email);
  }

}