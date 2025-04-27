// frontend/src/app/core/components/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '..//../core/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';
import { MatMenuModule }    from '@angular/material/menu';
import { MatIconModule }    from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styles: [`
    .spacer { flex: 1 1 auto; }
    mat-toolbar { position: sticky; top: 0; z-index: 1000; }
    a { color: white; text-decoration: none; margin-right: 12px; }
  `]
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
