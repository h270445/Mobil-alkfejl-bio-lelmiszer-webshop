import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ProductCardComponent
  ],
  template: `
    <div class="favorites-container">
      <h1>Kedvencek</h1>

      <div *ngIf="isLoading" class="loading">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!isLoading && favoriteProducts.length === 0" class="empty-state">
        <div class="empty-icon">♡</div>
        <h2>Nincsenek kedvencek</h2>
        <p>Klikk a szívikra a termékeken, hogy hozzáadj a kedvencekhez</p>
        <button mat-raised-button color="primary" routerLink="/products">
          Termékek Megtekintése
        </button>
      </div>

      <div *ngIf="!isLoading && favoriteProducts.length > 0" class="favorites-grid">
        <app-product-card
          *ngFor="let product of favoriteProducts"
          [product]="product"
          (removeFavorite)="onRemoveFavorite($event)"
        ></app-product-card>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    h1 {
      color: var(--text-dark, #333);
      margin-bottom: 32px;
      font-size: 28px;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      gap: 24px;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      opacity: 0.3;
    }

    .empty-state h2 {
      color: var(--text-dark, #333);
      font-size: 24px;
      margin: 0;
    }

    .empty-state p {
      color: var(--text-secondary, #666);
      font-size: 16px;
      margin: 0;
      max-width: 300px;
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .favorites-container {
        padding: 16px 12px;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .favorites-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 16px;
      }
    }

    @media (max-width: 390px) {
      .favorites-container {
        padding: 12px 8px;
      }

      h1 {
        font-size: 20px;
      }

      .favorites-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 12px;
      }

      .empty-icon {
        font-size: 48px;
      }

      .empty-state h2 {
        font-size: 20px;
      }

      .empty-state p {
        font-size: 14px;
      }
    }
  `]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteProducts: Product[] = [];
  isLoading = true;

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFavorites() {
    this.isLoading = true;
    
    // Get all products and filter by favorites
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.productService.favoriteProductIds$
            .pipe(takeUntil(this.destroy$))
            .subscribe(favoriteIds => {
              this.favoriteProducts = products.filter(p => 
                favoriteIds.includes(p.id)
              );
              this.isLoading = false;
            });
        },
        error: (err) => {
          console.error('Error loading favorites:', err);
          this.isLoading = false;
        }
      });
  }

  onRemoveFavorite(productId: number) {
    this.productService.removeFavorite(productId);
    this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== productId);
  }
}
