# 🎯 1. Mérföldkő: UI és Megjelenés - Részletes Ütemterv

**Beadási határidő: 2026.03.29. 23:59**

---

## 📋 Projektstruktura (Angular)

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── product.service.ts
│   │   │   └── guards/
│   │   │       └── auth.guard.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── product-card/
│   │   │   │   └── loading-spinner/
│   │   │   └── models/
│   │   │       ├── user.ts
│   │   │       ├── product.ts
│   │   │       └── order.ts
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── auth-routing.module.ts
│   │   ├── products/
│   │   │   ├── product-list/
│   │   │   ├── product-detail/
│   │   │   └── products-routing.module.ts
│   │   ├── cart/
│   │   │   ├── cart-page/
│   │   │   ├── cart.service.ts
│   │   │   └── cart-routing.module.ts
│   │   ├── orders/
│   │   │   ├── order-list/
│   │   │   ├── order-detail/
│   │   │   └── orders-routing.module.ts
│   │   ├── admin/
│   │   │   ├── product-management/
│   │   │   ├── admin-dashboard/
│   │   │   └── admin-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── styles.scss
│   ├── main.ts
│   └── index.html
├── angular.json
├── tsconfig.json
└── package.json
```

---

## 📅 Heti Ütemterv

### **1. Hét (Február 27 – Március 2)**

#### Feladatok

- [x] Projekt alapstruktúra létrehozása
- [x] Angular projekt inicializálása
- [x] Angular Material telepítése és konfigurálása
- [x] Alapvető komponensek szkeletonjának létrehozása
- [x] App routing konfiguráció

#### Specifikus lépések

1. **Project Setup** (1-2 óra)

   ```bash
   cd frontend
   npm install
   npm install @angular/material
   npm install @angular/cdk
   ```

2. **Material Setup** (1-2 óra)
   - Material theme választása
   - Global styles.scss konfigurálása
   - Material ikonok és tipográfia

3. **Komponensek** (3-4 óra)
   - `HeaderComponent` (navigáció, user info, logout)
   - `FooterComponent` (statikus footer)
   - `LoadingSpinnerComponent` (általános spinner)
   - `ProductCardComponent` (termék lista item)

4. **Routing** (2-3 óra)
   - AppRoutes konfiguráció
   - Modul-szintű routing (lazy loading)
   - Redirect logika

---

### **2. Hét (Március 3 – Március 9)**

#### Feladatok

- [x] Auth modul UI (login, register)
- [x] Product list és detail oldalak
- [x] Shared models alapjainak kidolgozása
- [x] Mock data service

#### Specifikus lépések

1. **Auth Module** (6-8 óra)
   - `LoginComponent` (form, validálás)
   - `RegisterComponent` (form, validálás)
   - Basic styling + responsive layout
   - Error handling UI

2. **Products Module** (8-10 óra)
   - `ProductListComponent` 
     - Grid/list view toggle
     - Szűrés kategória szerint (UI only)
     - Search input
   - `ProductDetailComponent`
     - Termék képe, leírása
     - Ár, készlet info
     - "Kosárba" gomb
     - Termék specifikációk

3. **Mock Data** (2-3 óra)
   - `ProductService` mock adatokkal
   - `AuthService` mock (localStorage alapú)
   - Mock termék és felhasználó adatok

#### Részletes napi bontás (2. hét)

**Nap 5 (03.03) - Auth UI alapok**
- Login/Register oldalak létrehozása
- Form validációk és hibakezelés v1
- Routing bekötés (`/auth/login`, `/auth/register`)

**Nap 6 (03.04) - Auth UX + Product list**
- Return URL visszanavigálás auth után
- Error message manuális zárás
- Remember me (`sessionStorage`/`localStorage` logika)
- Header minimal mód auth route-okon
- `/products` listaoldal: keresés + kategória + rendezés + kosárba rakás
- `/products/:id` MVP előrehozva: numerikus ID check + not-found + fix vissza `/products`

**Nap 7 (03.05) - Product detail**
- `/products/:id` oldal (kép, ár, készlet, leírás)
- Részletek gomb és route param kezelés
- "Kosárba" gomb bekötés + not-found állapot
   - Megjegyzés: előrehozva elkészült 03.04-én, a nap pufferként használható cart kezdésre.

**Nap 8 (03.06) - Cart integráció**
- `CartPageComponent` létrehozása
- Mennyiség módosítás, törlés, összegzés
- Empty state + alap responsive

**Nap 9 (03.07-03.09 puffer)**
- Cross-route smoke tesztek (/, /products, /products/:id, /cart, /auth/*)
- UI konzisztencia javítások
- Heti zárás és tracker frissítés

---

### **3. Hét (Március 10 – Március 16)**

#### Feladatok

- [x] Cart modul
- [x] Checkout/Order form
- [x] Responsive design finomítása
- [ ] User Orders lista

#### Specifikus lépések

1. **Cart Module** (6-8 óra)
   - `CartPageComponent`
   - Cart items lista
   - Termék eltávolítás, mennyiség módosítás
   - Kosár összesen kalkuláció
   - "Megrendeléshez" gomb
   - `CartService` (localStorage alapú mock)

2. **Orders Module** (6-8 óra)
   - `OrderListComponent` (user rendelések listája)
   - `OrderDetailComponent` (rendelés részletei)
   - Mock order data

3. **Checkout** (4-5 óra)
   - Szállítási cím form
   - Fizetési metódus (mock)
   - Order összefoglaló
   - Sikeres rendelés feedback

4. **Responsive Design** (3-4 óra)
   - Mobile breakpoints tesztelése
   - Layout finomítások
   - Touch-friendly felületek

#### Részletes napi bontás (3. hét)

**Nap 10-11 - Cart + Checkout alapok**
- Kosár oldal finomítása, validációs edge case-ek
- Checkout form (szállítási adatok, mock fizetés)

**Nap 12-13 - Orders**
- `OrderListComponent` + `OrderDetailComponent`
- OrderService integráció és státusz megjelenítés

**Nap 14-16 - Responsive és stabilizálás**
- Mobile/tablet breakpoint javítások
- Hibakezelések, loading state-ek egységesítése
- Heti regressziós ellenőrzés

---

### **4. Hét (Március 17 – Március 23)**

#### Feladatok

- [x] Admin modul UI
- [x] Product management (CRUD UI)
- [x] Authentication UI integrálása
- [x] Route Guards előkészítése

#### Specifikus lépések

1. **Admin Module** (8-10 óra)
   - [x] `AdminDashboardComponent` (overview skeleton)
   - [x] `AdminProductsComponent` (CRUD lista + mobile FAB)
   - [x] AdminOrdersComponent skeleton
   - [x] Admin User Management skeleton
   - [x] Táblázat/lista megjelenítés (mat-table)
   - [x] Mobile responsivness (oszlopok rejt\u00e9se, FAB pattern)

2. **Route Guards UI** (2-3 óra)
   - [x] Login redirect ha nincs auth
   - [x] Admin-only route indikálása
   - [x] Role-based navigation (admin menü)
   - [x] Header minimal mód admin route-okon

3. **UI Finomítások** (4-5 óra)
   - [x] Footer minimal mode admin oldalak-ra
   - [x] Back-to-top scroll context fix
   - [x] Search field UX egységesítés (header + admin)
   - [x] Loading states és transitions

#### Napi Bontás (4. Hét)

**Nap 17-18 (03.17-03.18)**
- [x] Admin routing setup
- [x] Admin Dashboard skeleton
- [x] Git dev branch strategy

**Nap 19-20 (03.19-03.20)**
- [x] Admin Products CRUD lista (mat-table)
- [x] Keresés/szűrés oldal

**Nap 21 (03.21)**
- [x] Mobile responsivness (FAB, oszlopok)
- [x] Footer minimal mode implementation

**Nap 22-24 (03.22-03.24)**
- [x] Header admin menu UX
- [x] Back-to-top fix
- [x] Search field UX alignment
- [x] Responsive smoke testing admin route-okon
- [x] Bundle warning azonosítva: **85 kB overage**

---

### **5. Hét (Március 24 – Március 29) - Bundle Optimization & Final Polish**

#### Feladatok (PRIORITÁS)

- [ ] **Bundle Optimization** (KRITIKUS - M1 submission 1.00 MB limit)
  - [ ] Lazy load `/admin` modul (~30-40 kB reduction)
  - [ ] SVG inline optimization (~15-20 kB reduction)
  - [ ] Material unused components cleanup (~10-15 kB reduction)
  - [ ] Tree shaking production build (~15-25 kB reduction)
  - **Cél: 1.08 MB → ≤1.00 MB**

- [x] Admin UX finalizálása (KÉSZ: 2026.03.24)
- [x] Profile settings bővítés (KÉSZ: 2026.03.26)
- [x] Admin User Management implementáció (KÉSZ: 2026.03.26)
- [ ] Final responsive testing
- [ ] M1 submission előkészítés

#### Specifikus Bundle Optimizations

1. **Lazy Load Admin Module** (~30-40 kB)
   ```typescript
   // app.routes.ts
   {
     path: 'admin',
     canActivate: [adminGuard],
     loadChildren: () => import('./features/admin/admin.routes')
       .then(m => m.ADMIN_ROUTES)
   }
   ```
   - Admin komponensek csak `/admin` route-on töltödnek be
   - Initial bundle feltöltés csökkentése

2. **SVG Inline Optimization** (~15-20 kB)
   - Critical SVG-k (header, footer icons) inline saját komponensba
   - Ritka SVG-k (admin icons) HTTP reference marad
   - SVG sprite sheet generálás (optional)

3. **Material Unused Cleanup** (~10-15 kB)
   - Nem használt Material módulok eltávolítása
   - Csak szükséges komponensek importálása
   - Angular Material konfigurációban csak szükséges ikonok

4. **Tree Shaking + Production Flags** (~15-25 kB)
   ```json
   // angular.json
   {
     "optimization": true,
     "buildOptimizer": true,
     "namedChunks": false
   }
   ```

#### Részletes napi bontás (3. hét)

**Nap 10-11 - Cart + Checkout alapok**
- Kosár oldal finomítása, validációs edge case-ek
- Checkout form (szállítási adatok, mock fizetés)

**Nap 12-13 - Orders**
- `OrderListComponent` + `OrderDetailComponent`
- OrderService integráció és státusz megjelenítés

**Nap 14-16 - Responsive és stabilizálás**
- Mobile/tablet breakpoint javítások
- Hibakezelések, loading state-ek egységesítése
- Heti regressziós ellenőrzés

---

### **Korábbi Hetet (Március 10 – Március 17) - Cart & Orders

**Nap 24-25 (03.25-03.26)**
- [ ] Bundle analysis `npm run build -- --stats-json`
- [ ] Lazy load admin module implementálása
- [ ] SVG inline optimization

**Nap 26 (03.27)**
- [ ] Material cleanup + tree shaking
- [ ] Build size validáció

**Nap 27-29 (03.28-03.29)**
- [ ] Final responsive smoke test
- [ ] Documentation finalize
- [ ] Main branch merge + submission prep

**Nap 25-26 (03.25-03.26) - Kész**
- [x] Profile settings oldal bővítése szerkeszthető account adatokkal
- [x] AuthService bővítése admin user management helper metódusokkal
- [x] Admin Users oldal (`/admin/users`) lista + szűrés + inline szerkesztés + role váltás
- [x] Admin Dashboard frissítés (users KPI + users nav card)

---

### **Korábbi Hetet (Március 10 – Március 17) - Cart & Orders

---

## ✅ Elfogadási Kritériumok (M1 Submission)

A mérföldkő sikeres teljesítéséhez:

1. ✔️ Összes nem-admin oldal responsív és működő mock adatokkal
2. ✔️ Login/Logout UI működik (localStorage szint)
3. ✔️ Kosár működése (add/remove/update, localStorage)
4. ✔️ Rendelés leadás UI és mock mentés
5. ✔️ Admin oldalak (szerepkör-alapú) UI teljes
6. ✔️ Admin Products CRUD mobil-friendly (FAB pattern, responsive table)
7. ✔️ Material Design szépen alkalmazva
8. ✔️ Nincs konzolos JavaScript error
9. ✔️ Mobile-friendly az összes oldal (375px-1024px)
10. ✔️ Bundle size ≤1.00 MB (M1 submission requirement)
11. ✔️ Git verzió dev branch-ben, commits tracked
12. ✔️ Dokumentáció: SPECIFICATION, DATAMODEL, COMPONENTS, DEVELOPMENT_GUIDE
13. ✔️ Profil beállítások (alap account adatok + preferenciák)
14. ✔️ Admin felhasználókezelés (jogosultság és alapadat kezelés)

---

## 🛠 Fejlesztői Kedvezmények

### Gyors Indulás Parancsok

```bash
# 1. Angular CLI telepítése
npm install -g @angular/cli

