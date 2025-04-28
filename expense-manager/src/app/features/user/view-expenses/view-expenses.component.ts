// src/app/features/user/view-expenses/view-expenses.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { MatCardModule }                 from '@angular/material/card';
import { MatTableModule }                from '@angular/material/table';
import { MatIconModule }                 from '@angular/material/icon';
import { MatButtonModule }               from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { ExpenseService }                from '../../../core/expense.service';
import { Expense }                       from '../../../core/models/expense.model';
import jsPDF                              from 'jspdf';
import html2canvas                       from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-view-expenses',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss']
})
export class ViewExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns = ['date','description','amount','status'];

  constructor(private svc: ExpenseService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.svc.getExpenses().subscribe({
      next: data => this.expenses = data,
      error: ()   => this.snack.open('Failed to load','',{duration:2000})
    });
  }

  exportPDF() {
    const DATA = document.getElementById('user-expenses-table')!;
    html2canvas(DATA).then((canvas: any) => {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF('p','pt','a4');
      const width = doc.internal.pageSize.getWidth();
      const height = canvas.height * width / canvas.width;
      doc.addImage(img,'PNG',0,0,width,height);
      doc.save('my-expenses.pdf');
    });
  }

  isCredit(e: Expense): boolean {
    return e.amount >= 0;
  }
}
