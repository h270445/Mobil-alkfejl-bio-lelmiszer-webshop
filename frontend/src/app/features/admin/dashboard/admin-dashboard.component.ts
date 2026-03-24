import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, combineLatest, takeUntil } from 'rxjs';

import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { MOCK_USERS } from '../../../shared/mock-data';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatDividerModule, MatSnackBarModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div>
          <h1>Admin irányítópult</h1>
          <p class="subtitle">BioMarket adminisztrációs felület</p>
        </div>
        <span class="admin-badge">Admin</span>
      </div>

      <!-- KPI cards -->
      <div class="kpi-grid">
        <mat-card class="kpi-card">
          <div class="kpi-value">{{ stats.totalProducts }}</div>
          <div class="kpi-label">Összes termék</div>
        </mat-card>
        <mat-card class="kpi-card kpi-active">
          <div class="kpi-value">{{ stats.activeProducts }}</div>
          <div class="kpi-label">Aktív termék</div>
        </mat-card>
        <mat-card class="kpi-card kpi-warn">
          <div class="kpi-value">{{ stats.outOfStock }}</div>
          <div class="kpi-label">Kifutott</div>
        </mat-card>
        <mat-card class="kpi-card">
          <div class="kpi-value">{{ stats.totalOrders }}</div>
          <div class="kpi-label">Összes rendelés</div>
        </mat-card>
        <mat-card class="kpi-card kpi-pending">
          <div class="kpi-value">{{ stats.pendingOrders }}</div>
          <div class="kpi-label">Függőben lévő</div>
        </mat-card>
        <mat-card class="kpi-card">
          <div class="kpi-value">{{ stats.totalUsers }}</div>
          <div class="kpi-label">Felhasználó</div>
        </mat-card>
        <mat-card class="kpi-card kpi-active">
          <div class="kpi-value">{{ stats.adminUsers }}</div>
          <div class="kpi-label">Admin</div>
        </mat-card>
      </div>

      <!-- Navigation cards -->
      <div class="nav-grid">
        <mat-card class="nav-card" routerLink="/admin/products">
          <img src="assets/images/inventory-icon.svg" class="nav-icon" alt="Termékek" />
          <h3>Termékkezelés</h3>
          <p>Termékek hozzáadása, szerkesztése és törlése</p>
          <button mat-raised-button color="primary">Megnyitás</button>
        </mat-card>

        <mat-card class="nav-card" routerLink="/admin/orders">
          <img src="assets/images/receipt-icon.svg" class="nav-icon" alt="Rendelések" />
          <h3>Rendeléskezelés</h3>
          <p>Rendelések megtekintése és státusz frissítése</p>
          <button mat-raised-button color="primary">Megnyitás</button>
        </mat-card>

        <mat-card class="nav-card" routerLink="/admin/users">
          <img src="assets/images/user-icon.svg" class="nav-icon" alt="Felhasználók" />
          <h3>Felhasználókezelés</h3>
          <p>Profil adatok és jogosultságok adminisztrációja</p>
          <button mat-raised-button color="primary">Megnyitás</button>
        </mat-card>
      </div>

      <mat-divider></mat-divider>

      <!-- Reset section -->
      <div class="reset-section">
        <h2>Tesztadat visszaállítás</h2>
        <p>A termékek és rendelések visszaállnak az eredeti tesztadatokra. A kosár és a bejelentkezési munkamenet megmarad.</p>
        <button mat-stroked-button color="warn" (click)="onReset()" [disabled]="resetting">
          <img src="assets/images/refresh-icon.svg" class="btn-icon warn-icon" alt="Visszaállítás" />
          {{ resetting ? 'Visszaállítás...' : 'Tesztadatok visszaállítása' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 900px; margin: 0 auto; }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    h1 { margin: 0 0 4px; }
    .subtitle { margin: 0; color: var(--color-text-secondary); font-size: 14px; }

    .admin-badge {
      background: var(--color-primary);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .kpi-card {
      padding: 20px;
      text-align: center;
    }

    .kpi-value { font-size: 36px; font-weight: 700; color: var(--color-primary); }
    .kpi-active .kpi-value { color: #2e7d32; }
    .kpi-warn .kpi-value   { color: var(--color-error); }
    .kpi-pending .kpi-value{ color: #e65100; }
    .kpi-label { font-size: 13px; color: var(--color-text-secondary); margin-top: 4px; }

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .nav-card {
      padding: 24px;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }
    .nav-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }

    .nav-icon { width: 40px; height: 40px; margin-bottom: 12px; opacity: 0.8; }

    .nav-card h3 { margin: 0 0 6px; }
    .nav-card p  { margin: 0 0 16px; color: var(--color-text-secondary); font-size: 14px; }

    .reset-section { margin-top: 24px; }
    .reset-section h2 { margin: 0 0 8px; font-size: 18px; }
    .reset-section p  { margin: 0 0 16px; color: var(--color-text-secondary); font-size: 14px; max-width: 560px; }

    .btn-icon { width: 18px; height: 18px; vertical-align: middle; margin-right: 4px; }
    .warn-icon { filter: brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(3000%) hue-rotate(355deg); }
  `]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  stats = {
    totalProducts: 0,
    activeProducts: 0,
    outOfStock: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalUsers: 0,
    adminUsers: 0
  };
  resetting = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.productService.products$,
      this.orderService.orders$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([products, orders]) => {
      this.stats = {
        totalProducts:  products.length,
        activeProducts: products.filter(p => p.isActive).length,
        outOfStock:     products.filter(p => !p.inStock).length,
        totalOrders:    orders.length,
        pendingOrders:  orders.filter(o => o.status === 'pending').length,
        totalUsers:     MOCK_USERS.length,
        adminUsers:     MOCK_USERS.filter(user => user.role === 'admin').length
      };
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onReset(): void {
    this.resetting = true;
    this.productService.resetToMockData();
    this.orderService.resetToMockData();
    this.resetting = false;
    this.snackBar.open('Tesztadatok visszaállítva.', 'OK', { duration: 3000 });
  }
}
