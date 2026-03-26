// User model
export interface User {
  id: number;
  email: string;
  password?: string; // Only for mock data, not exposed to frontend
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: Address;
  notificationAddress?: Address;
  createdAt: Date;
}

// Address model
export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  zipCode: string;
  country: string;
}

// Product model
export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number; // For discounts
  description: string;
  imageUrl: string;
  rating: number; // 0-5 stars
  reviews: number; // Number of reviews
  inStock: boolean;
  stockQuantity: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Order model
export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  notificationAddress?: Address;
  createdAt: Date;
  updatedAt?: Date;
}

export type PaymentMethod = 'paypal' | 'bank-transfer' | 'cod' | 'card';

// OrderItem model
export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

// Cart item (frontend only)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Register request
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone?: string;
}

// Auth response
export interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

// Comment/Review model
export interface Comment {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  timestamp: Date;
}
