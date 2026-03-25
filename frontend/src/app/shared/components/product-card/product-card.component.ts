import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() showAddToCart = true;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() removeFavorite = new EventEmitter<number>();

  isFavorite = false;

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.favoriteProductIds$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.isFavorite = favorites.includes(this.product.id);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFavorite(): void {
    this.productService.toggleFavorite(this.product.id);
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }

  onImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    if (imageElement && !imageElement.src.includes('assets/images/product-placeholder.svg')) {
      imageElement.src = 'assets/images/product-placeholder.svg';
    }
  }

  get discount(): number | null {
    if (this.product.originalPrice && this.product.originalPrice > this.product.price) {
      const diff = this.product.originalPrice - this.product.price;
      return Math.round((diff / this.product.originalPrice) * 100);
    }
    return null;
  }
}
