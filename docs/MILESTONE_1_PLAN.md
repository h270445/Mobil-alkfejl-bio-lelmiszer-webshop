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

- [ ] Cart modul
- [ ] Checkout/Order form
- [ ] Responsive design finomítása
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

- [ ] Admin modul UI
- [ ] Product management (CRUD UI)
- [ ] Authentication UI integrálása
- [ ] Route Guards előkészítése

#### Specifikus lépések

1. **Admin Module** (8-10 óra)
   - `AdminDashboardComponent` (overview)
   - `ProductManagementComponent`
     - Termék lista (admin view)
     - Termék létrehozás form
     - Termék szerkesztés form
     - Termék törlés confirmation
   - Táblázat/lista megjelenítés (mat-table)

2. **Route Guards UI** (2-3 óra)
   - Login redirect ha nincs auth
   - Admin-only route indikálása
   - Role-based navigation megjeleníthető/rejtett menüelemek

3. **UI Finomítások** (4-5 óra)
   - Placeholder/skeleton loaders
   - Error notification toasts
   - Success notifications
   - Loading states a gombokba

#### Részletes napi bontás (4. hét)

**Nap 17-18 - Admin dashboard és lista nézetek**
- Admin dashboard skeleton + KPI kártyák
- Admin terméklista (mat-table) alap funkciók

**Nap 19-20 - Product management UI**
- Új termék felvétel/szerkesztés form
- Törlés megerősítés és kliens oldali validáció

**Nap 21 - Auth/Role-alapú UI**
- Admin menüpontok role szerint megjelenítve
- Guard UX: redirect + visszajelzés

**Nap 22-23 - Hardening + puffer**
- Betöltési állapotok és toastok egységesítése
- Admin és user útvonalak smoke tesztje
- Heti dokumentáció frissítés

---

### **5. Hét (Március 24 – Március 29)**

#### Feladatok

- [ ] Teljes UI tesztelés
- [ ] Responsive testing különböző eszközökön
- [ ] Accessibility (a11y) alapok
- [ ] Bug fixes és UI polishing
- [ ] Dokumentáció

#### Specifikus lépések

1. **Testing** (6-8 óra)
   - Desktop böngészők (Chrome, Firefox, Edge)
   - Mobile szimuláció (DevTools)
   - Tablet breakpoints
   - Touch interakciók

2. **Accessibility** (3-4 óra)
   - ARIA labels
   - Keyboard navigation
   - Color contrast ellenőrzés
   - Semantic HTML

3. **UI Polishing** (4-5 óra)
   - Animációk (Angular Animations)
   - Átmenetek (transitions)
   - Loading states
   - Empty states (üres listák)

4. **Dokumentáció** (2-3 óra)
   - Component dokumentáció (TODO lista az implementációra)
   - Fejlesztői útmutató (environment setup)
   - Komponens screenshot-jai

---

## ✅ Elfogadási Kritériumok

A mérföldkő sikeres teljesítéséhez:

1. ✔️ Összes nem-admin oldal responsív és működő mock adatokkal
2. ✔️ Login/Logout UI működik (localStorage szint)
3. ✔️ Kosár működése (add/remove/update, localStorage)
4. ✔️ Rendelés leadás UI és mock mentés
5. ✔️ Admin oldalak (szerepkör-alapú) UI teljes
6. ✔️ Material Design szépen alkalmazva
7. ✔️ Nincs konzolos JavaScript error
8. ✔️ Mobile-friendly az összes oldal
9. ✔️ Git verzió 1. mérföldkő branch-ben

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
