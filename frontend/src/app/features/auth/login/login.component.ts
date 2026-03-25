import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { LoginRequest } from '../../../shared/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ErrorMessageComponent
  ],
  template: `
    <section class="auth-page">
      <mat-card class="auth-card">
        <h1>Bejelentkezés</h1>

        <app-error-message
          *ngIf="errorMessage"
          [message]="errorMessage"
          type="error"
          [duration]="0"
          (closed)="errorMessage = null"
        />

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            <mat-error *ngIf="loginForm.controls.email.hasError('required')">Az email kötelező.</mat-error>
            <mat-error *ngIf="loginForm.controls.email.hasError('email')">Érvényes email címet adj meg.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Jelszó</mat-label>
            <input matInput type="password" formControlName="password" autocomplete="current-password" />
            <mat-error *ngIf="loginForm.controls.password.hasError('required')">A jelszó kötelező.</mat-error>
            <mat-error *ngIf="loginForm.controls.password.hasError('minlength')">Minimum 6 karakter szükséges.</mat-error>
          </mat-form-field>

          <mat-checkbox formControlName="rememberMe" class="remember-me">
            Maradjak bejelentkezve
          </mat-checkbox>

          <button mat-raised-button color="primary" class="full-width" type="submit" [disabled]="loginForm.invalid || isSubmitting">
            <span *ngIf="!isSubmitting">Bejelentkezés</span>
            <span *ngIf="isSubmitting">Folyamatban...</span>
          </button>
        </form>

        <p class="auth-switch">
          Még nincs fiókod?
          <a [routerLink]="['/auth/register']" [queryParams]="{ returnUrl: returnUrl }">Regisztráció</a>
        </p>
      </mat-card>
    </section>
  `,
  styles: [`
    .auth-page {
      display: flex;
      justify-content: center;
      padding: 16px;
      width: 100%;
      max-width: 100%;
      overflow-x: clip;
    }

    .auth-card {
      width: 100%;
      max-width: 460px;
      padding: 20px;
      min-width: 0;
      overflow-x: clip;
    }

    h1 {
      margin: 0 0 16px;
      color: var(--color-primary);
      font-size: 28px;
      text-align: center;
    }

    form {
      display: grid;
      gap: 12px;
      min-width: 0;
    }

    .full-width {
      width: 100%;
    }

    .remember-me {
      margin: 4px 0 2px;
    }

    .auth-switch {
      margin: 16px 0 0;
      text-align: center;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 16px;
      }

      h1 {
        font-size: 24px;
      }
    }
  `]
})
export class LoginComponent {
  isSubmitting = false;
  errorMessage: string | null = null;
  returnUrl = '/';

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: false
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.isSubmitting = true;

    const request: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigateByUrl(this.resolvePostAuthUrl(response.user.role));
          return;
        }

        this.errorMessage = response.message || 'Sikertelen bejelentkezés.';
      },
      error: () => {
        this.errorMessage = 'Váratlan hiba történt. Próbáld újra.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private resolvePostAuthUrl(role: 'user' | 'admin'): string {
    const isSafeReturnUrl =
      !!this.returnUrl &&
      this.returnUrl.startsWith('/') &&
      !this.returnUrl.startsWith('/auth');

    if (isSafeReturnUrl) {
      return this.returnUrl;
    }

    return role === 'admin' ? '/admin' : '/';
  }
}
