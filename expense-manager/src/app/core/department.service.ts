// frontend/src/app/core/department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private api = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(`${this.api}/departments`);
  }

  addDepartment(name: string): Observable<any> {
    return this.http.post(`${this.api}/departments`, { name });
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.api}/departments/${id}`);
  }
}
