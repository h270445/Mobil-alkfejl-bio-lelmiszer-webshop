import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';

import { OrderService } from '../../../core/services/order.service';
import { MOCK_USERS } from '../../../shared/mock-data';
import { Order } from '../../../shared/models';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatSelectModule, MatFormFieldModule
  ],
  template: `
    <div class="orders-container">
      <div class="page-header">
        <h1>Rendeléskezelés</h1>
        <mat-form-field appearance="outline" class="status-filter">
          <mat-label>Státusz szűrő</mat-label>
          <mat-select [(ngModel)]="statusFilter" (ngModelChange)="applyFilter()">
            <mat-option value="">Összes</mat-option>
            <mat-option value="pending">Függőben</mat-option>
            <mat-option value="paid">Fizetve</mat-option>
            <mat-option value="shipped">Szállítás alatt</mat-option>
            <mat-option value="delivered">Kézbesítve</mat-option>
            <mat-option value="cancelled">Törölve</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="table-wrapper">
        <table mat-table [dataSource]="filtered" class="orders-table">

          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let o">{{ o.id }}</td>
          </ng-container>

          <ng-container matColumnDef="userName">
            <th mat-header-cell *matHeaderCellDef>Vásárló</th>
            <td mat-cell *matCellDef="let o">{{ getUserName(o.userId) }}</td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Dátum</th>
            <td mat-cell *matCellDef="let o">{{ o.createdAt | date:'yyyy.MM.dd' }}</td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Összeg</th>
            <td mat-cell *matCellDef="let o">{{ o.totalPrice | number }} Ft</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Státusz</th>
            <td mat-cell *matCellDef="let o">
              <span class="status-badge" [ngClass]="getStatusClass(o.status)">
                {{ getStatusLabel(o.status) }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let o">
              <button mat-button color="primary" [routerLink]="['/admin/orders', o.id]">
                Részletek
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <p *ngIf="filtered.length === 0" class="no-results">
          Nincs rendelés a kiválasztott feltételeknek megfelelően.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .orders-container { max-width: 1000px; margin: 0 auto; }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    h1 { margin: 0; }

    .status-filter { width: 200px; }

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

    .no-results { text-align: center; color: var(--color-text-secondary); padding: 32px; }
  `]
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  allOrders: Order[] = [];
  filtered: Order[] = [];
  statusFilter = '';
  displayedColumns = ['id', 'userName', 'date', 'total', 'status', 'actions'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.orders$
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => {
        this.allOrders = orders;
        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    this.filtered = this.statusFilter
      ? this.allOrders.filter(o => o.status === this.statusFilter)
      : [...this.allOrders];
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
}
