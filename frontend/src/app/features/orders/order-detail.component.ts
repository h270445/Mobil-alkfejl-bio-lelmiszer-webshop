import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatDividerModule, MatSnackBarModule
  ],
  template: `
    <div class="detail-container">
      <button mat-button routerLink="/orders" class="back-btn">
        <img src="assets/images/arrow-back-icon.svg" class="btn-icon" alt="Vissza" />
        Vissza a rendelésekhez
      </button>

      <div *ngIf="loading" class="loading-state">Betöltés...</div>

      <div *ngIf="!loading && !order" class="not-found">
        <h2>Rendelés nem található</h2>
        <button mat-raised-button color="primary" routerLink="/orders">Rendeléseim</button>
      </div>

      <ng-container *ngIf="!loading && order">
        <div class="detail-header">
          <div>
            <h1>Rendelés #{{ order.id }}</h1>
            <p class="order-date">{{ order.createdAt | date:'yyyy. MM. dd. HH:mm' }}</p>
          </div>
          <span class="status-badge" [ngClass]="getStatusClass(order.status)">
            {{ getStatusLabel(order.status) }}
          </span>
        </div>

        <mat-divider></mat-divider>

        <!-- Items -->
        <section class="section">
          <h2>Tételek</h2>
          <div class="items-list">
            <div class="item-row" *ngFor="let item of order.items">
              <span class="item-name">{{ item.productName }}</span>
              <span class="item-qty">× {{ item.quantity }}</span>
              <span class="item-price">{{ item.priceAtPurchase * item.quantity | number }} Ft</span>
            </div>
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
          <p>{{ order.shippingAddress.street }}</p>
          <p>{{ order.shippingAddress.zipCode }} {{ order.shippingAddress.city }}</p>
          <p>{{ order.shippingAddress.country }}</p>
        </section>

        <!-- Cancel button -->
        <div *ngIf="order.status === 'pending'" class="cancel-section">
          <mat-divider></mat-divider>
          <button mat-stroked-button color="warn" (click)="onCancel()" [disabled]="cancelling">
            {{ cancelling ? 'Lemondás...' : 'Rendelés lemondása' }}
          </button>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .detail-container { max-width: 700px; margin: 0 auto; }

    .back-btn { margin-bottom: 16px; }
    .btn-icon { width: 18px; height: 18px; vertical-align: middle; margin-right: 4px; }

    .loading-state, .not-found {
      padding: 40px;
      text-align: center;
      color: var(--color-text-secondary);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    h1 { margin: 0 0 4px; }
    .order-date { margin: 0; color: var(--color-text-secondary); font-size: 14px; }

    .section { margin: 20px 0; }
    .section h2 { margin: 0 0 12px; font-size: 16px; }
    .section p { margin: 2px 0; }

    .items-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }

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

    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0 0;
      font-size: 16px;
    }

    .cancel-section { margin-top: 20px; padding-top: 16px; }

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
export class OrderDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  order: Order | null = null;
  loading = true;
  cancelling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const userId = this.authService.currentUserValue?.id;

    if (!userId || isNaN(id)) {
      this.loading = false;
      return;
    }

    this.orderService.getUserOrderById(id, userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(order => {
        this.order = order ?? null;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancel(): void {
    if (!this.order) return;
    this.cancelling = true;
    const userId = this.authService.currentUserValue!.id;

    this.orderService.cancelOrder(this.order.id, userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        this.cancelling = false;
        if (success) {
          this.order!.status = 'cancelled';
          this.snackBar.open('Rendelés sikeresen lemondva.', 'OK', { duration: 3000 });
        }
      });
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
}
