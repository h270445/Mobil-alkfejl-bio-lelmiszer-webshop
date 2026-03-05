# 📋 1. Mérföldkő - Feladatok Nyomon Követése

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Mérföldkő**: 1 (UI és Megjelenés)  
**Beadási határidő**: 2026.03.29. 23:59 CET  
**Jelenlegi hét**: 2/5  

---

## 📊 Progress Dashboard

| Status | Feladat | Progress |
|--------|---------|----------|
| ✅ | Projekt alapstruktúra | 100% |
| ✅ | Angular + Material setup | 100% |
| ✅ | Komponensek fejlesztése | 100% |
| ✅ | Routing & Mock Services | 100% |
| ✅ | Auth UI (login/register) | 100% |
| ✅ | Products oldalak (`/products`, `/products/:id`) | 100% |

---

## 🗓️ Heti Ütemterv - 1. Hét (Február 27 – Március 2)

### Feladatok

- [ ] **Angular projekt inicializálása** (~2-3 óra)
  - [x] npm install a frontend könyvtárban
  - [x] Angular Material telepítésés
  - [x] Theme konfiguráció (style.scss)

- [ ] **Alapvető komponensek létrehozása** (~4-5 óra)
  - [x] HeaderComponent (navigáció, user info, logout)
  - [x] FooterComponent (link section-ök, copyright)
  - [x] LoadingSpinnerComponent (általános spinner)
  - [x] ProductCardComponent (reusable termék kártya)

- [ ] **App routing setup** (~2-3 óra)
  - [x] Routes konfigáció
  - [x] HomeComponent hero + kategóriaks + info szekciók
  - [ ] Lazy loading placeholder route-ok

- [ ] **Mock data service** (~2-3 óra)
  - [x] ProductService (mock adatokkal)
  - [x] AuthService (mock, localStorage alapú)
  - [x] CartService (localStorage cart management)
  - [x] OrderService (order creation & history)
  - [x] Sample termék és felhasználó adatok

---

## 📝 Napi Progress

### Február 27 (nap 1)
**Terv**: Angular project setup + Material

- [x] npm install és Angular Material telepítés
- [x] Material theme Setup

**Notes**: DM oldal színvilág alapján: fehér háttér, #F6F6F7 vagy #C1EDCE box háttér, narancs accent/hover, piros error.

---

### Február 28 (nap 2)
**Terv**: Header & Footer komponensek

- [x] HeaderComponent
- [x] FooterComponent

**Notes**: Logo + Keresősáv + user menü. Kategóriák: Tejtermékek, Pékáruk, Zöldség-gyümölcs, Húskészítmények, Italok, Snackek. Footer: Kapcsolat info + social media + back-to-top gomb.

---

### Március 1 (nap 3)
**Terv**: Routing + LoadingSpinner + ProductCard

- [x] Routes konfigáció (Home, Auth, Products, Cart, Orders, Profile)
- [x] LoadingSpinnerComponent (almás SVG spinner + pulse animació)
- [x] ProductCardComponent (image, price, discount, favorite, rating)
- [x] HomeComponent (hero, kategóriák grid, info szekciók)

**Notes**: SVG-based alma spinner, Material Card alapú ProductCard, responsive design.

---

### Március 2 (nap 4)
**Terv**: ProductCard + Mock Services

- [x] ProductCardComponent (már Day 3-on elkészült)
- [x] Mock data files (18 products, 3 users)
- [x] AuthService (login, register, logout, localStorage)
- [x] ProductService (filter, sort, search, featured/sale)
- [x] CartService (localStorage cart, add/remove/update)
- [x] OrderService (order creation, history)
- [x] HeaderComponent integráció (AuthService + CartService)

**Notes**: BehaviorSubject alapú state management, RxJS Observable pattern, localStorage persistence, 300-500ms késleltetés network szimulációra. Header most reactive: auth state + cart badge dynamic. 18 magyar bio élelmiszer termék 6 kategóriában.

---

### Március 4 (nap 5)
**Terv**: Dokumentáció lezárás + responsive bugfix

