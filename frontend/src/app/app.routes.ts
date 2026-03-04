import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: HomeComponent
    // TODO: Replace with lazy-loaded products module routes
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
    component: HomeComponent
    // TODO: Create cart page
  },
  {
    path: 'orders',
    component: HomeComponent
    // TODO: Create orders page
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
