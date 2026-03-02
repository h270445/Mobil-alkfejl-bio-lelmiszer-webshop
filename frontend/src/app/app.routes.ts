import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Home Component
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <section class="home-section">
      <div class="hero">
        <h1>Üdvözlünk a BioMarket-ben!</h1>
        <p>Bio élelmiszerek és természetes termékek a legjobb minőségben.</p>
        <button mat-raised-button color="primary" routerLink="/products">
          Termékek böngészése
        </button>
      </div>

      <div class="categories-preview">
        <h2>Kategóriák</h2>
        <div class="category-grid">
          <a *ngFor="let cat of categories" class="category-link" [routerLink]="['/products']" [queryParams]="{ category: cat.slug }">
            {{ cat.name }}
          </a>
        </div>
      </div>

      <div class="info-section">
        <h2>Miért válaszd a BioMarketot?</h2>
        <div class="info-grid">
          <div class="info-card">
            <mat-icon>eco</mat-icon>
            <h3>100% Bio</h3>
            <p>Csak minősített bio termékek</p>
          </div>
          <div class="info-card">
            <mat-icon>local_shipping</mat-icon>
            <h3>Gyors Szállítás</h3>
            <p>1-2 nap alatt a pultodra</p>
          </div>
          <div class="info-card">
            <mat-icon>verified</mat-icon>
            <h3>Minőség Garantált</h3>
            <p>Teljes visszavásárlási garancia</p>
          </div>
        </div>
      </div>
    </section>

    <style>
      :host {
        --color-primary: #4caf50;
        --color-surface: #F6F6F7;
        --color-surface-bio: #C1EDCE;
        --color-text-primary: rgba(0, 0, 0, 0.87);
        --color-text-secondary: rgba(0, 0, 0, 0.6);
      }

      .home-section {
        padding: 40px 20px;
      }

      .hero {
        text-align: center;
        margin-bottom: 60px;
        padding: 40px;
        background: linear-gradient(135deg, var(--color-surface-bio) 0%, var(--color-surface) 100%);
        border-radius: 12px;
      }

      .hero h1 {
        font-size: 36px;
        margin-bottom: 16px;
        color: var(--color-primary);
      }

      .hero p {
        font-size: 18px;
        color: var(--color-text-secondary);
        margin-bottom: 24px;
      }

      .categories-preview {
        margin-bottom: 60px;
      }

      .categories-preview h2,
      .info-section h2 {
        text-align: center;
        margin-bottom: 32px;
        color: var(--color-primary);
      }

      .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }

      .category-link {
        padding: 24px 16px;
        background-color: var(--color-surface);
        border-radius: 8px;
        text-decoration: none;
        text-align: center;
        font-weight: 500;
        color: var(--color-primary);
        transition: all 0.3s ease;
      }

      .category-link:hover {
        background-color: var(--color-surface-bio);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
      }

      .info-card {
        padding: 24px;
        background-color: var(--color-surface);
        border-radius: 8px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .info-card:hover {
        background-color: var(--color-surface-bio);
        transform: translateY(-4px);
      }

      .info-card mat-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        margin-bottom: 16px;
        color: var(--color-primary);
      }

      .info-card h3 {
        margin: 0 0 8px 0;
        color: var(--color-text-primary);
      }

      .info-card p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 14px;
      }

      @media (max-width: 768px) {
        .home-section {
          padding: 20px;
        }

        .hero h1 {
          font-size: 24px;
        }

        .hero p {
          font-size: 14px;
        }
      }
    </style>
  `
})
class HomeComponent {
  categories = [
    { name: 'Tejtermékek', slug: 'tejtermekek' },
    { name: 'Pékáruk', slug: 'pekaruk' },
    { name: 'Zöldség-gyümölcs', slug: 'zoldseg-gyumolcs' },
    { name: 'Húskészítmények', slug: 'huskeszitmenyek' },
    { name: 'Italok', slug: 'italok' },
    { name: 'Snackek', slug: 'snackek' }
  ];
}

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
      { path: 'login', component: HomeComponent },
      { path: 'register', component: HomeComponent }
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
