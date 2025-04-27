// frontend/src/app/features/user/view-expenses/view-expenses.component.ts
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../core/expense.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-expenses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatCardModule],
  templateUrl: './view-expenses.component.html'
})
export class ViewExpensesComponent implements OnInit {
  expenses: any[] = [];
  displayedColumns = ['date', 'description', 'amount', 'status'];

  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe({
      next: data => this.expenses = data,
      error: () => this.snackBar.open('Failed to load expenses', 'Close', { duration: 2000 })
    });
  }
}
