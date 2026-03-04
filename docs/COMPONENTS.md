# COMPONENTS.md - BioMarket Komponens Architektúra

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Keretrendszer**: Angular 17 (Standalone Components)  
**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026.03.04

---

## 📦 Komponens Hierarchia Áttekintés

Az alkalmazás **Angular 17 Standalone Components** architektúrát használ. **6 fő komponens** beágyazott hierarchiával:

| # | Komponens | Típus | Célja | Gyermekei | Status |
|----|-----------|-------|-------|-----------|--------|
| 1 | **AppComponent** | Root | Alkalmazás gyökerének layout (Header, RouterOutlet, Footer) | Header, RouterOutlet, Footer | ✅ |
| 2 | **HeaderComponent** | Layout | Navigáció, keresés, user menü, kosár badge | (beágyazott) | ✅ |
| 3 | **FooterComponent** | Layout | Lábléc: linkek, social, back-to-top | (beágyazott) | ✅ |
| 4 | **HomeComponent** | Page | Kezdőoldal: hero, kategóriák, info szekciók | - | ✅ |
| 5 | **ProductCardComponent** | Card/Reusable | Termék kijelző kártya (image, price, actions) | - | ✅ |
| 6 | **LoadingSpinnerComponent** | Spinner | Loading state (almás SVG) | - | ✅ |
| 7 | **ErrorMessageComponent** | Util | Hibaüzenetek, infoüzenetek megjelenítése | - | ✅ |

---

## 🏗️ Könyvtárstruktúra (Hierarchikus - Feature Modules)

**Milestone 1-3** alatt a követett struktúra:

```
frontend/src/app/
│
├── core/                               # Globális szintű logika
│   └── services/
│       ├── auth.service.ts            # Autentikáció
│       ├── product.service.ts         # Termékek
│       ├── cart.service.ts            # Kosár kezelés
│       └── order.service.ts           # Rendelések
│
├── shared/                             # Megosztott komponensek & modellk
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.component.ts
│   │   │   ├── header.component.html
│   │   │   └── header.component.scss
│   │   ├── footer/
│   │   │   ├── footer.component.ts
│   │   │   ├── footer.component.html
│   │   │   └── footer.component.scss
│   │   ├── loading-spinner/
│   │   │   ├── loading-spinner.component.ts
│   │   │   ├── loading-spinner.component.html
│   │   │   └── loading-spinner.component.scss
│   │   ├── product-card/
│   │   │   ├── product-card.component.ts
│   │   │   ├── product-card.component.html
│   │   │   └── product-card.component.scss
│   │   └── error-message/
│   │       ├── error-message.component.ts
│   │       ├── error-message.component.html
│   │       └── error-message.component.scss
│   ├── models/
│   │   └── index.ts                    # TypeScript interfaces
│   └── mock-data/
│       ├── products.mock.ts
│       ├── users.mock.ts
│       └── index.ts
│
├── features/                            # Feature modules (feltöltődik Week 2-3 alatt)
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.scss
│   ├── auth/                           # (Milestone 1 vége)
│   │   ├── login/
│   │   ├── register/
│   │   └── auth-routing.module.ts      # (Milestone 2)
│   ├── products/                       # (Milestone 2)
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   └── products-routing.module.ts
│   ├── cart/                           # (Milestone 2)
│   │   ├── cart-page/
│   │   └── cart-routing.module.ts
│   ├── orders/                         # (Milestone 2-3)
│   │   ├── order-list/
│   │   ├── order-detail/
│   │   └── orders-routing.module.ts
│   └── admin/                          # (Milestone 2-3)
│       ├── dashboard/
│       ├── products-management/
│       └── admin-routing.module.ts
│
├── app.component.ts                    # Root komponens
├── app.routes.ts                       # Routing konfiguráció
├── app.config.ts                       # Angular 17 config
└── styles.scss                         # Global stílusok

```

---

