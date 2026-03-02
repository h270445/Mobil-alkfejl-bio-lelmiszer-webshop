import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Mock authentication state (later will come from AuthService)
  isLoggedIn = false;
  userName = 'Felhasználó';
  cartItemCount = 0;

  // Product categories
  categories = [
    { name: 'Tejtermékek', route: '/products/tejtermekek' },
    { name: 'Pékáruk', route: '/products/pekaruk' },
    { name: 'Zöldség-gyümölcs', route: '/products/zoldseg-gyumolcs' },
    { name: 'Húskészítmények', route: '/products/huskeszitmenyek' },
    { name: 'Italok', route: '/products/italok' },
    { name: 'Snackek', route: '/products/snackek' }
  ];

  searchQuery = '';

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search for:', this.searchQuery);
      // TODO: Navigate to search results page
    }
  }

  onLogin(): void {
    console.log('Navigate to login page');
    // TODO: Navigate to /auth/login
  }

  onRegister(): void {
    console.log('Navigate to register page');
    // TODO: Navigate to /auth/register
  }

  onLogout(): void {
    console.log('Logout user');
    this.isLoggedIn = false;
    // TODO: Call AuthService.logout()
  }

  onProfile(): void {
    console.log('Navigate to profile page');
    // TODO: Navigate to /profile
  }

  onCart(): void {
    console.log('Navigate to cart page');
    // TODO: Navigate to /cart
  }
}
