// src/app/features/auth/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatCardModule }      from '@angular/material/card';
import { AuthService }        from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill all required fields', '', { duration: 3000 });
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.auth.register(name, email, password).subscribe({
      next: () => {
        this.snackBar.open('Registration successful', '', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Registration error', err);
        const msg = err.error?.message || 'Registration failed';
        this.snackBar.open(msg, '', { duration: 5000 });
      }
    });
  }
}
