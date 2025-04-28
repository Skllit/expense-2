// src/app/features/admin/analytics/analytics.component.ts
import { Component, OnInit }    from '@angular/core';
import { CommonModule }          from '@angular/common';
import { NgxChartsModule }       from '@swimlane/ngx-charts';
import { MatCardModule }         from '@angular/material/card';
import { AdminService }          from '../../../core/admin.service';
import { Expense }               from '../../../core/models/expense.model';

@Component({
  standalone: true,
  selector: 'app-admin-analytics',
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  deptSpending:    { name: string; value: number }[] = [];
  statusBreakdown: { name: string; value: number }[] = [];
  monthlyTrend:    { name: string; value: number }[] = [];

  constructor(private svc: AdminService) {}

  ngOnInit() {
    this.svc.getAllExpenses().subscribe((data: Expense[]) => {
      const ds: Record<string,number> = {};
      const sb: Record<string,number> = {};
      const months: Record<string,number> = {};

      data.forEach(e => {
        const dname = e.department?.name || 'Unknown';
        ds[dname] = (ds[dname]||0) + e.amount;

        sb[e.status] = (sb[e.status]||0) + e.amount;

        const m = new Date(e.date).toLocaleString('default',{month:'short'});
        months[m] = (months[m]||0) + e.amount;
      });

      this.deptSpending    = Object.entries(ds).map(([name,value])=>({ name,value }));
      this.statusBreakdown = Object.entries(sb).map(([name,value])=>({ name,value }));
      this.monthlyTrend    = Object.entries(months).map(([name,value])=>({ name,value }));
    });
  }
}
