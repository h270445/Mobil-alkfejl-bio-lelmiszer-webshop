import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatCardModule],
  template: `
    <div class="orders-container">
      <h1>Rendeléseim</h1>

      <div *ngIf="loading" class="loading-state">Rendelések betöltése...</div>

      <ng-container *ngIf="!loading">
        <!-- Empty state -->
        <mat-card *ngIf="orders.length === 0" class="empty-card">
          <img src="assets/images/receipt-icon.svg" class="empty-icon" alt="Nincs rendelés" />
          <h3>Még nincs rendelésed</h3>
          <p>Böngéssz a termékeink között és add le első rendelésedet!</p>
          <button mat-raised-button color="primary" routerLink="/products">
            Termékek böngészése
          </button>
        </mat-card>

        <!-- Orders table -->
        <div *ngIf="orders.length > 0" class="table-wrapper">
          <table mat-table [dataSource]="orders" class="orders-table">

            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>#</th>
              <td mat-cell *matCellDef="let order">{{ order.id }}</td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Dátum</th>
              <td mat-cell *matCellDef="let order">
                {{ order.createdAt | date:'yyyy.MM.dd' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="itemCount">
              <th mat-header-cell *matHeaderCellDef>Tételek</th>
              <td mat-cell *matCellDef="let order">{{ order.items.length }} db</td>
            </ng-container>

            <ng-container matColumnDef="totalPrice">
              <th mat-header-cell *matHeaderCellDef>Összeg</th>
              <td mat-cell *matCellDef="let order">{{ order.totalPrice | number }} Ft</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Státusz</th>
              <td mat-cell *matCellDef="let order">
                <span class="status-badge" [ngClass]="getStatusClass(order.status)">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let order">
                <button mat-button color="primary" [routerLink]="['/orders', order.id]">
                  Részletek
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 { margin: 0 0 24px; }

    .loading-state {
      padding: 40px;
      text-align: center;
      color: var(--color-text-secondary);
    }

    .empty-card {
      padding: 48px;
      text-align: center;
      background: var(--color-surface);
    }

    .empty-icon {
      width: 56px;
      height: 56px;
      margin-bottom: 16px;
      opacity: 0.35;
    }

    .empty-card h3 { margin: 0 0 8px; }
    .empty-card p { margin: 0 0 20px; color: var(--color-text-secondary); }

    .table-wrapper { overflow-x: auto; }

    .orders-table { width: 100%; }

    .status-badge {
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-pending  { background: #fff3e0; color: #e65100; }
    .status-paid     { background: #e3f2fd; color: #1565c0; }
    .status-shipped  { background: #e0f2f1; color: #00695c; }
    .status-delivered{ background: #e8f5e9; color: #2e7d32; }
    .status-cancelled{ background: #fafafa; color: #757575; }
  `]
})
export class OrderListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  orders: Order[] = [];
  loading = true;
  displayedColumns = ['id', 'createdAt', 'itemCount', 'totalPrice', 'status', 'actions'];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.currentUserValue?.id;
    if (!userId) { this.loading = false; return; }

    this.orderService.getOrderHistory(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => {
        this.orders = orders;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
