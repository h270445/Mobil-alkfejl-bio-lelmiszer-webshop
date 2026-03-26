# 📋 1. Mérföldkő - Feladatok Nyomon Követése

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Mérföldkő**: 1 (UI és Megjelenés)  
**Beadási határidő**: 2026.03.29. 23:59 CET  
**Jelenlegi hét**: 2/5  

---

## 📊 Progress Dashboard

| Status | Feladat | Progress |
|--------|---------|----------|
| ✅ | Material Icon → Custom SVG Icon System | 100% |
| ✅ | Floating Action Button (FAB) Pattern | 100% |
| ✅ | FAB kategória keresés szűrőkkel | 100% |
| ✅ | Responsive Smoke Testing (Day 9-10) | 100% |
| ✅ | Profile beállítások bővítése | 100% |
| ✅ | Admin felhasználókezelés | 100% |
| ✅ | Checkout + Szállítási cím mentése | 100% |
| ✅ | Favorites feature (szív ikon, lista) | 100% |
| ✅ | Final responsivity + functionality test | 100% |
| ⏳ | Main merge + M1 submission | 0% |

---

## 🗓️ Heti Ütemterv - 1. Hét (Február 27 – Március 2)

### Feladatok

- [x] **Angular projekt inicializálása** (~2-3 óra)
  - [x] npm install a frontend könyvtárban
  - [x] Angular Material telepítésés
  - [x] Theme konfiguráció (style.scss)

- [x] **Alapvető komponensek létrehozása** (~4-5 óra)
  - [x] HeaderComponent (navigáció, user info, logout)
  - [x] FooterComponent (link section-ök, copyright)
  - [x] LoadingSpinnerComponent (általános spinner)
  - [x] ProductCardComponent (reusable termék kártya)

- [x] **App routing setup** (~2-3 óra)
  - [x] Routes konfigáció
  - [x] HomeComponent hero + kategóriaks + info szekciók
  - [x] Lazy loading placeholder route-ok

- [x] **Mock data service** (~2-3 óra)
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

### Március 5 (nap 6-7-8)
**Terv**: Auth flow lezárása + products lista + Cart page + UI/UX refinement

**Day 6-7 - Auth + Products Detail + Cart (kész)**
- [x] Login/Register oldalak teljes bekötése
- [x] Return URL visszanavigálás auth után
- [x] Remember me opció (`sessionStorage`/`localStorage`)
- [x] ErrorMessage manuális bezárás auth flow-ban
- [x] Header minimal mode auth route-okon
- [x] Header auth gomb UX javítás (ikon + mobil label logika)
- [x] `/products` oldal implementálása (lista, kategória, keresés, rendezés)
- [x] Header kategória navigáció query param alapra állítva
- [x] `/products/:id` oldal implementálása (MVP: numerikus ID check, not-found state, fix vissza `/products`, kosárba)
- [x] `/cart` oldal teljes implementációja CartService integrációval
- [x] Szállítási költség kalkuláció (500 ft < 3500 ft, nélküle ingyenes)
- [x] Mennyiség kezelés (+/- gombok, limit: ≥1, ≤stock)
- [x] Teljes kosár törlés (warning confirm dialog)
- [x] Out-of-stock warning banner + checkout kikapcsolás
- [x] Rich empty state (kosár ikon + ajánlott termékek grid)
- [x] LoadingSpinner placeholders AWS deployment-hez
- [x] MatSnackBar feedback (item add/remove/delete)
- [x] Mobile-first responsive (card layout mobile, táblázat 768px+)
- [x] Material components: MatButtonModule, MatIconModule, MatSnackBarModule
- [x] Auth check redirect /auth/login?returnUrl=/checkout
- [x] /checkout route placeholder

**Day 8 - UI/UX Refinement & FAB Keresés**
- [x] Header search bar szöveg- és magasság igazítása (középre, szintbe a gombokkal)
- [x] Products oldal redundáns search field eltávolítása (filterek fenn maradtak)
- [x] **Floating Action Button (FAB)** implementálása kereséshez
  - [x] Material Design FAB pattern (56×56px, zöld, jobb alsó sarok)
  - [x] Expandable search panel (bottom slide-up, max-height 80vh)
  - [x] Close-icon.svg létrehozása (X szimbólum)
  - [x] Overlay háttér (0.4 opacity) - kattintásra bezárás
