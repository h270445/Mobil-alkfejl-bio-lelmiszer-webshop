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

      .products-table {
        width: 100%;
      }

      /* Hide columns on mobile to prevent horizontal scroll */
      .mat-column-category,
      .mat-column-price,
      .mat-column-stockQuantity,
      .mat-column-isActive {
        display: none;
      }

      .mat-column-sku {
        flex: 0 0 70px;
        min-width: 70px;
      }

      .mat-column-name {
        flex: 1;
        min-width: auto;
      }

      .mat-column-actions {
        flex: 0 0 70px;
        min-width: 70px;
      }
    }
  `]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  allProducts: Product[] = [];
  filtered: Product[] = [];
  filterText = '';
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
            this.snackBar.open('Termék törölve.', 'OK', { duration: 3000 });
          });
      });
  }
}