# 2. Alapvető setup
cd frontend
npm install

# 3. Development szerver indítása
npm start
# Hozzáférhető: http://localhost:4200
```

### Hasznos Angular Parancsok

```bash
# Component generálása
ng generate component features/products/product-list

# Service generálása
ng generate service core/services/product

# Guard generálása
ng generate guard core/guards/auth

# Module generálása
ng generate module features/auth --routing

# Build
npm run build:prod
```

### Material Ikonok és Komponensek

```typescript
// Leggyakrabban használt:
- mat-toolbar (header)
- mat-nav-list (sidebar/menu)
- mat-card (termék kártya)
- mat-button, mat-raised-button
- mat-form-field (input mezők)
- mat-table (termék lista admin)
- mat-dialog (popovers)
- mat-spinner (loading)
- mat-snack-bar (notifications)
```

---

## 🎨 Design Útmutató

### Szín Palette (javasolt)

- **Primary** (zöld - bio téma): `#2E7D32`
- **Accent** (orange - nyomaték): `#FF6F00`
- **Warn** (piros - hibajelzés): `#C62828`
- **Background**: `#FAFAFA`

### Tipográfia

- **Fejléc**: Material Roboto Bold
- **Body**: Material Roboto Regular
- **Kód**: Monospace (console)

### Responsive Breakpoints (Angular Material)

