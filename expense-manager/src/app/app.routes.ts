// frontend/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent }       from './features/auth/login.component';
import { RegisterComponent }    from './features/auth/register.component';
import { authGuard }            from './core/auth.guard';
import { adminGuard }           from './core/admin.guard';
import { AddExpenseComponent }   from './features/user/add-expense/add-expense.component';
import { ViewExpensesComponent } from './features/user/view-expenses/view-expenses.component';
import { AnalyticsComponent as UserAnalyticsComponent }
                                  from './features/user/analytics/analytics.component';
import { DepartmentManagementComponent }
                                  from './features/admin/departments/department-management.component';
import { ApproveExpensesComponent }
                                  from './features/admin/approve-expenses/approve-expenses.component';
//import { AllExpensesComponent }
 //                                 from './features/admin/all-expenses/all-expenses.component';
import { AnalyticsComponent as AdminAnalyticsComponent }
                                  from './features/admin/analytics/analytics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'user',
    canActivate: [authGuard],
    children: [
      { path: 'view-expenses', component: ViewExpensesComponent },
      { path: 'add-expense',   component: AddExpenseComponent },
      { path: 'analytics',      component: UserAnalyticsComponent },
      { path: '', redirectTo: 'view-expenses', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'approve-expenses', component: ApproveExpensesComponent },
      { path: 'departments',      component: DepartmentManagementComponent },
    //  { path: 'expenses',         component: AllExpensesComponent },
      { path: 'analytics',        component: AdminAnalyticsComponent },
      { path: '', redirectTo: 'approve-expenses', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
