// frontend/src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { TokenInterceptor } from './app/core/token.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./app/features/auth/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./app/features/auth/register.component').then(m => m.RegisterComponent) },
      { path: 'user', loadChildren: () => import('./app/features/user/user.routes').then(m => m.userRoutes) },
      { path: 'admin', loadChildren: () => import('./app/features/admin/admin.routes').then(m => m.adminRoutes) },
      { path: '**', redirectTo: '/login' }
    ]),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
});
