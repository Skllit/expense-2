// frontend/src/app/core/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getPendingExpenses(): Observable<any> {
    return this.http.get(`${this.api}/expenses/pending`);
  }

  approveExpense(id: string): Observable<any> {
    return this.http.post(`${this.api}/expenses/approve/${id}`, {});
  }

  getAnalytics(): Observable<any> {
    return this.http.get(`${this.api}/analytics`);
  }
}