- [x] **Szöveges keresés integráció** FAB panel-ben
- [x] **Kategória filterek hozzáadása** FAB panel-hez
  - [x] Grid layout (2 oszlop, mobil-optimalizált)
  - [x] "Összes" gomb + összes kategória gomok (Tejtermékek, Pékáruk, stb.)
  - [x] Kategória kiválasztást követő szűrés + panel auto-close
  - [x] Active állapot megjelölés (elsődleges szín)

**Notes**: 
- Material Icon font eliminálva az összes komponensből. 28 custom SVG ikon használatban (2 új: close-icon.svg + korábbi 27-ből).
- Header search bar most optikai középre van (padding és flexbox igazítás).
- FAB pattern UX: kompakt, nem foglal el helyet, mobil-first Design.
- Products oldal FAB keresés kizárólag lokális (Products oldalra korlátozott), Header keresés globális marad.
- Bundle size: 924.18 kB (minimal növekedés a FAB logikához).


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
[FEAT] ui: Material Icon → custom SVG icon system (28 ikonok)
[FEAT] products: Floating Action Button keresés kategória szűréssel
[FIX] header: Search bar szöveg- és magasság igazítása
[REFACTOR] products: Redundáns search field eltávolítása, FAB pattern implementálása
```

---

## 🔄 Következő Lépés

**Elvégzett (Week 2 core + UI refinement):**
- [x] LoginComponent és RegisterComponent oldalak implementálása (`/auth/login`, `/auth/register`)
- [x] Products list oldal implementálása (`/products`) ProductCard listával
- [x] Product detail oldal implementálása (`/products/:id`)
- [x] Cart page implementálása valós CartService integrációval
- [x] Material Icon → custom SVG icon migration (28 ikon)
- [x] FAB pattern keresés kategória szűréssel Products oldalon
- [x] Header UI/UX refinement (search bar szöveg- és magasság igazítása)

**Hátralevő (Week 2 végéig - Day 9-10):**
- [x] **Responsive smoke teszt az osszes route-on** (`/`, `/products`, `/auth/login`, `/auth/register`, `/cart`)
  - [x] Breakpoints: 375px, 390px, 768px, 820px, 1024px
  - [x] Ellenőrzés:
    - [x] Nincs vízszintes overflow egyetlen breakpoint-on sem
    - [x] Header search bar, auth gombok, cart badge helyesen rendezve
    - [x] Header kategória nav mobil rájátékra swipe-olható
    - [x] Products FAB gomb funkcionális, expand/collapse működik
    - [x] FAB kategória filterek működnek, kiválasztás szűr
    - [x] Product card rács nem tö rédik meg
    - [x] Cart mennyiség +/- gombok működnek
    - [x] Form validáció auth oldalon működik
    - [x] Nincs konzol JavaScript error
  - [x] Dokumentalas: PASS/FAIL statusz tracker frissitese route x breakpoint matrixban
- [ ] **Bundle size optimalizálás** (ha szükséges)
- [x] **MILESTONE_1_TRACKER.md Day 9-10 szekcio** kitoltese smoke test eredmenyekkel
- [ ] **Milestone 1 zárás** (ha összes teszt PASS)

**Megjegyzés**: Material Icon font teljes eltávolítása miatt SVG-alapú icon rendszer használatban. FAB pattern UX-centrikus, mobil-first Design. Week 2 core feladatok befejezve, smoke testing következik.

### ✅ Day 9-10 Smoke Checklist (03.07-03.09)

**Breakpoints (mindegyik route-on):**
- [x] 375x667
- [x] 390x844
- [x] 768x1024
- [x] 820x1180
- [x] 1024x1366

**Route checklist:**
- [x] `/` Home: nincs vizszintes overflow, hero + category + footer render rendben
- [x] `/products`: FAB kereses/szures mukodik, ProductCard racs toresmentes
- [x] `/products/:id`: vissza gomb, kosarba rakas, not-found state mukodik
- [x] `/cart`: mennyiseg +/-, torles, osszegzes, szallitasi logika, disabled checkout out-of-stock esetben
- [x] `/auth/login`: form validacio, remember me, returnUrl flow
- [x] `/auth/register`: form validacio, password match, returnUrl flow

**Általános UI/UX ellenőrzés:**
- [x] Header: search bar kozepre van, auth gombok nem lognak ki, category nav mobilon swipe-olhato
- [x] Footer: tartalom tordelese rendben, social ikonok rendben, nincs page-level overflow
- [x] Products FAB: zold gomb jelenik meg, expand/collapse mukodik, kategoria filterek interaktivak
- [x] Toast/Error uzenetek olvashatok es bezarhatok
- [x] Nincs konzol JavaScript error
- [x] Konzol: nincs uj JavaScript error (network fallback log elfogadhato)

**Dokumentáció zárás:**
- [x] Tracker frissitve PASS/FAIL statusszal route-onkent
- [x] INDEX statuszfrissites (ha minden smoke teszt PASS)

**2. Hét Célja (március 3-9):**
- [x] Auth Module UI komplett (login, register)
- [x] Products lista és detail oldalak
- [x] Cart page (checkout flow kezdet)
- [x] ProductCard addToCart integráció (Home + Products oldalak)
- [x] ErrorMessage komponens bekötése az auth/cart/product flow-kba

---

**Utolso frissites**: 2026.03.09 (nap 9-10 smoke tesztek kesz, handoff ready)

---

## 🛠️ Hét 3 (Március 18-24) - Admin Interface & UX Refinement

### Március 18
**Terv**: Dev branch setup + dokumentáció

- [x] `dev` branch létrehozása (main clean marad)
- [x] Dev branch strategy dokumentáció hozzáadása (INDEX.md, DEVELOPMENT_GUIDE.md)
- [x] Git commits: dokumentáció updates

---

### Március 24 (nap 14-18) - Admin Interface Finalization
**Terv**: Admin interface mobilon működő, UX finalizálva

- [x] Admin routing (`/admin`, `/admin/dashboard`, `/admin/products`)
- [x] Admin Products CRUD lista (Material table)
- [x] Admin Products keres/szűrés oldal
- [x] Admin Products mobile responsivness:
  - [x] Mobile FAB "+ Új termék" gomb (fixed position, zöld, z-index 1000)
  - [x] Desktop: "+ Új termék" header gomb (nowrap)
  - [x] Ár oszlop formatting: `white-space: nowrap`, `tabular-nums`
  - [x] Táblázat oszlopok rejt\u00e9se 768px alatt (csak SKU, Név, Műveletek)
  - [x] Keresésáv UX header mintájára igazítva:
    - [x] Icon prefix spacing: `.mat-mdc-form-field-icon-prefix { padding-left: 10px; padding-right: 2px; }`
    - [x] Icon margin-right: 8px (header egységes UX-hez)
    - [x] Input placeholder szöveg nem túl messze (infix padding eltávolítva)
- [x] Admin Orders skeleton komponens
- [x] Admin Dashboard skeleton komponens
- [x] Footer minimal mode admin route-okon:
  - [x] Route detection: `router.url.startsWith('/admin')`
  - [x] Marketing szekciók rejt\u00e9se (social, contact)
  - [x] Copyright + back-to-top gomb marad
  - [x] Minimal mode styles (compact spacing)
- [x] Header admin menu:
  - [x] "Admin felület" opció csak admin user-eknek (conditional render)
  - [x] Disabled option eltávolítva (UX tiszta)
- [x] Back-to-top button scroll context fix:
  - [x] `.main-content` internal scroll container ellenőrzés
  - [x] Fallback window.scrollTo()
  - [x] Type="button" attribute hozzáadva (form submit megelőzés)

**Bundle Status:**
- ⚠️ 1.08 MB vs 1.00 MB (85 kB overage)
- 🔧 Optimization szükséges M1 bead\u00e9shez

**Responsive Validation (375, 390, 768, 1024px):**
- [x] Admin Products: FAB megjelenik mobil, auto-hide desktop
- [x] Admin Products: tábla oszlopok rejt\u00e9se 768px alatt
- [x] Admin Products: keresésáv spacing helyes
- [x] Admin Orders/Dashboard: nincs layout break
- [x] Footer: minimal mode működik `/admin` route-okon
- [x] Header: admin menu csak admin user-nek

**Git Commits:**
```
fix(admin,footer): Minimal footer mode, header menu cleanup, mobile FAB for products
fix(admin,search): Search field icon prefix styling, spacing alignment
fix(admin,products): Mobile table columns hide, FAB button responsive, price formatting
fix(header): Admin menu conditional render, disabled option remove
fix(footer): Back-to-top scroll handler, internal container support
```

---

## 📋 M1 Submission Checklist (2026.03.29 deadline)

| Komponens | Status | Notes |
|-----------|--------|-------|
| UI/UX Components | ✅ 100% | Header, Footer, ProductCard, Loading - desktop & mobile |
| Responsive Design | ✅ 100% | 375px-1024px breakpoints tested |
| Auth Flow | ✅ 100% | Login/Register/Guards working |
| Admin Interface | ✅ 100% | Dashboard, Products, Orders, Users menedzsment kész |
| Bundle Size | ✅ 100% | **~928 kB / 1.00 MB alatt** |
| Documentation | ✅ 100% | SPECIFICATION, DATAMODEL, COMPONENTS, DEVELOPMENT_GUIDE |
| Git History | ✅ 100% | Dev branch with clear commit messages |

**Milestone 1 záráshoz hátralévő lépések:**
1. Dev → Main merge (HOLNAP: 2026.03.26)
2. M1 submission (HOLNAP: 2026.03.26)

**Utolso frissites**: 2026.03.25 (checkout + favorites kész, smoke PASS, no overflow)

---

## ✅ Március 25-26 (Sprint: 24 órás M1 Closure)

### Március 25 (MA) - Checkout + Favorites Implementation

**Terv**: Checkout szállítási cím form + Favorites feature

- [x] Checkout Component:
  - [x] /checkout route (loadComponent)
  - [x] Szállítási cím form: utca, város, irányítószám, ország
  - [x] Pre-fill profil adatokból (bejelentkezett felhasználó)
  - [x] "Mentés profilba" checkbox + AuthService.updateProfile()
  - [x] OrderService.createOrder() integrálás
  - [x] Order summary: cart items + shipping cost (dinamikus 3500 Ft threshold)
  - [x] Success screen + cart clear
  - [x] Mobile responsive (grid, stack inputs, summary jól látható)
  - [x] Sticky mobile checkout CTA (végösszeg + rendelés leadása)

- [x] Favorites Feature (FR-7):
  - [x] ProductService: favoriteProducts$ BehaviorSubject
  - [x] localStorage: `biomarket_favorites` key
  - [x] ProductCard: szív ikon toggle (add/remove)
  - [x] /favorites route (list view, remove action)
  - [x] Favorites belépési pont a user menüben
  - [x] Responsive grid layout

**Acceptance**: Checkout + Favorites kódban kész, build sikeres, manuális smoke PASS, nincs overflow.

---

### Március 26 (HOLNAP) - Merge + Submit

**Terv**: Comprehensive smoke testing + dev→main merge + M1 submission

- [x] Responsivity Testing (ALL routes, ALL breakpoints: 375, 390, 768, 1024px)
- [x] Functionality Validation (critical paths)
- [x] Build Validation (`npm run build`, bundle limit OK, no blocking console error)

- [ ] Git & Submission:
  - [ ] Dev branch: clean commit history
  - [ ] Merge dev → main
  - [x] Final docs update (TRACKER, PLAN)
  - [ ] M1 Submission to teacher

**Acceptance**: Main branch updated, submission delivered

**Expected Friday**: March 29 submission deadline (3 days buffer)

---

## UPDATE 2026.03.26 - Smoke Test Issues Identified

After comprehensive smoke testing and user testing, 12 issues were identified requiring fixes before M1 submission.

### New Timeline (Rescheduled)

- **March 26 (TODAY)**: Phase 1 fixes (4 critical issues)
- **March 27 (TOMORROW)**: Phase 2-4 fixes (8 remaining issues) + Final testing + Main merge
- **March 29**: M1 Submission deadline (2 days buffer)

### Issue Tracking

See **SMOKE_TEST_ISSUES.md** for complete documentation of all 12 issues.

### Phase 1 (March 26) - Critical Fixes

- [x] #1: Order summary detail + typo fix
- [x] #4: Scroll position reset on navigation  
- [x] #5: Cart deletion notification typo
- [x] #10: Free shipping at 3500 Ft threshold

### Phase 2-4 (March 27) - Remaining Issues

- [x] #2: Notification address in profile/orders
- [x] #3: Registration form enhancements
- [x] #6: Comments feature implementation
- [x] #7: Footer typo + Twitter to X update
- [x] #8: Address field separation
- [x] #9: Payment method selector
- [ ] #11: Admin users mobile interface
- [x] #12: Select dropdown styling

---

## UPDATE 2026.03.26 - End of Day

- Smoke issue fixes completed: #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #12.
- Remaining open issue for M1 scope review: #11 (Admin users mobile interface).
- Scroll-to-top behavior was reinforced globally on route changes.
- Reviews/comments feature is implemented with write/list/filter flow.
- Known non-blocking note: mock review seeding can depend on existing localStorage state.

---
