import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { CartFeedbackService } from '../../core/services/cart-feedback.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <section class="profile-settings">
      <h1>Felhasználói beállítások</h1>

      <form class="setting-card profile-card" [formGroup]="profileForm" (ngSubmit)="onSaveProfile()">
        <div class="profile-header">
          <h2>Személyes adatok</h2>
          <p>Alapadataid frissítése a vásárlási és szállítási élményhez.</p>
        </div>

        <div class="profile-grid">
          <mat-form-field appearance="outline">
            <mat-label>Keresztnév</mat-label>
            <input matInput formControlName="firstName" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Vezetéknév</mat-label>
            <input matInput formControlName="lastName" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email cím</mat-label>
            <input matInput formControlName="email" readonly />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Telefonszám</mat-label>
            <input matInput formControlName="phone" placeholder="+36 ..." />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Irányítószám</mat-label>
            <input matInput formControlName="zipCode" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Város</mat-label>
            <input matInput formControlName="city" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Utca</mat-label>
            <input matInput formControlName="street" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Házszám</mat-label>
            <input matInput formControlName="houseNumber" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Ország</mat-label>
            <input matInput formControlName="country" />
          </mat-form-field>

          <h3 class="full-width section-title">Értesítési cím</h3>

          <mat-form-field appearance="outline">
            <mat-label>Értesítési irányítószám</mat-label>
            <input matInput formControlName="notificationZipCode" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Értesítési város</mat-label>
            <input matInput formControlName="notificationCity" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Értesítési utca</mat-label>
            <input matInput formControlName="notificationStreet" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Értesítési házszám</mat-label>
            <input matInput formControlName="notificationHouseNumber" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Értesítési ország</mat-label>
            <input matInput formControlName="notificationCountry" />
          </mat-form-field>
        </div>

        <div class="actions">
          <button type="button" mat-button (click)="onResetForm()">Visszaállítás</button>
          <button type="submit" mat-raised-button color="primary" [disabled]="profileForm.invalid || !profileForm.dirty">
            Mentés
          </button>
        </div>
      </form>

      <div class="setting-card">
        <div class="setting-copy">
          <h2>Kosár popup értesítések</h2>
          <p>
            Termék kosárba helyezésekor megjelenő popup be- vagy kikapcsolása.
          </p>
        </div>

        <label class="switch" aria-label="Kosár popup engedélyezése">
          <input
            type="checkbox"
            [checked]="addToCartPopupEnabled"
            (change)="onToggleAddToCartPopup($event)"
          />
          <span class="slider"></span>
        </label>
      </div>
    </section>
  `,
  styles: [`
    .profile-settings {
      max-width: 860px;
      margin: 0 auto;
      padding: 8px 0;
      display: grid;
      gap: 16px;
    }

    h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .setting-card {
      background: var(--color-surface);
      border-radius: 12px;
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border: 1px solid #e5e5e5;
    }

    .profile-card {
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
    }

    .profile-header h2 {
      margin: 0 0 6px;
      font-size: 20px;
      color: var(--color-text-primary);
    }

    .profile-header p {
      margin: 0;
      color: var(--color-text-secondary);
    }

    .profile-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 4px;
    }

    .section-title {
      margin: 8px 0 0;
      color: var(--color-text-primary);
      font-size: 16px;
    }

    .setting-copy h2 {
      margin: 0 0 8px;
      font-size: 18px;
      color: var(--color-text-primary);
    }

    .setting-copy p {
      margin: 0;
      color: var(--color-text-secondary);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 30px;
      flex: 0 0 auto;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background-color: #c4c4c4;
      transition: .2s;
      border-radius: 999px;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 24px;
      width: 24px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .2s;
      border-radius: 50%;
    }

    input:checked + .slider {
      background-color: var(--color-primary);
    }

    input:checked + .slider:before {
      transform: translateX(22px);
    }

    @media (max-width: 700px) {
      .profile-grid {
        grid-template-columns: 1fr;
      }

      .actions {
        justify-content: flex-start;
      }

      .setting-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  addToCartPopupEnabled = true;
  private currentUser: User | null = null;
  private readonly destroy$ = new Subject<void>();

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    zipCode: [''],
    city: [''],
    street: [''],
    houseNumber: [''],
    country: ['Magyarország'],
    notificationZipCode: [''],
    notificationCity: [''],
    notificationStreet: [''],
    notificationHouseNumber: [''],
    notificationCountry: ['Magyarország']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly cartFeedbackService: CartFeedbackService,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addToCartPopupEnabled = this.cartFeedbackService.isAddToCartPopupEnabled();

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
      this.currentUser = user;
      if (!user) return;

      this.profileForm.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone ?? '',
        zipCode: user.address?.zipCode ?? '',
        city: user.address?.city ?? '',
        street: user.address?.street ?? '',
        houseNumber: user.address?.houseNumber ?? '',
        country: user.address?.country ?? 'Magyarország',
        notificationZipCode: user.notificationAddress?.zipCode ?? user.address?.zipCode ?? '',
        notificationCity: user.notificationAddress?.city ?? user.address?.city ?? '',
        notificationStreet: user.notificationAddress?.street ?? user.address?.street ?? '',
        notificationHouseNumber: user.notificationAddress?.houseNumber ?? user.address?.houseNumber ?? '',
        notificationCountry: user.notificationAddress?.country ?? user.address?.country ?? 'Magyarország'
      });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleAddToCartPopup(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.addToCartPopupEnabled = target.checked;
    this.cartFeedbackService.setAddToCartPopupEnabled(this.addToCartPopupEnabled);
  }

  onSaveProfile(): void {
    if (!this.currentUser || this.profileForm.invalid) return;

    const formValue = this.profileForm.getRawValue();
    const updatedUser: User = {
      ...this.currentUser,
      firstName: formValue.firstName ?? this.currentUser.firstName,
      lastName: formValue.lastName ?? this.currentUser.lastName,
      email: formValue.email ?? this.currentUser.email,
      phone: formValue.phone ?? undefined,
      address: {
        street: formValue.street ?? '',
        houseNumber: formValue.houseNumber ?? '',
        city: formValue.city ?? '',
        zipCode: formValue.zipCode ?? '',
        country: formValue.country ?? 'Magyarország'
      },
      notificationAddress: {
        street: formValue.notificationStreet ?? '',
        houseNumber: formValue.notificationHouseNumber ?? '',
        city: formValue.notificationCity ?? '',
        zipCode: formValue.notificationZipCode ?? '',
        country: formValue.notificationCountry ?? 'Magyarország'
      }
    };

    this.authService.updateProfile(updatedUser);
    this.profileForm.markAsPristine();
    this.snackBar.open('Profil adatok sikeresen mentve.', 'OK', { duration: 3000 });
  }

  onResetForm(): void {
    if (!this.currentUser) return;

    this.profileForm.reset({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      phone: this.currentUser.phone ?? '',
      zipCode: this.currentUser.address?.zipCode ?? '',
      city: this.currentUser.address?.city ?? '',
      street: this.currentUser.address?.street ?? '',
      houseNumber: this.currentUser.address?.houseNumber ?? '',
      country: this.currentUser.address?.country ?? 'Magyarország',
      notificationZipCode: this.currentUser.notificationAddress?.zipCode ?? this.currentUser.address?.zipCode ?? '',
      notificationCity: this.currentUser.notificationAddress?.city ?? this.currentUser.address?.city ?? '',
      notificationStreet: this.currentUser.notificationAddress?.street ?? this.currentUser.address?.street ?? '',
      notificationHouseNumber: this.currentUser.notificationAddress?.houseNumber ?? this.currentUser.address?.houseNumber ?? '',
      notificationCountry: this.currentUser.notificationAddress?.country ?? this.currentUser.address?.country ?? 'Magyarország'
    });
  }
}
