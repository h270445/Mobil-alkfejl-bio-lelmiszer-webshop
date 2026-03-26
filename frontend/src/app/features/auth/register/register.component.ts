import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { RegisterRequest } from '../../../shared/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ErrorMessageComponent
  ],
  template: `
    <section class="auth-page">
      <mat-card class="auth-card">
        <h1>Regisztráció</h1>

        <app-error-message
          *ngIf="errorMessage"
          [message]="errorMessage"
          type="error"
          [duration]="0"
          (closed)="errorMessage = null"
        />

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="name-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Keresztnév</mat-label>
              <input
                matInput
                type="text"
                formControlName="firstName"
                autocomplete="given-name"
                autocapitalize="words"
                (input)="onNameInput('firstName')"
                (blur)="capitalizeNameControl('firstName')"
              />
              <mat-error *ngIf="registerForm.controls.firstName.hasError('required')">Kötelező mező.</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Vezetéknév</mat-label>
              <input
                matInput
                type="text"
                formControlName="lastName"
                autocomplete="family-name"
                autocapitalize="words"
                (input)="onNameInput('lastName')"
                (blur)="capitalizeNameControl('lastName')"
              />
              <mat-error *ngIf="registerForm.controls.lastName.hasError('required')">Kötelező mező.</mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            <mat-error *ngIf="registerForm.controls.email.hasError('required')">Az email kötelező.</mat-error>
            <mat-error *ngIf="registerForm.controls.email.hasError('email')">Érvényes email címet adj meg.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Telefonszám (opcionális)</mat-label>
            <input matInput type="tel" formControlName="phone" autocomplete="tel" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Jelszó</mat-label>
            <input
              matInput
              [type]="showPassword ? 'text' : 'password'"
              formControlName="password"
              autocomplete="new-password"
            />
            <button mat-icon-button matSuffix type="button" class="password-toggle" (click)="togglePasswordVisibility()" aria-label="Jelszó megjelenítése/elrejtése">
              <img
                [src]="showPassword ? 'assets/images/eye-closed-icon.svg' : 'assets/images/eye-open-icon.svg'"
                [alt]="showPassword ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'"
                [title]="showPassword ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'"
                class="password-toggle-icon"
              />
            </button>
            <mat-error *ngIf="registerForm.controls.password.hasError('required')">A jelszó kötelező.</mat-error>
            <mat-error *ngIf="registerForm.controls.password.hasError('minlength')">Minimum 6 karakter szükséges.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Jelszó megerősítése</mat-label>
            <input
              matInput
              [type]="showPasswordConfirm ? 'text' : 'password'"
              formControlName="passwordConfirm"
              autocomplete="new-password"
            />
            <button mat-icon-button matSuffix type="button" class="password-toggle" (click)="togglePasswordConfirmVisibility()" aria-label="Jelszó megerősítés megjelenítése/elrejtése">
              <img
                [src]="showPasswordConfirm ? 'assets/images/eye-closed-icon.svg' : 'assets/images/eye-open-icon.svg'"
                [alt]="showPasswordConfirm ? 'Jelszó megerősítés elrejtése' : 'Jelszó megerősítés megjelenítése'"
                [title]="showPasswordConfirm ? 'Jelszó megerősítés elrejtése' : 'Jelszó megerősítés megjelenítése'"
                class="password-toggle-icon"
              />
            </button>
            <mat-error *ngIf="registerForm.controls.passwordConfirm.hasError('required')">A megerősítés kötelező.</mat-error>
            <mat-error *ngIf="registerForm.hasError('passwordMismatch')">A két jelszó nem egyezik.</mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" class="full-width" type="submit" [disabled]="registerForm.invalid || isSubmitting">
            <span *ngIf="!isSubmitting">Regisztráció</span>
            <span *ngIf="isSubmitting">Folyamatban...</span>
          </button>
        </form>

        <p class="auth-switch">
          Már van fiókod?
          <a [routerLink]="['/auth/login']" [queryParams]="{ returnUrl: returnUrl }">Bejelentkezés</a>
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
      max-width: 560px;
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

    .name-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      min-width: 0;
    }

    .full-width {
      width: 100%;
    }

    .auth-switch {
      margin: 16px 0 0;
      text-align: center;
    }

    .password-toggle {
      width: 36px;
      height: 36px;
      padding: 0;
      min-width: 36px;
    }

    .password-toggle-icon {
      width: 20px;
      height: 20px;
      display: block;
      opacity: 0.85;
    }

    @media (max-width: 768px) {
      .name-row {
        grid-template-columns: 1fr;
      }
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
export class RegisterComponent {
  isSubmitting = false;
  errorMessage: string | null = null;
  returnUrl = '/';
  showPassword = false;
  showPasswordConfirm = false;

  registerForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator() });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.capitalizeNameControl('firstName');
    this.capitalizeNameControl('lastName');

    this.errorMessage = null;
    this.isSubmitting = true;

    const formValue = this.registerForm.getRawValue();
    const request: RegisterRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone || undefined,
      password: formValue.password,
      passwordConfirm: formValue.passwordConfirm
    };

    this.authService.register(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigateByUrl(this.resolvePostAuthUrl(response.user.role));
          return;
        }

        this.errorMessage = response.message || 'Sikertelen regisztráció.';
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

  capitalizeNameControl(controlName: 'firstName' | 'lastName'): void {
    const control = this.registerForm.controls[controlName];
    const value = control.value ?? '';
    if (!value.trim()) {
      return;
    }

    const capitalized = this.capitalizeWords(value);

    if (capitalized !== control.value) {
      control.setValue(capitalized);
    }
  }

  onNameInput(controlName: 'firstName' | 'lastName'): void {
    const control = this.registerForm.controls[controlName];
    const value = control.value ?? '';
    if (!value) {
      return;
    }

    const capitalized = this.capitalizeWords(value);

    if (capitalized !== control.value) {
      control.setValue(capitalized, { emitEvent: false });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility(): void {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  private capitalizeWords(value: string): string {
    return value
      .split(/(\s+)/)
      .map(part => {
        if (!part.trim()) {
          return part;
        }

        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join('');
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;

      if (!password || !passwordConfirm) {
        return null;
      }

      return password === passwordConfirm ? null : { passwordMismatch: true };
    };
  }
}
