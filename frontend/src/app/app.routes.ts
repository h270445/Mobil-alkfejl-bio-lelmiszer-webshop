import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routing.module').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products-routing.module').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart-routing.module').then(m => m.CART_ROUTES)
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders-routing.module').then(m => m.ORDERS_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-routing.module').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