## 📊 Komponens Hierarchia (ASCII Fa)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AppComponent (Root)                          │
│                                                                     │
│  Layout skeleton: <header> + <router-outlet> + <footer>            │
└────────────────────────────────────────────────────────────────────┬┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
    ┌─────────────┐        ┌──────────────┐        ┌──────────────┐
    │  HEADER     │        │ ROUTER-      │        │   FOOTER     │
    │ COMPONENT   │        │ OUTLET       │        │ COMPONENT    │
    │             │        │              │        │              │
    │ • Logo      │        │ Dinamikus    │        │ • Linkek     │
    │ • Keresés   │        │ oldal        │        │ • Social     │
    │ • Kategóriák│        │ tartalom     │        │ • Back-top   │
    │ • User menu │        │              │        │              │
    │ • Kosár     │        │ (Home,       │        │              │
    │   badge     │        │  Products,   │        │              │
    └─────────────┘        │  Cart, etc.) │        └──────────────┘
                           │              │
                           │   ┌──────────┼──────────────┐
                           │   │          │              │
                           │   ▼          ▼              ▼
                           │ ┌─────────┐ ┌──────────┐ ┌─────────┐
                           │ │  HOME   │ │PRODUCTS  │ │  CART   │
                           │ │COMPONENT│ │PAGE (W2) │ │PAGE (W2)│
                           │ └────┬────┘ └──────────┘ └─────────┘
                           │      │
                      ┌────┴────┬─┴──────────┐
                      │         │            │
                      ▼         ▼            ▼
                ┌──────────┐ ┌────────┐ ┌──────────┐
                │ PRODUCT  │ │LOADING │ │  ERROR   │
                │  CARD    │ │SPINNER │ │ MESSAGE  │
                │COMPONENT │ │COMPONENT│ │COMPONENT│
                │          │ │        │ │          │
                │ • Image  │ │ • SVG  │ │ • Toast  │
                │ • Price  │ │ • Pulse│ │ • Alert  │
                │ • Actions│ │        │ │ • Inform │
                └──────────┘ └────────┘ └──────────┘
```

---

## 🔍 Komponensek Részletes Leírása

### 1. **AppComponent** (Root)
**Fájl**: `app.component.ts`  
**Scope**: Teljes alkalmazás layout

**Felelőssége**:
- Root layout biztosítása
- Header, Footer, RouterOutlet beágyazása
- Global stílusok alkalmazása

**Gyermekei**:
- HeaderComponent
- FooterComponent
- RouterOutlet (dinamikus tartalom)

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <main><router-outlet></router-outlet></main>
    <app-footer></app-footer>
  `
})
export class AppComponent { }
```

---

### 2. **HeaderComponent**
**Fájl**: `shared/components/header/header.component.ts`  
**Scope**: Globális navigáció

**Felelőssége**:
- Logo és branding megjelenítése
- Keresősáv kezelése
- Kategória navegáció
- User menü (login/register vagy profile/logout)
- Kosár badge (CartService integrációval)
- Search router-be irányítás

**Inputs**: -  
**Outputs**: -  
**Injections**: AuthService, CartService, Router

**Gyermekei**: -

**Standalone**: ✅ Igen

**Stílus**: SCSS (Material Design token-ekkel)

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, ...],
  template: `
    <mat-toolbar color="primary">
      <span>BioMarket</span>
      <input matInput placeholder="Keresés...">
      <span [matBadge]="cartItemCount">🛒</span>
      <button [matMenuTriggerFor]="userMenu">
        {{ currentUser?.firstName || 'Login' }}
      </button>
    </mat-toolbar>
  `
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  cartItemCount = 0;
  
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.authService.currentUser$.subscribe(() => { /*...*/ });
    this.cartService.cartItems$.subscribe(() => { /*...*/ });
  }
}
```

---

### 3. **FooterComponent**
**Fájl**: `shared/components/footer/footer.component.ts`  
**Scope**: Globális lábléc

**Felelőssége**:
- Linkek (Rólunk, ÁSZF, Adatvédelem)
- Szociális média linkek
- Back-to-top gomb
- Copyright

**Inputs**: -  
**Outputs**: -  
**Injections**: ViewportScroller

**Gyermekei**: -

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <section class="footer-links">
        <a href="#">Rólunk</a>
        <a href="#">ÁSZF</a>
        <a href="#">Adatvédelem</a>
      </section>
      <section class="footer-social">
        <a href="https://facebook.com/biomarket" target="_blank">f</a>
        <a href="https://instagram.com/biomarket" target="_blank">📷</a>
      </section>
      <button (click)="scrollToTop()">↑ Vissza az tetejére</button>
    </footer>
  `
})
export class FooterComponent { }
```

---

