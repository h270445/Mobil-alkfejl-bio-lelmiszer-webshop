import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { OrderService } from '../../../core/services/order.service';
import { MOCK_USERS } from '../../../shared/mock-data';
import { Order, PaymentMethod } from '../../../shared/models';

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatButtonModule, MatSelectModule,
    MatFormFieldModule, MatDividerModule, MatSnackBarModule
  ],
  template: `
    <div class="detail-container">
      <button mat-button routerLink="/admin/orders" class="back-btn">
        <img src="assets/images/arrow-back-icon.svg" class="btn-icon" alt="Vissza" />
        Vissza a rendelésekhez
      </button>

      <div *ngIf="loading" class="loading-state">Betöltés...</div>

      <div *ngIf="!loading && !order" class="not-found">
        <h2>Rendelés nem található</h2>
        <button mat-raised-button color="primary" routerLink="/admin/orders">Rendelések</button>
      </div>

      <ng-container *ngIf="!loading && order">
        <div class="detail-header">
          <div>
            <h1>Rendelés #{{ order.id }}</h1>
            <p class="meta">{{ order.createdAt | date:'yyyy. MM. dd. HH:mm' }}</p>
            <p class="meta">Vásárló: <strong>{{ getUserName(order.userId) }}</strong></p>
          </div>
          <span class="status-badge" [ngClass]="getStatusClass(order.status)">
            {{ getStatusLabel(order.status) }}
          </span>
        </div>

        <mat-divider></mat-divider>

        <!-- Items -->
        <section class="section">
          <h2>Tételek</h2>
          <div class="item-row" *ngFor="let item of order.items">
            <span class="item-name">{{ item.productName }}</span>
            <span class="item-qty">× {{ item.quantity }}</span>
            <span class="item-price">{{ item.priceAtPurchase * item.quantity | number }} Ft</span>
          </div>
          <mat-divider></mat-divider>
          <div class="total-row">
            <strong>Összesen</strong>
            <strong>{{ order.totalPrice | number }} Ft</strong>
          </div>
        </section>

        <!-- Shipping address -->
        <section class="section">
          <h2>Szállítási cím</h2>
          <p>{{ order.shippingAddress.street }} {{ order.shippingAddress.houseNumber }}</p>
          <p>{{ order.shippingAddress.zipCode }} {{ order.shippingAddress.city }}</p>
          <p>{{ order.shippingAddress.country }}</p>
        </section>

        <section class="section">
          <h2>Fizetési mód</h2>
          <p>{{ getPaymentMethodLabel(order.paymentMethod) }}</p>
        </section>

        <mat-divider></mat-divider>

        <!-- Status change -->
        <section class="section status-section">
          <h2>Státusz módosítása</h2>
          <div class="status-row">
            <mat-form-field appearance="outline">
              <mat-label>Új státusz</mat-label>
              <mat-select [(ngModel)]="newStatus">
                <mat-option value="pending">Függőben</mat-option>
                <mat-option value="paid">Fizetve</mat-option>
                <mat-option value="shipped">Szállítás alatt</mat-option>
                <mat-option value="delivered">Kézbesítve</mat-option>
                <mat-option value="cancelled">Törölve</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-raised-button color="primary"
                    (click)="onSaveStatus()"
                    [disabled]="saving || newStatus === order.status">
              {{ saving ? 'Mentés...' : 'Státusz mentése' }}
            </button>
          </div>
        </section>
      </ng-container>
    </div>
  `,
  styles: [`
    .detail-container { max-width: 700px; margin: 0 auto; }

    .back-btn { margin-bottom: 16px; }
    .btn-icon { width: 18px; height: 18px; vertical-align: middle; margin-right: 4px; }

    .loading-state, .not-found { padding: 40px; text-align: center; color: var(--color-text-secondary); }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    h1 { margin: 0 0 4px; }
    .meta { margin: 2px 0; font-size: 14px; color: var(--color-text-secondary); }

    .section { margin: 20px 0; }
    .section h2 { margin: 0 0 12px; font-size: 16px; }
    .section p { margin: 2px 0; }

    .item-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }

    .item-name { flex: 1; }
    .item-qty  { color: var(--color-text-secondary); font-size: 14px; width: 40px; text-align: center; }
    .item-price{ font-weight: 500; width: 100px; text-align: right; }

    .total-row { display: flex; justify-content: space-between; padding: 12px 0 0; font-size: 16px; }

    .status-row { display: flex; align-items: flex-start; gap: 12px; }
    .status-row mat-form-field { width: 220px; }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }

    .status-pending  { background: #fff3e0; color: #e65100; }
    .status-paid     { background: #e3f2fd; color: #1565c0; }
    .status-shipped  { background: #e0f2f1; color: #00695c; }
    .status-delivered{ background: #e8f5e9; color: #2e7d32; }
    .status-cancelled{ background: #fafafa; color: #757575; }
  `]
})
export class AdminOrderDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  order: Order | null = null;
  loading = true;
  saving = false;
  newStatus: Order['status'] = 'pending';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) { this.loading = false; return; }

    this.orderService.getOrderById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(order => {
        this.order = order ?? null;
        if (this.order) this.newStatus = this.order.status;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSaveStatus(): void {
    if (!this.order) return;
    this.saving = true;

    this.orderService.updateOrderStatus(this.order.id, this.newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        this.saving = false;
        if (success) {
          this.order!.status = this.newStatus;
          this.snackBar.open('Státusz frissítve.', 'OK', { duration: 3000 });
        }
      });
  }

  getUserName(userId: number): string {
    const user = MOCK_USERS.find(u => u.id === userId);
      return user ? `${user.firstName} ${user.lastName}` : `Felhasználó #${userId}`;
  }

  getStatusLabel(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
      pending:   'Függőben',
      paid:      'Fizetve',
      shipped:   'Szállítás alatt',
      delivered: 'Kézbesítve',
      cancelled: 'Törölve'
    };
    return labels[status];
  }

  getStatusClass(status: Order['status']): string {
    return `status-${status}`;
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    const labels: Record<PaymentMethod, string> = {
      card: 'Bankkártya',
      paypal: 'PayPal',
      'bank-transfer': 'Banki utalás',
      cod: 'Utánvét'
    };

    return labels[method] ?? method;
  }
}
