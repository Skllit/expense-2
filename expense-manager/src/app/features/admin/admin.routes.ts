// src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth.guard';
import { adminGuard } from '../../core/admin.guard';
import { DepartmentManagementComponent } from './departments/department-management.component';
import { ApproveExpensesComponent } from './approve-expenses/approve-expenses.component';
import { AnalyticsComponent as AdminAnalyticsComponent } from './analytics/analytics.component';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'departments', component: DepartmentManagementComponent },
      { path: 'approve-expenses', component: ApproveExpensesComponent },
      { path: 'analytics', component: AdminAnalyticsComponent },
      { path: '', redirectTo: 'approve-expenses', pathMatch: 'full' }
    ]
  }
];
