import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminProductFormComponent } from './products/admin-product-form.component';
import { AdminOrdersComponent } from './orders/admin-orders.component';
import { AdminOrderDetailComponent } from './orders/admin-order-detail.component';
import { AdminUsersComponent } from './users/admin-users.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
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
  },
  {
    path: 'users',
    component: AdminUsersComponent
  }
];
