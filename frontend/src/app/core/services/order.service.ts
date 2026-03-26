import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order, OrderItem, CartItem, Address, PaymentMethod } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly STORAGE_KEY = 'biomarket_orders';
  private orders: Order[] = [];

  private ordersSubject!: BehaviorSubject<Order[]>;
  public orders$!: Observable<Order[]>;

  constructor() {
    this.loadOrdersFromStorage();
    this.ordersSubject = new BehaviorSubject<Order[]>(this.orders);
    this.orders$ = this.ordersSubject.asObservable();
  }

  // Create new order from cart items
  createOrder(
    userId: number,
    cartItems: CartItem[],
    shippingAddress: Address,
    notificationAddress?: Address,
    paymentMethod: PaymentMethod = 'card'
  ): Observable<Order> {
    return new Observable(observer => {
      setTimeout(() => {
        // Convert CartItems to OrderItems
        const orderItems: OrderItem[] = cartItems.map((item, index) => ({
          id: index + 1,
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          priceAtPurchase: item.product.price
        }));

        // Calculate total
        const totalPrice = orderItems.reduce(
          (sum, item) => sum + (item.priceAtPurchase * item.quantity),
          0
        );

        // Generate new order ID
        const newOrderId = this.orders.length > 0
          ? Math.max(...this.orders.map(o => o.id)) + 1
          : 1;

        // Create order
        const newOrder: Order = {
          id: newOrderId,
          userId,
          items: orderItems,
          totalPrice,
          paymentMethod,
          status: 'pending',
          shippingAddress,
          notificationAddress,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Add to orders array
        this.orders.push(newOrder);
        this.saveOrdersToStorage();
        this.ordersSubject.next([...this.orders]);

        observer.next(newOrder);
        observer.complete();
      }, 500);
    });
  }

  // Get all orders for a user
  getOrderHistory(userId: number): Observable<Order[]> {
    const userOrders = this.orders
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return of(userOrders).pipe(delay(300));
  }

  // Get order by ID
  getOrderById(orderId: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId);
    return of(order).pipe(delay(300));
  }

  // Get order by ID for specific user (security check)
  getUserOrderById(orderId: number, userId: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === orderId && o.userId === userId);
    return of(order).pipe(delay(300));
  }

  // Cancel order
  cancelOrder(orderId: number, userId: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === orderId && o.userId === userId);
        
        if (order && order.status === 'pending') {
          order.status = 'cancelled';
          order.updatedAt = new Date();
          this.saveOrdersToStorage();
          this.ordersSubject.next([...this.orders]);
          observer.next(true);
        } else {
          observer.next(false);
        }
        
        observer.complete();
      }, 500);
    });
  }

  // Update order status (admin function)
  updateOrderStatus(orderId: number, status: Order['status']): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const order = this.orders.find(o => o.id === orderId);
        
        if (order) {
          order.status = status;
          order.updatedAt = new Date();
          this.saveOrdersToStorage();
          this.ordersSubject.next([...this.orders]);
          observer.next(true);
        } else {
          observer.next(false);
        }
        
        observer.complete();
      }, 500);
    });
  }

  // Get all orders (admin function)
  getAllOrders(): Observable<Order[]> {
    const allOrders = [...this.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return of(allOrders).pipe(delay(300));
  }

  // Get orders by status
  getOrdersByStatus(status: Order['status'], userId?: number): Observable<Order[]> {
    let filtered = this.orders.filter(order => order.status === status);
    
    if (userId !== undefined) {
      filtered = filtered.filter(order => order.userId === userId);
    }
    
    return of(filtered).pipe(delay(300));
  }

  // Reset orders and products mock data (admin function)
  resetToMockData(): void {
    this.orders = [];
    localStorage.removeItem(this.STORAGE_KEY);
    this.ordersSubject.next([]);
  }

  // Private helper methods
  private saveOrdersToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.orders));
  }

  private loadOrdersFromStorage(): void {
    const storedOrders = localStorage.getItem(this.STORAGE_KEY);
    if (storedOrders) {
      try {
        this.orders = JSON.parse(storedOrders);
      } catch (error) {
        console.error('Error parsing stored orders:', error);
        localStorage.removeItem(this.STORAGE_KEY);
        this.orders = [];
      }
    }
  }
}
