import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CartFeedbackService } from '../../core/services/cart-feedback.service';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  product: Product | null = null;
  loading = true;
  notFound = false;
  selectedQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartFeedbackService: CartFeedbackService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam = params.get('id');
        const productId = Number(idParam);

        if (!idParam || !Number.isInteger(productId) || productId <= 0) {
          this.setNotFoundState();
          return;
        }

        this.loadProduct(productId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBackToProducts(): void {
    this.router.navigate(['/products']);
  }

  onAddToCart(): void {
    if (!this.product || !this.product.inStock || this.maxAddableQuantity === 0) {
      this.cartFeedbackService.showPurchaseFailedStatus('A termék jelenleg nem elérhető, ezért nem került a kosárba.');
      return;
    }

    this.productService.getProductById(this.product.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(latestProduct => {
        if (!latestProduct || !latestProduct.isActive || !latestProduct.inStock) {
          this.product = latestProduct ?? this.product;
          this.selectedQuantity = 0;
          this.cartFeedbackService.showPurchaseFailedStatus('A termék időközben elfogyott, ezért a vásárlás nem sikerült.');
          return;
        }

        this.product = latestProduct;

        const alreadyInCart = this.cartService.getProductQuantity(latestProduct.id);
        const currentlyAvailable = Math.max(0, latestProduct.stockQuantity - alreadyInCart);

        if (currentlyAvailable === 0) {
          this.selectedQuantity = 0;
          this.cartFeedbackService.showPurchaseFailedStatus(
            'A kiválasztott termékből már nincs rendelhető mennyiség. A vásárlás nem történt meg.'
          );
          return;
        }

        const requestedQuantity = this.normalizeQuantity(this.selectedQuantity);
        if (requestedQuantity > currentlyAvailable) {
          this.cartFeedbackService.showPurchaseFailedStatus(
            `Készletváltozás történt: ${requestedQuantity} db helyett csak ${currentlyAvailable} db érhető el. ` +
            'A vásárlás nem történt meg, kérlek módosítsd a mennyiséget.'
          );
          this.syncSelectedQuantity();
          return;
        }

        const addResult = this.cartService.addToCart(latestProduct, requestedQuantity);
        if (addResult.addedQuantity > 0) {
          this.cartFeedbackService.showAddToCartStatus(latestProduct, addResult);
        } else {
          this.cartFeedbackService.showPurchaseFailedStatus(
            'A kiválasztott mennyiség már nem rendelhető, ezért a vásárlás nem sikerült.'
          );
        }

        this.syncSelectedQuantity();
      });
  }

  onIncreaseQuantity(): void {
    if (this.maxAddableQuantity > 0) {
      this.selectedQuantity = Math.min(this.maxAddableQuantity, this.selectedQuantity + 1);
    }
  }

  onDecreaseQuantity(): void {
    if (this.maxAddableQuantity > 0) {
      this.selectedQuantity = Math.max(1, this.selectedQuantity - 1);
    }
  }

  onQuantityInput(value: string | number): void {
    this.selectedQuantity = this.normalizeQuantity(value);
  }

  get maxAddableQuantity(): number {
    if (!this.product || !this.product.inStock) {
      return 0;
    }

    const alreadyInCart = this.cartService.getProductQuantity(this.product.id);
    return Math.max(0, this.product.stockQuantity - alreadyInCart);
  }

  private normalizeQuantity(value: string | number): number {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return this.maxAddableQuantity > 0 ? 1 : 0;
    }

    const rounded = Math.floor(parsed);
    return Math.min(this.maxAddableQuantity, Math.max(1, rounded));
  }

  private syncSelectedQuantity(): void {
    if (this.maxAddableQuantity <= 0) {
      this.selectedQuantity = 0;
      return;
    }

    if (this.selectedQuantity < 1) {
      this.selectedQuantity = 1;
      return;
    }

    if (this.selectedQuantity > this.maxAddableQuantity) {
      this.selectedQuantity = this.maxAddableQuantity;
    }
  }

  private loadProduct(productId: number): void {
    this.loading = true;
    this.notFound = false;
    this.product = null;

    this.productService.getProductById(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: product => {
          this.product = product ?? null;
          this.notFound = !product;
          this.syncSelectedQuantity();
          this.loading = false;
        },
        error: () => {
          this.setNotFoundState();
        }
      });
  }

  private setNotFoundState(): void {
    this.product = null;
    this.notFound = true;
    this.loading = false;
  }
}