```typescript
xs:  0 - 599px
sm:  600px - 959px
md:  960px - 1279px
lg:  1280px - 1919px
xl:  1920px+
```

---

## 📦 Várható Fájlok a Mérföldkő Végül

```
✓ src/app/core/          (guards, services, interceptors alapok)
✓ src/app/shared/        (header, footer, product-card, models)
✓ src/app/auth/          (login, register UI)
✓ src/app/products/      (list, detail)
✓ src/app/cart/          (cart page, service)
✓ src/app/orders/        (list, detail)
✓ src/app/admin/         (dashboard, product-mgmt)
✓ src/styles.scss        (globális stílusok)
✓ angular.json, tsconfig.json
✓ README/dokumentáció update
```

---

## 🚨 Kritikus Megjegyzések

⚠️ **Mock adatok**: A backend még nem létezik, így `localStorage` és hardcoded mock data használandó

⚠️ **HTTP hívások**: (NOOP-ot vagy mock valutokat használjunk, a 2. mérföldkőig)

⚠️ **Authentication**: Csak a UI szint, a token validation a 2. mérföldkőre

⚠️ **CSS/SCSS**: Angular Material ajánlott, de custom SCSS rules-ok is oké

---

## 📞 Segítségre?

Gyakran ismétlődő problémák:

1. **Module import hiba**: Ellenőrizd az `*Module.ts` fájlokat
2. **Routing nem működik**: Likely childRoutes config hiba
3. **Material nem renderelődik**: Material CSS hiányzik az `styles.scss`-ben
4. **Types error**: Győződj meg a `tsconfig.json` `strict: true` értékről

Good luck! 🚀
