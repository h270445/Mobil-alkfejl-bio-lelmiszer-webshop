import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/products/product-detail.component';
import { CartComponent } from './features/cart/cart.component';

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
    // TODO: Replace with lazy-loaded auth module routes
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: HomeComponent
    // TODO: Create checkout page
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
