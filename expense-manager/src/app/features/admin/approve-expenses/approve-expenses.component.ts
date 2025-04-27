// frontend/src/app/features/admin/approve-expenses/approve-expenses.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/admin.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approve-expenses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule, MatCardModule],
  templateUrl: './approve-expenses.component.html'
})
export class ApproveExpensesComponent implements OnInit {
  expenses: any[] = [];
  displayedColumns = ['date', 'user', 'amount', 'status', 'actions'];

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.adminService.getPendingExpenses().subscribe(res => this.expenses = res);
  }

  approve(id: string) {
    this.adminService.approveExpense(id).subscribe({
      next: () => {
        this.snackBar.open('Expense approved', 'Close', { duration: 2000 });
        this.expenses = this.expenses.filter(exp => exp._id !== id);
      },
      error: () => {
        this.snackBar.open('Failed to approve', 'Close', { duration: 2000 });
      }
    });
  }
}
