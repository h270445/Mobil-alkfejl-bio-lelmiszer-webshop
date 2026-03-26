import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';
import { CartFeedbackService } from '../../core/services/cart-feedback.service';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { Product, CartItem } from '../../shared/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$ = this.cartService.cartItems$;
  recommendedProducts: Product[] = [];
  isLoading = false;
  isCheckoutDisabled = false;
  outOfStockProducts: Set<number> = new Set();

  private destroy$ = new Subject<void>();
  
  // Shipping constants
  readonly SHIPPING_THRESHOLD = 3500;
  readonly SHIPPING_COST = 500;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartFeedbackService: CartFeedbackService
  ) {}

  ngOnInit(): void {
    this.loadRecommendedProducts();
    this.checkOutOfStockItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load recommended products (top rated, in stock)
   */
  private loadRecommendedProducts(): void {
    this.productService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.recommendedProducts = products;
      });
  }

  /**
   * Check for out-of-stock items in cart
   */
  private checkOutOfStockItems(): void {
    this.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.outOfStockProducts.clear();
        items.forEach(item => {
          if (!item.product.inStock) {
            this.outOfStockProducts.add(item.product.id);
          }
        });
        
        // Disable checkout if any out-of-stock items
        this.isCheckoutDisabled = this.outOfStockProducts.size > 0;
      });
  }

  /**
   * Get subtotal (sum of products)
   */
  get subtotal(): number {
    return this.cartService.totalPrice;
  }

  /**
   * Get shipping cost based on subtotal
   */
  get shippingCost(): number {
    return this.subtotal < this.SHIPPING_THRESHOLD ? this.SHIPPING_COST : 0;
  }

  /**
   * Get total (subtotal + shipping)
   */
  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  /**
   * Check if cart is empty
   */
  get isEmpty(): boolean {
    return this.cartService.isEmpty;
  }

  /**
   * Get item count
   */
  get itemCount(): number {
    return this.cartService.itemCount;
  }

  /**
   * Increase product quantity
   */
  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
    this.snackBar.open('Mennyiség növelve', 'Bezár', { duration: 2000 });
  }

  /**
   * Decrease product quantity
   */
  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.snackBar.open('Mennyiség csökkentve', 'Bezár', { duration: 2000 });
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: number, productName: string): void {
    const removedItem = this.cartService.cartItemsValue.find(item => item.product.id === productId);

    this.cartService.removeFromCart(productId);

    const snackRef = this.snackBar.open(
      `${productName} termék eltávolítva a kosárból.`,
      'Visszavonás',
      { duration: 5000 }
    );

    snackRef.onAction().pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (!removedItem) {
        return;
      }

      const restoreResult = this.cartService.addToCart(removedItem.product, removedItem.quantity);

      if (restoreResult.addedQuantity === removedItem.quantity) {
        this.snackBar.open(`${productName} visszaállítva`, 'Bezár', { duration: 2000 });
        return;
      }

      if (restoreResult.addedQuantity > 0) {
        this.snackBar.open(
          `Készletváltozás történt: ${restoreResult.addedQuantity} db került vissza a kosárba.`,
          'Bezár',
          { duration: 3200 }
        );
        return;
      }

      this.snackBar.open(
        `${productName} nem állítható vissza, mert időközben elfogyott.`,
        'Bezár',
        { duration: 3200 }
      );
    });
  }

  /**
   * Clear entire cart with confirmation
   */
  clearCart(): void {
    if (confirm('Biztosan üríted az egész kosarat?')) {
      this.cartService.clearCart();
      this.snackBar.open('Kosár ürítve', 'Bezár', { duration: 2000 });
    }
  }

  /**
   * Continue shopping - navigate to products
   */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  /**
   * Proceed to checkout
   */
  proceedToCheckout(): void {
    // Check authentication
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: '/checkout' } 
      });
      return;
    }

    // Check for out-of-stock items
    if (this.isCheckoutDisabled) {
      this.snackBar.open('Kérlek távolítsd el az elfogyott termékeket', 'Bezár', { duration: 3000 });
      return;
    }

    // Navigate to checkout
    this.router.navigate(['/checkout']);
  }

  /**
   * Add recommended product to cart
   */
  addRecommendedToCart(product: Product): void {
    const addResult = this.cartService.addToCart(product, 1);
    if (addResult.addedQuantity > 0) {
      this.cartFeedbackService.showAddToCartStatus(product, addResult);
      return;
    }

    this.cartFeedbackService.showPurchaseFailedStatus(
      'A termékből már nincs rendelhető készlet, ezért nem került a kosárba.'
    );
  }

  /**
   * Check if product is out of stock
   */
  isOutOfStock(productId: number): boolean {
    return this.outOfStockProducts.has(productId);
  }
}
