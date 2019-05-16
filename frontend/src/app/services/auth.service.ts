import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  authorize(login: string, password: string): Observable<Object> {
    return this.http.post(`${this.serverUrl}/login`, { login, password });
  }
}
