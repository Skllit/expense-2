// src/app/features/user/add-expense/add-expense.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../../core/expense.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule }       from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-add-expense',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './add-expense.component.html'
})
export class AddExpenseComponent {
  expenseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ExpenseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      amount:      [0, Validators.required],
      description: [''],
      date:        [new Date(), Validators.required]
    });
  }
  submit() {
    if (!this.expenseForm.valid) return;
    this.service.addExpense(this.expenseForm.value).subscribe({
      next: () => {
        this.snackBar.open('Expense added','',{duration:2000});
        this.router.navigate(['/user/view-expenses']);
      },
      error: () => this.snackBar.open('Failed to add','',{duration:2000})
    });
  }
}
