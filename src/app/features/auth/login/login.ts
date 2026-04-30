import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectComponent } from '../../../shared/components/language-select/language-select';
import { LoginDTO } from '../../../core/models/login.dto';
import { AuthService } from '../../../core/services/auth.service';
import { TokenDTO } from '../../../core/models/token.dto';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    TranslateModule,
    LanguageSelectComponent,
    ErrorMessage
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(AuthService);

  email = '';
  password = '';
  loading = false;
  private cdr = inject(ChangeDetectorRef);
  error: string | null = null;

  login() {

    const dto: LoginDTO = {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.error = null;

    this.authService.login(dto).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (token: TokenDTO) => {
        localStorage.setItem('auth', JSON.stringify(token));
        localStorage.setItem('token', token.token);
        localStorage.setItem('auth_exp', String(new Date(token.expirationDate).getTime()));
        window.location.href = '/';
      },
      error: (err) => {
        this.error = err.error ?? 'Login failed';
        this.cdr.detectChanges();
      }
    });

  }
}
