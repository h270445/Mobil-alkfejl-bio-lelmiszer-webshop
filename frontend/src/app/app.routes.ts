import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail.component').then(m => m.ProductDetailComponent)
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
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/orders/order-list.component').then(m => m.OrderListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/orders/order-detail.component').then(m => m.OrderDetailComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'checkout',
    component: HomeComponent
    // TODO: Create checkout page (Week 3 backlog)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile-settings.component').then(m => m.ProfileSettingsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
