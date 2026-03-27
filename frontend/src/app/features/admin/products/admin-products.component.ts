import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { ProductService } from '../../../core/services/product.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Product } from '../../../shared/models';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatTableModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatTooltipModule
  ],
  template: `
    <div class="products-container">
      <button mat-button routerLink="/admin" class="back-to-admin-btn">
        <img src="assets/images/arrow-back-icon.svg" class="btn-icon" alt="Vissza" />
        Vissza az admin főfelületre
      </button>

      <div class="page-header">
        <h1>Termékkezelés</h1>
        <button mat-raised-button color="primary" routerLink="/admin/products/new" class="desktop-add-btn">
          + Új termék
        </button>
      </div>

      <!-- Filter -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Keresés (név, SKU)</mat-label>
        <img matPrefix src="assets/images/search-icon.svg" alt="Keresés" class="search-prefix-icon" />
        <input matInput [(ngModel)]="filterText" (input)="applyFilter()" placeholder="pl. TEJ-001..." />
      </mat-form-field>

      <div class="table-wrapper">
        <table mat-table [dataSource]="filtered" class="products-table">

          <ng-container matColumnDef="sku">
            <th mat-header-cell *matHeaderCellDef>SKU</th>
            <td mat-cell *matCellDef="let p">{{ p.sku }}</td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Név</th>
            <td mat-cell *matCellDef="let p">{{ p.name }}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Kategória</th>
            <td mat-cell *matCellDef="let p">{{ p.category }}</td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Ár</th>
            <td mat-cell *matCellDef="let p" class="price-cell">{{ p.price | number }} Ft</td>
          </ng-container>

          <ng-container matColumnDef="stockQuantity">
            <th mat-header-cell *matHeaderCellDef>Készlet</th>
            <td mat-cell *matCellDef="let p">
              <span [class.out-of-stock]="p.stockQuantity === 0">{{ p.stockQuantity }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="isActive">
            <th mat-header-cell *matHeaderCellDef>Státusz</th>
            <td mat-cell *matCellDef="let p">
              <span class="active-badge" [class.inactive]="!p.isActive">
                {{ p.isActive ? 'Aktív' : 'Inaktív' }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let p">
              <button mat-icon-button [routerLink]="['/admin/products', p.id, 'edit']"
                      matTooltip="Szerkesztés">
                <img src="assets/images/edit-icon.svg" class="action-icon" alt="Szerkesztés" />
              </button>
              <button mat-icon-button color="warn" (click)="onDelete(p)"
                      matTooltip="Törlés">
                <img src="assets/images/delete-icon.svg" class="action-icon warn-icon" alt="Törlés" />
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <p *ngIf="filtered.length === 0" class="no-results">
          Nincs találat a keresési feltételekre.
        </p>
      </div>

      <div class="mobile-products" *ngIf="filtered.length > 0">
        <article class="product-card" *ngFor="let p of filtered">
          <button
            type="button"
            class="mobile-card-header"
            (click)="toggleExpanded(p.id)"
            [attr.aria-expanded]="isExpanded(p.id)"
          >
            <div>
              <p class="mobile-product-name">{{ p.name }}</p>
              <p class="mobile-product-meta">SKU: {{ p.sku }}</p>
            </div>
            <span class="active-badge" [class.inactive]="!p.isActive">
              {{ p.isActive ? 'Aktív' : 'Inaktív' }}
            </span>
          </button>

          <div class="mobile-card-body" *ngIf="isExpanded(p.id)">
            <p><strong>Kategória:</strong> {{ p.category }}</p>
            <p><strong>Ár:</strong> {{ p.price | number }} Ft</p>
            <p><strong>Készlet:</strong> <span [class.out-of-stock]="p.stockQuantity === 0">{{ p.stockQuantity }}</span></p>

            <div class="mobile-actions">
              <button mat-stroked-button color="primary" [routerLink]="['/admin/products', p.id, 'edit']">
                Szerkesztés
              </button>
              <button mat-stroked-button color="warn" (click)="onDelete(p)">
                Törlés
              </button>
            </div>
          </div>
        </article>
      </div>

      <button
        mat-fab
        color="primary"
        routerLink="/admin/products/new"
        class="mobile-add-fab"
        aria-label="Új termék hozzáadása"
      >
        <img src="assets/images/add-icon.svg" alt="Új termék" class="fab-icon" />
      </button>
    </div>
  `,
  styles: [`
    .products-container { max-width: 1100px; margin: 0 auto; }

    .back-to-admin-btn {
      margin-bottom: 8px;
    }

    .btn-icon {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 4px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h1 { margin: 0; }

    .desktop-add-btn {
      white-space: nowrap;
    }

    .mobile-add-fab {
      display: none;
    }

    .search-field { 
      width: 100%; 
      margin-bottom: 8px; 
    }

    .search-field ::ng-deep .mat-mdc-form-field-icon-prefix {
      padding-left: 10px;
      padding-right: 2px;
    }



    .table-wrapper { overflow-x: auto; }
    .products-table { width: 100%; }

    .mobile-products {
      display: none;
      gap: 10px;
      margin-top: 12px;
    }

    .product-card {
      border: 1px solid #ececec;
      border-radius: 12px;
      background: #fff;
      overflow: hidden;
    }

    .mobile-card-header {
      width: 100%;
      text-align: left;
      border: 0;
      background: #fff;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .mobile-product-name {
      margin: 0;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .mobile-product-meta {
      margin: 2px 0 0;
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .mobile-card-body {
      padding: 0 12px 12px;
      border-top: 1px solid #f0f0f0;
    }

    .mobile-card-body p {
      margin: 10px 0 0;
      color: var(--color-text-primary);
      font-size: 14px;
    }

    .mobile-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .price-cell {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .out-of-stock { color: var(--color-error); font-weight: 600; }

    .active-badge {
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 500;
      background: #e8f5e9;
      color: #2e7d32;
    }
    .active-badge.inactive { background: #fafafa; color: #757575; }

    .action-icon { width: 20px; height: 20px; }
    .warn-icon { filter: brightness(0) saturate(100%) invert(20%) sepia(85%) saturate(3000%) hue-rotate(355deg); }

    .search-prefix-icon {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      opacity: 0.7;
    }

    .no-results { text-align: center; color: var(--color-text-secondary); padding: 32px; }

    .fab-icon {
      width: 22px;
      height: 22px;
      filter: brightness(0) invert(1);
      display: block;
    }

    @media (max-width: 768px) {
      .desktop-add-btn {
        display: none;
      }

      .mobile-add-fab {
        display: inline-flex;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 1000;
      }

      .page-header {
        margin-bottom: 12px;
      }

      .table-wrapper {
        display: none;
      }

      .mobile-products {
        display: grid;
      }
    }
  `]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  allProducts: Product[] = [];
  filtered: Product[] = [];
  filterText = '';
  expandedProductId: number | null = null;
  displayedColumns = ['sku', 'name', 'category', 'price', 'stockQuantity', 'isActive', 'actions'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.allProducts = products;
        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    const q = this.filterText.toLowerCase().trim();
    if (!q) { this.filtered = [...this.allProducts]; return; }
    this.filtered = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    );
  }

  onDelete(product: Product): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Termék törlése',
        message: `Biztosan törlöd a „${product.name}" terméket?`,
        confirmText: 'Törlés',
        cancelText: 'Mégse'
      }
    });

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.productService.deleteProduct(product.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            if (this.expandedProductId === product.id) {
              this.expandedProductId = null;
            }
            this.snackBar.open('Termék törölve.', 'OK', { duration: 3000 });
          });
      });
  }

  toggleExpanded(productId: number): void {
    this.expandedProductId = this.expandedProductId === productId ? null : productId;
  }

  isExpanded(productId: number): boolean {
    return this.expandedProductId === productId;
  }
}
