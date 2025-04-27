// frontend/src/app/app.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from './core/components/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
