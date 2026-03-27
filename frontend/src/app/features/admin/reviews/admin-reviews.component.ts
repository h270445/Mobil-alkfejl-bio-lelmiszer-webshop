import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, combineLatest, takeUntil } from 'rxjs';

import { CommentService } from '../../../core/services/comment.service';
import { ProductService } from '../../../core/services/product.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Comment } from '../../../shared/models';

interface ReviewRow {
  id: number;
  productId: number;
  productName: string;
  userName: string;
  rating: number;
  isPinned: boolean;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="reviews-container">
      <button mat-button routerLink="/admin" class="back-to-admin-btn">
        <img src="assets/images/arrow-back-icon.svg" class="btn-icon" alt="Vissza" />
        Vissza az admin főfelületre
      </button>

      <div class="page-header">
        <h1>Review kezelése</h1>
        <span class="review-count">{{ filtered.length }} értékelés</span>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Keresés (termék, felhasználó, szöveg)</mat-label>
          <img matPrefix src="assets/images/search-icon.svg" alt="Keresés" class="search-prefix-icon" />
          <input matInput [(ngModel)]="searchText" (ngModelChange)="applyFilter()" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="rating-filter">
          <mat-label>Értékelés</mat-label>
          <mat-select [(ngModel)]="ratingFilter" (ngModelChange)="applyFilter()">
            <mat-option [value]="0">Összes</mat-option>
            <mat-option [value]="5">5 csillag</mat-option>
            <mat-option [value]="4">4 csillag</mat-option>
            <mat-option [value]="3">3 csillag</mat-option>
            <mat-option [value]="2">2 csillag</mat-option>
            <mat-option [value]="1">1 csillag</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="table-wrapper">
        <table mat-table [dataSource]="filtered" class="reviews-table">
          <ng-container matColumnDef="productName">
            <th mat-header-cell *matHeaderCellDef>Termék</th>
            <td mat-cell *matCellDef="let r">{{ r.productName }}</td>
          </ng-container>

          <ng-container matColumnDef="userName">
            <th mat-header-cell *matHeaderCellDef>Felhasználó</th>
            <td mat-cell *matCellDef="let r">{{ r.userName }}</td>
          </ng-container>

          <ng-container matColumnDef="rating">
            <th mat-header-cell *matHeaderCellDef>Értékelés</th>
            <td mat-cell *matCellDef="let r" class="rating-cell">
              <span *ngIf="r.isPinned" class="pinned-chip">Kitűzött</span>
              {{ toStars(r.rating) }}
            </td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Dátum</th>
            <td mat-cell *matCellDef="let r">{{ r.timestamp | date:'yyyy.MM.dd' }}</td>
          </ng-container>

          <ng-container matColumnDef="text">
            <th mat-header-cell *matHeaderCellDef>Szöveg</th>
            <td mat-cell *matCellDef="let r" class="text-cell">{{ r.text }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let r" class="actions-cell">
              <button mat-stroked-button color="primary" (click)="onTogglePin(r)">
                {{ r.isPinned ? 'Kitűzés törlése' : 'Kitűzés' }}
              </button>
              <button mat-stroked-button color="warn" (click)="onDelete(r)">
                Törlés
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <div class="mobile-reviews" *ngIf="filtered.length > 0">
        <article class="review-card" *ngFor="let r of filtered">
          <button
            type="button"
            class="mobile-card-header"
            (click)="toggleExpanded(r.id)"
            [attr.aria-expanded]="isExpanded(r.id)"
          >
            <div>
              <p class="mobile-product">{{ r.productName }}</p>
              <p class="mobile-user">{{ r.userName }}</p>
            </div>
            <div class="mobile-rating-group">
              <span *ngIf="r.isPinned" class="pinned-chip">Kitűzött</span>
              <span class="rating-pill">{{ toStars(r.rating) }}</span>
            </div>
          </button>

          <div class="mobile-card-body" *ngIf="isExpanded(r.id)">
            <p><strong>Dátum:</strong> {{ r.timestamp | date:'yyyy.MM.dd HH:mm' }}</p>
            <p class="review-text">{{ r.text }}</p>

            <div class="mobile-actions">
              <button mat-stroked-button color="primary" (click)="onTogglePin(r)">
                {{ r.isPinned ? 'Kitűzés törlése' : 'Kitűzés' }}
              </button>
              <button mat-stroked-button color="warn" (click)="onDelete(r)">Törlés</button>
            </div>
          </div>
        </article>
      </div>

      <p *ngIf="filtered.length === 0" class="no-results">
        Nincs találat a megadott feltételekkel.
      </p>
    </div>
  `,
  styles: [`
    .reviews-container {
      max-width: 1100px;
      margin: 0 auto;
    }

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
      gap: 8px;
      margin-bottom: 12px;
    }

