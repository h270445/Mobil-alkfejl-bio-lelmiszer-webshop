import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartFeedbackService } from '../../core/services/cart-feedback.service';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    ProductCardComponent,
    LoadingSpinnerComponent
  ],
  template: `
    <section class="home-section">
      <!-- Hero Section -->
      <div class="hero">
        <h1>Üdvözlünk a BioMarket-ben!</h1>
        <p>Bio élelmiszerek és természetes termékek a legjobb minőségben.</p>
        <button mat-raised-button color="primary" routerLink="/products">
          Termékek böngészése
        </button>
      </div>

      <!-- Categories Preview -->
      <div class="categories-preview">
        <h2>Kategóriák</h2>
        <div class="category-grid">
          <a *ngFor="let cat of categories"
             class="category-link"
             [routerLink]="['/products']"
             [queryParams]="{ category: cat.slug }">
            {{ cat.name }}
          </a>
        </div>
      </div>

      <!-- Featured Products -->
      <div class="featured-products">
        <h2>Kiemelt Termékek</h2>
        <div *ngIf="loading" class="loading-container">
          <app-loading-spinner></app-loading-spinner>
        </div>
        <div *ngIf="!loading" class="product-grid">
          <app-product-card
            *ngFor="let product of featuredProducts"
            [product]="product"
            (addToCart)="onAddToCart($event)"
            (viewDetails)="onViewDetails($event)">
          </app-product-card>
        </div>
      </div>

      <!-- Info Section -->
      <div class="info-section">
        <h2>Miért válaszd a BioMarketot?</h2>
        <div class="info-grid">
          <div class="info-card">
            <img src="assets/images/why-bio-icon.svg" alt="Bio minőség" title="Bio minőség" class="info-card-icon" />
            <h3>100% Bio</h3>
            <p>Csak minősített bio termékek</p>
          </div>
          <div class="info-card">
            <img src="assets/images/why-shipping-icon.svg" alt="Gyors szállítás" title="Gyors szállítás" class="info-card-icon" />
            <h3>Gyors Szállítás</h3>
            <p>1-2 nap alatt a pultodra</p>
          </div>
          <div class="info-card">
            <img src="assets/images/why-quality-icon.svg" alt="Minőség garantált" title="Minőség garantált" class="info-card-icon" />
            <h3>Minőség Garantált</h3>
            <p>Teljes visszavásárlási garancia</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      --color-primary: #4caf50;
      --color-surface: #F6F6F7;
      --color-surface-bio: #C1EDCE;
      --color-text-primary: rgba(0, 0, 0, 0.87);
      --color-text-secondary: rgba(0, 0, 0, 0.6);
    }

    .home-section {
      padding: 40px 20px;
    }

    .hero {
      text-align: center;
      margin-bottom: 60px;
      padding: 40px;
      background: linear-gradient(135deg, var(--color-surface-bio) 0%, var(--color-surface) 100%);
      border-radius: 12px;
    }

    .hero h1 {
      font-size: 36px;
      margin-bottom: 16px;
      color: var(--color-primary);
    }

    .hero p {
      font-size: 18px;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }

    .categories-preview,
    .featured-products {
      margin-bottom: 60px;
    }

    .categories-preview h2,
    .featured-products h2,
    .info-section h2 {
      text-align: center;
      margin-bottom: 32px;
      color: var(--color-primary);
      font-size: 28px;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }

    .category-link {
      display: block;
      padding: 16px;
      text-align: center;
      background: var(--color-surface-bio);
      border-radius: 8px;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .category-link:hover {
      background: var(--color-primary);
      color: white;
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .info-section {
      margin-top: 80px;
      padding-top: 40px;
      border-top: 2px solid var(--color-surface-bio);
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .info-card {
      text-align: center;
      padding: 24px;
      background: var(--color-surface);
      border-radius: 12px;
      border-left: 4px solid var(--color-primary);
    }

    .info-card-icon {
      width: 48px;
      height: 48px;
      display: block;
      margin: 0 auto 16px;
    }

    .info-card h3 {
      margin: 16px 0 8px 0;
      color: var(--color-primary);
    }

    .info-card p {
      color: var(--color-text-secondary);
      margin: 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .home-section {
        padding: 20px 12px;
      }

      .hero {
        padding: 24px;
        margin-bottom: 40px;
      }

      .hero h1 {
        font-size: 24px;
      }

      .hero p {
        font-size: 16px;
      }

      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }

      .info-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = false;

  categories = [
    { name: 'Tejtermékek', slug: 'tejtermekek' },
    { name: 'Pékáruk', slug: 'pekaruk' },
    { name: 'Zöldség-gyümölcs', slug: 'zoldseg-gyumolcs' },
    { name: 'Húskészítmények', slug: 'huskeszitmenyek' },
    { name: 'Italok', slug: 'italok' },
    { name: 'Snackek', slug: 'snackek' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cartFeedbackService: CartFeedbackService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.loading = true;
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading featured products:', err);
        this.loading = false;
      }
    });
  }

  onAddToCart(product: Product): void {
    const addResult = this.cartService.addToCart(product, 1);
    if (addResult.addedQuantity > 0) {
      this.cartFeedbackService.showAddToCartStatus(product.name, addResult.addedQuantity);
      return;
    }

    this.cartFeedbackService.showPurchaseFailedStatus(
      'A termékből jelenleg nincs rendelhető készlet, ezért nem került a kosárba.'
    );
  }

  onViewDetails(product: Product): void {
    console.log('View product details:', product.id);
    // Navigate to product detail page (Week 2-ben)
  }
}
