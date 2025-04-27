// frontend/src/app/features/admin/analytics/analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/admin.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  total = 0;
  count = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAnalytics().subscribe((res: any) => {
      this.total = res.totalExpenses;
      this.count = res.count;
    });
  }
}
