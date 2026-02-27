// User model
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
}

// Product model
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isBioCertified: boolean;
  category: string;
  createdAt: Date;
}

// Order model
export interface Order {
  id: number;
  user: User;
  totalPrice: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  createdAt: Date;
  items: OrderItem[];
}

// OrderItem model
export interface OrderItem {
  id: number;
  product: Product;
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
}

// Register request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Auth response
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}
