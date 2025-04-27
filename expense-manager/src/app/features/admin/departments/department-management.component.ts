// src/app/features/admin/departments/department-management.component.ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService }           from '../../../core/department.service';
import { MatSnackBar }                 from '@angular/material/snack-bar';
import { MatFormFieldModule }          from '@angular/material/form-field';
import { MatInputModule }              from '@angular/material/input';
import { MatButtonModule }             from '@angular/material/button';
import { MatTableModule }              from '@angular/material/table';
import { MatPaginatorModule }          from '@angular/material/paginator';

import { MatCardModule }        from '@angular/material/card';

import { MatSnackBarModule }    from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-department-management',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  templateUrl: './department-management.component.html'
})
export class DepartmentManagementComponent implements AfterViewInit {
  departmentForm: FormGroup;
  departments: any[] = [];
  displayedColumns = ['name','actions'];

  @ViewChild('paginator') paginator!: any;

  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.load();
  }

  load() {
    this.service.getDepartments().subscribe(res => this.departments = res);
  }

  add() {
    if (!this.departmentForm.valid) return;
    this.service.addDepartment(this.departmentForm.value.name!).subscribe(() => {
      this.snackBar.open('Added','',{duration:2000});
      this.departmentForm.reset();
      this.load();
    });
  }

  delete(id: string) {
    this.service.deleteDepartment(id).subscribe(() => {
      this.snackBar.open('Deleted','',{duration:2000});
      this.load();
    });
  }
}