- [x] SPECIFICATION.md elkészítve (2p)
- [x] DATAMODEL.md elkészítve (2p)
- [x] COMPONENTS.md elkészítve (1p)
- [x] HomeComponent kivonatolása `features/home` alá és `app.routes.ts` frissítése
- [x] Accessibility javítás: product image `title` attribútum
- [x] Responsive javítás: header cart gomb kilógás megszüntetve mobil nézetben
- [x] Breakpoint ellenőrzés (/cart: 375, 390, 768, 820, 1024) - PASS

**Notes**: Milestone 1 dokumentációs rész (5 pont) kész. Header mobil layout stabilizálva, vízszintes overflow megszüntetve.

---

### Március 5 (nap 6-7)
**Terv**: Auth flow lezárása + products lista + Cart page

**Day 6 - Auth + Products Detail (módosított)**
- [x] Login/Register oldalak teljes bekötése
- [x] Return URL visszanavigálás auth után
- [x] Remember me opció (`sessionStorage`/`localStorage`)
- [x] ErrorMessage manuális bezárás auth flow-ban
- [x] Header minimal mode auth route-okon
- [x] Header auth gomb UX javítás (ikon + mobil label logika)
- [x] `/products` oldal implementálása (lista, kategória, keresés, rendezés)
- [x] Header kategória navigáció query param alapra állítva
- [x] `/products/:id` oldal implementálása (MVP: numerikus ID check, not-found state, fix vissza `/products`, kosárba)

**Day 7 - Cart Page (előrehozva)**
- [x] `/cart` oldal teljes implementációja CartService integrációval
- [x] Szállítási költség kalkuláció (500 ft < 3500 ft, innych ingyenes)
- [x] Quantidade kezelés (+/- gombok, limit: ≥1, ≤stock)
- [x] Teljes kosár törlés (warning confirm dialog)
- [x] Out-of-stock warning banner + checkout kikapcsolás
- [x] Rich empty state (kosár ikon + ajánlott termékek grid)
- [x] LoadingSpinner placeholders AWS deployment-hez
- [x] MatSnackBar feedback (item add/remove/delete)
- [x] Mobile-first responsive (card layout mobile, táblázat 768px+)
- [x] Material components: MatButtonModule, MatIconModule, MatSnackBarModule
- [x] Auth check redirect /auth/login?returnUrl=/checkout
- [x] /checkout route placeholder

**Notes**: A 2. heti összes major feature teljesítve (auth + products + cart). Szállítási logika implementálva. Ajánlott termékek getFeaturedProducts()-ból. Angular.json budget emelt anyComponentStyle-hoz (6kb warning, 10kb error az összetett komponensekhez).

---

## ❌ Blokkolók

| Probléma | Megoldás | Status |
|----------|----------|--------|
| TBD | | |

---

## ✅ Heti Célok

- [x] Összes komponens skeleton létrehozva
- [x] Mock data service működik
- [x] Routing működik az összes oldalra
- [x] Basic styling (Material) alkalmazva
- [x] Git commits (naponta minimum 1)

---

## 🎯 Git Commits Target

```
[FEAT] core: Angular Material setup + headerComponent
[FEAT] shared: ProductCardComponent és helper components
[FEAT] auth: Mock auth service localStorage integrálása
[FEAT] app: Routing konfiguráció az összes modulhoz
[FEAT] products: Mock product service adatokkal
```

---

## 🔄 Következő Lépés

**Elvégzett (Week 2 core):**
- [x] LoginComponent és RegisterComponent oldalak implementálása (`/auth/login`, `/auth/register`)
- [x] Products list oldal implementálása (`/products`) ProductCard listával
- [x] Product detail oldal implementálása (`/products/:id`)
- [x] Cart page implementálása valós CartService integrációval

**Követkseñő lépés (Week 2 végéig):**
- [ ] Responsive smoke teszt az összes route-on (`/`, `/products`, `/auth/login`, `/auth/register`, `/cart`)
- [ ] Error handling teljes flow-ban (network error, validation error, out-of-stock, unauthorized)

**2. Hét Célja (március 3-9):**
- [x] Auth Module UI komplett (login, register)
- [x] Products lista és detail oldalak
- [ ] Cart page (checkout flow kezdet)
- [x] ProductCard addToCart integráció (Home + Products oldalak)
- [ ] ErrorMessage komponens bekötése az auth/cart/product flow-kba

---

**Utolsó frissítés**: 2026.03.05 (nap 7-nap végéhez közeledve, cart page complete)
