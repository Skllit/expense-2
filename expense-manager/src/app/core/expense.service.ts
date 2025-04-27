// frontend/src/app/core/expense.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private api = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  addExpense(expense: any): Observable<any> {
    return this.http.post(`${this.api}/expenses`, expense);
  }

  getExpenses(): Observable<any> {
    return this.http.get(`${this.api}/expenses`);
  }
  getAnalytics(): Observable<{ totalExpenses: number; count: number }> {
    return this.http.get<{ totalExpenses: number; count: number }>(
      `${this.api}/analytics`
    );
  }
}
