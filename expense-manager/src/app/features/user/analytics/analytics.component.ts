// src/app/features/user/analytics/analytics.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }            from '@angular/common';
import { NgxChartsModule }         from '@swimlane/ngx-charts';
import { MatCardModule }           from '@angular/material/card';
import { ExpenseService }          from '../../../core/expense.service';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule
  ],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  total = 0;
  count = 0;

  constructor(private service: ExpenseService) {}

  ngOnInit() {
    this.service.getAnalytics().subscribe(res => {
      this.total = res.totalExpenses;
      this.count = res.count;
    });
  }
}
