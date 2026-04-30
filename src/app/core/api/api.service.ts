import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environmet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    const lang = localStorage.getItem('lang') ?? 'pt-BR';

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': lang
    });
  }

  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: this.getHeaders(),
      params
    });
  }

  post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {
      headers: this.getHeaders()
    });
  }

}