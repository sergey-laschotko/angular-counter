import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  serverUrl: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getCounter(): Observable<any> {
    return this.http.get(`${this.serverUrl}/get-counter`);
  }

  getCurrentCounter(): Observable<any> {
    return this.http.get(`${this.serverUrl}/current-counter`);
  }

  cancelCounter(counter: number): Observable<any> {
    return this.http.post(`${this.serverUrl}/cancel-counter`, { counter });
  }

  confirmCounter(counter: number): Observable<any> {
    return this.http.post(`${this.serverUrl}/confirm-counter`, { counter });
  }
}
