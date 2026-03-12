import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/products/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { OrderListComponent } from './features/orders/order-list.component';
import { OrderDetailComponent } from './features/orders/order-detail.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './features/admin/products/admin-products.component';
import { AdminProductFormComponent } from './features/admin/products/admin-product-form.component';
import { AdminOrdersComponent } from './features/admin/orders/admin-orders.component';
import { AdminOrderDetailComponent } from './features/admin/orders/admin-order-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    children: [
      { path: '', component: OrderListComponent },
      { path: ':id', component: OrderDetailComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      {
        path: 'products',
        children: [
          { path: '', component: AdminProductsComponent },
          { path: 'new', component: AdminProductFormComponent },
          { path: ':id/edit', component: AdminProductFormComponent }
        ]
      },
      {
        path: 'orders',
        children: [
          { path: '', component: AdminOrdersComponent },
          { path: ':id', component: AdminOrderDetailComponent }
        ]
      }
    ]
  },
  {
    path: 'checkout',
    component: HomeComponent
    // TODO: Create checkout page (Week 3 backlog)
  },
  {
    path: 'profile',
    component: HomeComponent
    // TODO: Create profile page
  },
  {
    path: '**',
    redirectTo: ''
  }
];
