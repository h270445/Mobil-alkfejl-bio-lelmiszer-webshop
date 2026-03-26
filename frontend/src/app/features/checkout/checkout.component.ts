import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartItem, Address } from '../../shared/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="checkout-container">
      <div class="checkout-content">
        <!-- Success Screen -->
        <div *ngIf="successScreen" class="success-screen">
          <div class="success-icon">✓</div>
          <h2>Rendelés Sikeresen Leadva!</h2>
          <p>Rendelés szám: <strong>#{{ createdOrderId }}</strong></p>
          <div class="success-summary" *ngIf="submittedItems.length > 0">
            <h3>Rendelés részletei</h3>
            <div class="success-summary-item" *ngFor="let item of submittedItems">
              <span>{{ item.product.name }} ({{ item.quantity }} db)</span>
              <strong>{{ (item.product.price * item.quantity) | number:'1.0-0' }} Ft</strong>
            </div>
            <div class="success-summary-total">
              <span>Termékek összesen:</span>
              <strong>{{ submittedSubTotal | number:'1.0-0' }} Ft</strong>
            </div>
            <div class="success-summary-total">
              <span>Szállítási költség:</span>
              <strong>{{ submittedShippingCost === 0 ? 'Ingyenes' : ((submittedShippingCost | number:'1.0-0') + ' Ft') }}</strong>
            </div>
            <div class="success-summary-total grand">
              <span>Végösszeg:</span>
              <strong>{{ submittedGrandTotal | number:'1.0-0' }} Ft</strong>
            </div>
          </div>
          <p class="success-message">Köszönjük a vásárlást!</p>
          <button mat-raised-button color="primary" (click)="goToOrders()">
            Rendelések Megtekintése
          </button>
          <button mat-stroked-button (click)="continueShopping()">
            További vásárlás
          </button>
        </div>

        <!-- Checkout Form -->
        <div *ngIf="!successScreen">
          <h1>Szállítási Cím</h1>

          <div *ngIf="addressPrefilled" class="prefill-info" role="status" aria-live="polite">
            A profilodból betöltöttük a szállítási címet. Rendelés előtt ellenőrizd az adatokat.
          </div>
          
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="checkout-form">
            <!-- Address Fields -->
            <div class="form-section">
              <h3>Szállítási Adatok</h3>
              
              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Utca és házszám</mat-label>
                <input matInput formControlName="street" placeholder="pl. Fő utca 123">
                <mat-error *ngIf="checkoutForm.get('street')?.hasError('required')">
                  Az utca megadása kötelező
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Város</mat-label>
                <input matInput formControlName="city" placeholder="pl. Budapest">
                <mat-error *ngIf="checkoutForm.get('city')?.hasError('required')">
                  A város megadása kötelező
                </mat-error>
              </mat-form-field>

              <div class="form-row">
                <mat-form-field appearance="fill" class="half-width">
                  <mat-label>Irányítószám</mat-label>
                  <input matInput formControlName="zipCode" placeholder="pl. 1011">
                  <mat-error *ngIf="checkoutForm.get('zipCode')?.hasError('required')">
                    Az irányítószám megadása kötelező
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="fill" class="half-width">
                  <mat-label>Ország</mat-label>
                  <input matInput formControlName="country" placeholder="pl. Magyarország">
                  <mat-error *ngIf="checkoutForm.get('country')?.hasError('required')">
                    Az ország megadása kötelező
                  </mat-error>
                </mat-form-field>
              </div>

              <!-- Save to Profile Option -->
              <mat-checkbox formControlName="saveToProfile" class="save-checkbox">
                Szállítási cím mentése a profilba
              </mat-checkbox>
            </div>

            <!-- Cart Summary -->
            <mat-card class="order-summary">
              <mat-card-header>
                <mat-card-title>Rendelés Összefoglalása</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="summary-items">
                  <div *ngIf="cartItems.length === 0" class="empty-cart">
                    A kosarad üres
                  </div>
                  
                  <div *ngFor="let item of cartItems" class="summary-item">
                    <span class="item-name">{{ item.product.name }}</span>
                    <span class="item-qty">{{ item.quantity }}x</span>
                    <span class="item-price">
                      {{ (item.product.price * item.quantity) | number:'1.0-0' }} Ft
                    </span>
                  </div>
                </div>

                <mat-divider class="summary-divider"></mat-divider>

                <div class="summary-totals">
                  <div class="total-row">
                    <span>Termékek:</span>
                    <span>{{ subTotal | number:'1.0-0' }} Ft</span>
                  </div>
                  <div class="total-row">
                    <span>Szállítás:</span>
                    <span [class.free]="shippingCost === 0">
                      {{ shippingCost === 0 ? 'Ingyenes' : (shippingCost + ' Ft') }}
                    </span>
                  </div>
                  <div class="total-row grand-total">
                    <span>Végösszesen:</span>
                    <span>{{ (subTotal + shippingCost) | number:'1.0-0' }} Ft</span>
                  </div>
                </div>

                <div *ngIf="shippingCost === 0" class="shipping-info">
                  🎁 Ingyenes szállítás 3500 Ft feletti rendelésnél!
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Submit Button -->
            <div class="form-actions">
              <button
                type="submit"
                mat-raised-button
                color="primary"
                [disabled]="checkoutForm.invalid || isSubmitting"
                class="full-width desktop-submit-btn"
              >
                <mat-spinner *ngIf="isSubmitting" diameter="20" class="spinner-inline"></mat-spinner>
                {{ isSubmitting ? 'Feldolgozás...' : 'Rendelés Leadása' }}
              </button>
              <button
                type="button"
                mat-stroked-button
                (click)="goBack()"
                class="full-width"
              >
                Vissza a Kosárhoz
              </button>
            </div>
          </form>

          <div class="mobile-sticky-checkout" *ngIf="cartItems.length > 0">
            <div class="sticky-total">
              <span class="sticky-total-label">Végösszeg</span>
              <strong>{{ (subTotal + shippingCost) | number:'1.0-0' }} Ft</strong>
            </div>
            <button
              type="button"
              mat-raised-button
              color="primary"
              (click)="onSubmit()"
              [disabled]="checkoutForm.invalid || isSubmitting"
              class="sticky-submit-btn"
            >
              <mat-spinner *ngIf="isSubmitting" diameter="18" class="spinner-inline"></mat-spinner>
              {{ isSubmitting ? 'Feldolgozás...' : 'Rendelés Leadása' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .mobile-sticky-checkout {
      display: none;
    }

    .checkout-content {
      display: flex;
      flex-direction: column;
    }

    h1 {
      color: var(--text-dark, #333);
      margin-bottom: 24px;
      font-size: 28px;
    }

    h3 {
      color: var(--text-secondary, #666);
      margin-bottom: 16px;
      font-size: 18px;
    }

    .checkout-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .half-width {
      width: 100%;
    }

    .save-checkbox {
      margin-top: 8px;
    }

    .prefill-info {
      margin: 0 0 16px;
      background: #e8f5e9;
      color: #1b5e20;
      border: 1px solid #c8e6c9;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      font-weight: 500;
    }

    .order-summary {
      background: var(--surface-light, #f9f9f9);
      margin: 16px 0;
    }

    .summary-items {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .empty-cart {
      text-align: center;
      color: var(--text-secondary, #999);
      padding: 16px;
    }

    .summary-item {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 12px;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid var(--border-light, #eee);
    }

    .summary-item:last-child {
      border-bottom: none;
    }

    .item-name {
      color: var(--text-dark, #333);
      font-weight: 500;
    }

    .item-qty {
      color: var(--text-secondary, #666);
      font-size: 14px;
    }

    .item-price {
      color: var(--primary-color, #4caf50);
      font-weight: 600;
      text-align: right;
    }

    .summary-divider {
      margin: 12px 0;
    }

    .summary-totals {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .total-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      color: var(--text-dark, #333);
    }

    .total-row.grand-total {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color, #4caf50);
      margin-top: 12px;
      padding-top: 12px;
      border-top: 2px solid var(--primary-color, #4caf50);
    }

    .free {
      color: var(--success-color, #4caf50);
      font-weight: 600;
    }

    .shipping-info {
      background: var(--success-light, #e8f5e9);
      color: var(--success-color, #2e7d32);
      padding: 12px;
      border-radius: 4px;
      margin-top: 12px;
      font-size: 14px;
      font-weight: 500;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 24px;
    }

    .success-screen {
      text-align: center;
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--success-color, #4caf50);
      color: white;
      font-size: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .success-screen h2 {
      color: var(--text-dark, #333);
      font-size: 24px;
      margin: 0;
    }

    .success-screen p {
      color: var(--text-secondary, #666);
      margin: 0;
    }

    .success-summary {
      width: 100%;
      max-width: 560px;
      margin: 0 auto;
      padding: 16px;
      background: #f7f9f7;
      border: 1px solid #e2eee3;
      border-radius: 8px;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .success-summary h3 {
      margin: 0 0 8px;
      font-size: 18px;
      color: var(--text-dark, #333);
    }

    .success-summary-item,
    .success-summary-total {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      color: var(--text-dark, #333);
    }

    .success-summary-total {
      padding-top: 6px;
      border-top: 1px solid #e6ece6;
    }

    .success-summary-total.grand {
      font-size: 16px;
      font-weight: 700;
      color: var(--primary-color, #4caf50);
      border-top: 2px solid var(--primary-color, #4caf50);
      padding-top: 8px;
    }

    .success-message {
      font-weight: 500;
      color: var(--primary-color, #4caf50);
      font-size: 16px;
    }

    .spinner-inline {
      margin-right: 8px;
      display: inline-block;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .checkout-container {
        padding: 16px 12px;
        padding-bottom: calc(96px + env(safe-area-inset-bottom));
      }

      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 16px;
      }

      .form-row {
        grid-template-columns: 1fr 1fr;
      }

      .total-row {
        font-size: 14px;
      }

      .total-row.grand-total {
        font-size: 16px;
      }

      .desktop-submit-btn {
        display: none;
      }

      .mobile-sticky-checkout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1100;
        padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
        background: rgba(255, 255, 255, 0.97);
        border-top: 1px solid #e6e6e6;
        box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.08);
      }

      .sticky-total {
        display: flex;
        flex-direction: column;
        min-width: 0;
        color: var(--text-dark, #333);
      }

      .sticky-total-label {
        font-size: 12px;
        color: var(--text-secondary, #666);
      }

      .sticky-submit-btn {
        white-space: nowrap;
      }
    }

    @media (max-width: 390px) {
      .checkout-container {
        padding: 12px 8px;
      }

      h1 {
        font-size: 20px;
      }

      .summary-item {
        font-size: 13px;
        gap: 8px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  subTotal = 0;
  shippingCost = 0;
  isSubmitting = false;
  successScreen = false;
  createdOrderId: number | null = null;
  addressPrefilled = false;
  submittedItems: CartItem[] = [];
  submittedSubTotal = 0;
  submittedShippingCost = 0;
  submittedGrandTotal = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.scrollToTop();
    this.initializeForm();
    this.loadCart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm() {
    const currentUser = this.authService.currentUserValue;
    const savedAddress: Address = currentUser?.address || { street: '', city: '', zipCode: '', country: '' };
    this.addressPrefilled = !!(
      currentUser?.address?.street ||
      currentUser?.address?.city ||
      currentUser?.address?.zipCode ||
      currentUser?.address?.country
    );

    this.checkoutForm = this.fb.group({
      street: [savedAddress.street || '', Validators.required],
      city: [savedAddress.city || '', Validators.required],
      zipCode: [savedAddress.zipCode || '', Validators.required],
      country: [savedAddress.country || 'Magyarország', Validators.required],
      saveToProfile: [false]
    });
  }

  private loadCart() {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        this.calculateTotals();
      });
  }

  private calculateTotals() {
    this.subTotal = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    this.shippingCost = this.calculateShippingCost(this.subTotal);
  }

  private calculateShippingCost(total: number): number {
    const SHIPPING_THRESHOLD = 3500;
    const STANDARD_SHIPPING = 500;
    return total >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  }

  onSubmit() {
    if (this.checkoutForm.invalid || this.cartItems.length === 0) {
      this.checkoutForm.markAllAsTouched();
      this.scrollToFirstInvalidField();
      this.snackBar.open('Kérjük, töltsön ki minden mezőt és legyen tétel a kosárban', 'Bezárás', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSubmitting = true;
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      this.isSubmitting = false;
      this.snackBar.open('Kérjük, jelentkezzen be', 'Bezárás', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const shippingAddress: Address = {
      street: this.checkoutForm.get('street')?.value,
      city: this.checkoutForm.get('city')?.value,
      zipCode: this.checkoutForm.get('zipCode')?.value,
      country: this.checkoutForm.get('country')?.value
    };

    // Save to profile if selected
    if (this.checkoutForm.get('saveToProfile')?.value) {
      this.authService.updateProfile({
        ...currentUser,
        address: shippingAddress
      });
    }

    // Create order
    this.createOrder(currentUser.id, shippingAddress);
  }

  private createOrder(userId: number, shippingAddress: Address) {
    const submittedItems = this.cartItems.map(item => ({ ...item }));
    const submittedSubTotal = this.subTotal;
    const submittedShippingCost = this.shippingCost;

    this.orderService.createOrder(userId, this.cartItems, shippingAddress)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (order) => {
          this.isSubmitting = false;
          this.createdOrderId = order.id;
          this.submittedItems = submittedItems;
          this.submittedSubTotal = submittedSubTotal;
          this.submittedShippingCost = submittedShippingCost;
          this.submittedGrandTotal = submittedSubTotal + submittedShippingCost;
          this.successScreen = true;

          // Clear cart
          this.cartService.clearCart();
          this.snackBar.open(
            `Rendelés leadva! Szállítás: ${submittedShippingCost === 0 ? 'Ingyenes' : submittedShippingCost + ' Ft'}`,
            'Bezárás',
            {
            duration: 4000,
            panelClass: ['success-snackbar']
            }
          );
        },
        error: (err: any) => {
          this.isSubmitting = false;
          console.error('Error creating order:', err);
          this.snackBar.open('Hiba a rendelés létrehozásakor', 'Bezárás', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });
        }
      });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  private scrollToTop() {
    const mainContent = document.querySelector('.main-content') as HTMLElement | null;
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    document.documentElement.scrollTo({ top: 0, behavior: 'auto' });
    document.body.scrollTo({ top: 0, behavior: 'auto' });
  }

  private scrollToFirstInvalidField() {
    setTimeout(() => {
      const firstInvalid = document.querySelector('.checkout-form .ng-invalid') as HTMLElement | null;
      if (!firstInvalid) return;

      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus?.();
    });
  }
}
