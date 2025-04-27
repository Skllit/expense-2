// src/app/core/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth    = inject(AuthService);
  const router  = inject(Router);
  return auth.getRole() === 'admin'
    ? true
    : router.parseUrl('/login');
};