    h1 {
      margin: 0;
    }

    .review-count {
      color: var(--color-text-secondary);
      font-size: 14px;
    }

    .filters {
      display: grid;
      grid-template-columns: 1fr 180px;
      gap: 12px;
      margin-bottom: 12px;
    }

    .search-field,
    .rating-filter {
      width: 100%;
    }

    .search-prefix-icon {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      opacity: 0.7;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid #ececec;
      border-radius: 12px;
    }

    .reviews-table {
      width: 100%;
      min-width: 920px;
    }

    .rating-cell {
      white-space: nowrap;
      font-weight: 600;
      color: #f57c00;
    }

    .pinned-chip {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      margin-right: 6px;
      border-radius: 999px;
      background: #e8f5e9;
      color: #2e7d32;
      font-size: 11px;
      font-weight: 700;
      vertical-align: middle;
    }

    .text-cell {
      max-width: 360px;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .actions-cell {
      white-space: nowrap;
    }

    .mobile-reviews {
      display: none;
      gap: 10px;
      margin-top: 12px;
    }

    .review-card {
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

    .mobile-product {
      margin: 0;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .mobile-user {
      margin: 2px 0 0;
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .rating-pill {
      padding: 4px 10px;
      border-radius: 999px;
      background: #fff8e1;
      color: #f57c00;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }

    .mobile-rating-group {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
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

    .review-text {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .mobile-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .no-results {
      text-align: center;
      color: var(--color-text-secondary);
      padding: 20px;
      margin: 0;
    }

    @media (max-width: 900px) {
      .filters {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .table-wrapper {
        display: none;
      }

      .mobile-reviews {
        display: grid;
      }
    }
  `]
})
export class AdminReviewsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  reviews: ReviewRow[] = [];
  filtered: ReviewRow[] = [];
  displayedColumns = ['productName', 'userName', 'rating', 'timestamp', 'text', 'actions'];

  searchText = '';
  ratingFilter = 0;
  expandedReviewId: number | null = null;

  constructor(
    private readonly commentService: CommentService,
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.commentService.comments$, 
      this.productService.products$
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([comments, products]) => {
        const productById = new Map(products.map(product => [product.id, product.name]));

        this.reviews = comments
          .map(comment => this.toReviewRow(comment, productById))
          .sort((a, b) => {
            if (a.isPinned !== b.isPinned) {
              return a.isPinned ? -1 : 1;
            }

            return b.timestamp.getTime() - a.timestamp.getTime();
          });

        this.applyFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filtered = this.reviews.filter(review => {
      const ratingMatches = this.ratingFilter === 0 || review.rating === this.ratingFilter;
      const searchMatches =
        !search ||
        review.productName.toLowerCase().includes(search) ||
        review.userName.toLowerCase().includes(search) ||
        review.text.toLowerCase().includes(search);

      return ratingMatches && searchMatches;
    });
  }

  onDelete(review: ReviewRow): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Értékelés törlése',
        message: `Biztosan törlöd ezt az értékelést?\n\nFelhasználó: ${review.userName}\nTermék: ${review.productName}`,
        confirmText: 'Törlés',
        cancelText: 'Mégse'
      }
    });

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }

        this.commentService.deleteComment(review.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(success => {
            if (!success) {
              this.snackBar.open('A törlés nem sikerült.', 'OK', { duration: 3000 });
              return;
            }

            if (this.expandedReviewId === review.id) {
              this.expandedReviewId = null;
            }

            this.snackBar.open('Értékelés törölve.', 'OK', { duration: 2500 });
          });
      });
  }

  onTogglePin(review: ReviewRow): void {
    this.commentService.setPinnedComment(review.id, !review.isPinned)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (!success) {
          this.snackBar.open('A kitűzés módosítása sikertelen.', 'OK', { duration: 3000 });
          return;
        }

        this.snackBar.open(
          review.isPinned ? 'Review kitűzése megszüntetve.' : 'Review kitűzve. Termékenként csak egy lehet kitűzött.',
          'OK',
          { duration: 3000 }
        );
      });
  }

  toggleExpanded(reviewId: number): void {
    this.expandedReviewId = this.expandedReviewId === reviewId ? null : reviewId;
  }

  isExpanded(reviewId: number): boolean {
    return this.expandedReviewId === reviewId;
  }

  toStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  private toReviewRow(comment: Comment, productById: Map<number, string>): ReviewRow {
    return {
      id: comment.id,
      productId: comment.productId,
      productName: productById.get(comment.productId) ?? `Termék #${comment.productId}`,
      userName: comment.userName,
      rating: comment.rating,
      isPinned: !!comment.isPinned,
      text: comment.text,
      timestamp: new Date(comment.timestamp as any)
    };
  }
}
