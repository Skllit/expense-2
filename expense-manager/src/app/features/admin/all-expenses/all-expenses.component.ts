// src/app/features/admin/all-expenses/all-expenses.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { MatTableModule }                from '@angular/material/table';
import { MatPaginatorModule }            from '@angular/material/paginator';
import { MatSortModule }                 from '@angular/material/sort';
import { MatButtonModule }               from '@angular/material/button';
import { MatIconModule }                 from '@angular/material/icon';
import { MatCardModule }                 from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Expense }                       from '../../../core/models/expense.model';
import { AdminService }                  from '../../../core/admin.service';
import jsPDF                              from 'jspdf';
import html2canvas                       from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-all-expenses',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  displayedColumns = ['date','user','department','amount','description','status'];
  dataSource: Expense[] = [];

  @ViewChild('table') table: any;

  constructor(private admin: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.admin.getAllExpenses().subscribe({
      next: data => this.dataSource = data,
      error: ()   => this.snackBar.open('Failed to load expenses','',{duration:2000})
    });
  }

  exportPDF() {
    const DATA = document.getElementById('all-expenses-table')!;
    html2canvas(DATA).then((canvas: any) => {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF('p','pt','a4');
      const width = doc.internal.pageSize.getWidth();
      const height = canvas.height * width / canvas.width;
      doc.addImage(img,'PNG',0,0,width,height);
      doc.save('all-expenses.pdf');
    });
  }
}
