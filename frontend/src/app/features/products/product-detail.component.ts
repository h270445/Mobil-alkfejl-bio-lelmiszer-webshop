import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product);
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
