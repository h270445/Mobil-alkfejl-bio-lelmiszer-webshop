import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { User } from '../../models';

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
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentUser: User | null = null;
  cartItemCount = 0;
  isMinimalMode = false;
  isOnLoginPage = false;
  isOnRegisterPage = false;

  // Product categories
  categories = [
    { name: 'Tejtermékek', slug: 'tejtermekek' },
    { name: 'Pékáruk', slug: 'pekaruk' },
    { name: 'Zöldség-gyümölcs', slug: 'zoldseg-gyumolcs' },
    { name: 'Húskészítmények', slug: 'huskeszitmenyek' },
    { name: 'Italok', slug: 'italok' },
    { name: 'Snackek', slug: 'snackek' }
  ];

  searchQuery = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Subscribe to cart state
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      });

    // Check initial route for minimal mode
    this.checkMinimalMode(this.router.url);

    // Subscribe to route changes
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.checkMinimalMode(event.urlAfterRedirects);
      });
  }

  private checkMinimalMode(url: string): void {
    this.isMinimalMode = url.startsWith('/auth');
    this.isOnLoginPage = url.startsWith('/auth/login');
    this.isOnRegisterPage = url.startsWith('/auth/register');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get userName(): string {
    return this.currentUser
      ? `${this.currentUser.firstName} ${this.currentUser.lastName}`
      : 'Felhasználó';
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery } 
      });
    }
  }

  onLogin(): void {
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this.router.url }
    });
  }

  onRegister(): void {
    this.router.navigate(['/auth/register'], {
      queryParams: { returnUrl: this.router.url }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onProfile(): void {
    this.router.navigate(['/profile']);
  }

  onCart(): void {
    this.router.navigate(['/cart']);
  }
}
