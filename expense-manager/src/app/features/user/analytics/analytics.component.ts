// src/app/features/user/analytics/analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { NgxChartsModule }    from '@swimlane/ngx-charts';
import { MatCardModule }      from '@angular/material/card';
import { ExpenseService }     from '../../../core/expense.service';
import { Expense }            from '../../../core/models/expense.model';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [CommonModule, NgxChartsModule, MatCardModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  byCategory:    { name: string; value: number }[] = [];
  creditsDebits: { name: string; value: number }[] = [];
  monthlyTrend:  { name: string; value: number }[] = [];

  constructor(private svc: ExpenseService) {}

  ngOnInit() {
    this.svc.getExpenses().subscribe((data: Expense[]) => {
      const cats: Record<string,number> = {};
      const cd:   Record<string,number> = { Credit: 0, Debit: 0 };
      const months: Record<string,number> = {};

      data.forEach((e: Expense) => {
        cats[e.description] = (cats[e.description] || 0) + e.amount;
        if (e.amount > 0) cd['Credit'] += e.amount;
        else cd['Debit'] += Math.abs(e.amount);

        const m = new Date(e.date).toLocaleString('default',{ month:'short' });
        months[m] = (months[m] || 0) + e.amount;
      });

      this.byCategory    = Object.entries(cats).map(([name,value])=>({ name, value }));
      this.creditsDebits = Object.entries(cd).map(([name,value])=>({ name, value }));
      this.monthlyTrend  = Object.entries(months).map(([name,value])=>({ name, value }));
    });
  }
}
