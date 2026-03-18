import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'biomarket_cart';
  private cartItemsSubject: BehaviorSubject<CartItem[]>;
  public cartItems$: Observable<CartItem[]>;

  constructor() {
    const storedCart = this.getCartFromStorage();
    this.cartItemsSubject = new BehaviorSubject<CartItem[]>(storedCart);
    this.cartItems$ = this.cartItemsSubject.asObservable();
  }

  // Getters
  public get cartItemsValue(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  public get itemCount(): number {
    return this.cartItemsValue.reduce((sum, item) => sum + item.quantity, 0);
  }

  public get totalPrice(): number {
    return this.cartItemsValue.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
  }

  public get isEmpty(): boolean {
    return this.cartItemsValue.length === 0;
  }

  // Add product to cart
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartItemsValue;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      // Update quantity of existing item
      existingItem.quantity += quantity;
      this.updateCart(currentCart);
    } else {
      // Add new item
      const newItem: CartItem = { product, quantity };
      this.updateCart([...currentCart, newItem]);
    }
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    const updatedCart = this.cartItemsValue.filter(
      item => item.product.id !== productId
    );
    this.updateCart(updatedCart);
  }

  // Update product quantity
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartItemsValue;
    const item = currentCart.find(i => i.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.updateCart(currentCart);
    }
  }

  // Increase quantity by 1
  increaseQuantity(productId: number): void {
    const item = this.cartItemsValue.find(i => i.product.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  // Decrease quantity by 1
  decreaseQuantity(productId: number): void {
    const item = this.cartItemsValue.find(i => i.product.id === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  // Clear cart
  clearCart(): void {
    this.updateCart([]);
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    return this.cartItemsValue.some(item => item.product.id === productId);
  }

  // Get quantity of specific product
  getProductQuantity(productId: number): number {
    const item = this.cartItemsValue.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Private helper methods
  private updateCart(cart: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.cartItemsSubject.next(cart);
  }

  private getCartFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error('Error parsing stored cart:', error);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    return [];
  }
}