### 4. **HomeComponent**
**Fájl**: `features/home/home.component.ts`  
**Scope**: Kezdőoldal tartalom

**Felelőssége**:
- Hero section megjelenítése
- Kategóriák grid kijelzése
- Info szekciók (100% Bio, Gyors Szállítás, Minőség)
- Featured termékek csempéi (ProductCard komponensek iterálásával)

**Inputs**: -  
**Outputs**: -  
**Injections**: ProductService, Router

**Gyermekei**:
- ProductCardComponent (N × re iterálva featured termékekre)
- LoadingSpinnerComponent (loading állapotban)

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LoadingSpinnerComponent],
  template: `
    <section class="hero">
      <h1>Üdvözlünk a BioMarket-ben!</h1>
    </section>
    
    <section class="categories">
      <h2>Kategóriák</h2>
      <div class="grid">
        <a *ngFor="let cat of categories" [routerLink]="['/products']">
          {{ cat.name }}
        </a>
      </div>
    </section>

    <section class="featured">
      <h2>Kiemelt termékek</h2>
      <div *ngIf="loading"><app-loading-spinner></app-loading-spinner></div>
      <div class="grid" *ngIf="!loading">
        <app-product-card 
          *ngFor="let product of featuredProducts"
          [product]="product"
          (addToCart)="onAddToCart($event)"
          (viewDetails)="onViewDetails($event)">
        </app-product-card>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = false;
  
  constructor(private productService: ProductService) { }
  
  ngOnInit() {
    this.loading = true;
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });
  }
  
  onAddToCart(product: Product) {
    // CartService integrációra vár
  }
}
```

---

### 5. **ProductCardComponent**
**Fájl**: `shared/components/product-card/product-card.component.ts`  
**Scope**: Termék kijelzés

**Felelőssége**:
- Termék információ (kép, név, ár, diszkont) megjelenítése
- Értékelés csillagok
- Készletállapot
- Kosárba gomb (emit: addToCart)
- Részletek gomb (emit: viewDetails)
- Kedvencek gomb (toggle)

**Inputs**:
- `@Input() product: Product`

**Outputs**:
- `@Output() addToCart = new EventEmitter<Product>()`
- `@Output() viewDetails = new EventEmitter<Product>()`

**Injections**: CartService (opcionálisan)

