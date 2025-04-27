// frontend/src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, { email, password })
      .pipe(tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      }));
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
