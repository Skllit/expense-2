// frontend/src/app/features/user/user.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth.guard';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import { AnalyticsComponent as UserAnalyticsComponent } from './analytics/analytics.component';

export const userRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'add-expense', component: AddExpenseComponent },
      { path: 'view-expenses', component: ViewExpensesComponent },
      { path: 'analytics', component: UserAnalyticsComponent },
      { path: '', redirectTo: 'view-expenses', pathMatch: 'full' }
    ]
  }
];