**Gyermekei**: -

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card>
      <img [src]="product.imageUrl">
      <mat-card-content>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description | slice:0:100 }}...</p>
        <div class="price">
          <span *ngIf="product.originalPrice" class="original">
            {{ product.originalPrice }} Ft
          </span>
          <span class="current">{{ product.price }} Ft</span>
          <badge *ngIf="discount">-{{ discount }}%</badge>
        </div>
        <div class="rating">
          <span *ngFor="let i of [1,2,3,4,5]" [class.filled]="i <= product.rating">★</span>
          ({{ product.reviews }} review)
        </div>
        <span *ngIf="!product.inStock" class="out-of-stock">Nincs készleten</span>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="onAddToCart()">Kosárba</button>
        <button (click)="onViewDetails()">Részletek</button>
        <button (click)="toggleFavorite()">♥</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<Product>();
  
  get discount(): number {
    return this.product.originalPrice
      ? Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100)
      : 0;
  }
  
  onAddToCart() {
    this.addToCart.emit(this.product);
  }
  
  onViewDetails() {
    this.viewDetails.emit(this.product);
  }
}
```

---

### 6. **LoadingSpinnerComponent**
**Fájl**: `shared/components/loading-spinner/loading-spinner.component.ts`  
**Scope**: Loading state UI

**Felelőssége**:
- Almás SVG spinner animáció megjelenítése
- Pulsing "Betöltés..." text
- Központosított layout

**Inputs**: -  
**Outputs**: -  
**Injections**: -

**Gyermekei**: -

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-container">
      <svg class="apple-spinner">
        <!-- SVG apple animációval -->
      </svg>
      <p class="loading-text">Betöltés...</p>
    </div>
  `,
  styles: [`
    .apple-spinner {
      animation: rotate 2.5s linear infinite;
    }
    @keyframes rotate {
      to { transform: rotate(360deg); }
    }
    .loading-text {
      animation: pulse 1s ease-in-out infinite;
    }
  `]
})
export class LoadingSpinnerComponent { }
```

---

### 7. **ErrorMessageComponent** ⭐ (Új)
**Fájl**: `shared/components/error-message/error-message.component.ts`  
**Scope**: Hibaüzenetek, infoüzenetek

**Felelőssége**:
- Hiba/siker/infoüzenetek megjelenítése
- Toast-szerű megjelenés és auto-close
- Berbapható típusok (error, success, info, warning)
- Dismiss gomb

**Inputs**:
- `@Input() message: string`
- `@Input() type: 'error' | 'success' | 'info' | 'warning' = 'success'`
- `@Input() duration: number = 5000` (ms)

**Outputs**:
- `@Output() closed = new EventEmitter<void>()`

**Injections**: -

**Gyermekei**: -

**Standalone**: ✅ Igen

```typescript
// Pszeudo-kód
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  template: `
    <mat-card [class]="'alert alert-' + type">
      <mat-card-content>
        <span class="icon">{{ getIcon(type) }}</span>
        <span class="message">{{ message }}</span>
        <button mat-icon-button (click)="close()">✕</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .alert {
      background: var(--color-{{type}});
      color: white;
      border-radius: 4px;
      margin: 16px;
    }
    .alert-error { background: #f44336; }
    .alert-success { background: #4caf50; }
    .alert-info { background: #2196F3; }
    .alert-warning { background: #ff9800; }
  `]
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'success';
  @Input() duration: number = 5000;
  @Output() closed = new EventEmitter<void>();
  
  private timer: any;
  
  ngOnInit() {
    this.timer = setTimeout(() => this.close(), this.duration);
  }
  
  close() {
    clearTimeout(this.timer);
    this.closed.emit();
  }
  
  getIcon(type: string): string {
    const icons: Record<string, string> = {
      error: '❌',
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️'
    };
    return icons[type] || '';
  }
}
```

---

## 📊 Komponens Koordináció

### Parent → Child (property binding)
```
AppComponent
  └─ HeaderComponent (user menu, cart badge)
  └─ FooterComponent
  └─ HomeComponent
      └─ ProductCardComponent (product: Product)
      └─ LoadingSpinnerComponent
```

### Child → Parent (event emitting)
```
ProductCardComponent
  └─ (addToCart) event → HomeComponent
  └─ (viewDetails) event → HomeComponent

ErrorMessageComponent
  └─ (closed) event → Parent
```

### Service Injection
```
HeaderComponent → AuthService, CartService
HomeComponent → ProductService
ProductCardComponent → (emits events only)
ErrorMessageComponent → (self-contained)
```

---

## 🎯 Komponensek Aktiválása (Milestone ütemezés)

| Komponens | Status | Milestone |
|-----------|--------|-----------|
| AppComponent | ✅ Ready | 1 (Demo kész) |
| HeaderComponent | ✅ Ready | 1 (Service integráció kész) |
| FooterComponent | ✅ Ready | 1 |
| HomeComponent | ✅ Ready | 1 (Feature folder kiváló) |
| ProductCardComponent | ✅ Ready | 1 |
| LoadingSpinnerComponent | ✅ Ready | 1 |
| ErrorMessageComponent | ✅ Ready | 1 (Utility, reusable) |
| **Feature Page Komponensek** | 🟡 Skeleton | 2-3 |
| LoginComponent | 🔄 Planning | 2 |
| RegisterComponent | 🔄 Planning | 2 |
| ProductListComponent | 🔄 Planning | 2 |
| ProductDetailComponent | 🔄 Planning | 2 |
| CartPageComponent | 🔄 Planning | 2 |
| OrdersListComponent | 🔄 Planning | 3 |
| AdminDashboardComponent | 🔄 Planning | 3 |

---

## ✅ Komponens Architektúra Validáció

- ✅ **Minimum 6 komponens**: 7 kész (Header, Footer, Home, ProductCard, Spinner, ErrorMessage + App root)
- ✅ **Beágyazott hierarchia**: AppComponent → shared komps + features
- ✅ **Standalone Components**: Összes komponens standalone
- ✅ **Reusability**: ProductCard, ErrorMessage, Spinner többször felhasználható
- ✅ **Separation of Concerns**: Shared vs. Features szeparáció
- ✅ **Moduláris szerkezet**: Feature folder struktúra (B opció)

---

**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026.03.04  
**Készítette**: BioMarket Development Team
