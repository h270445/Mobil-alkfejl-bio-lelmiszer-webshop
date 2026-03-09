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
| 🟡 | **Responsive Smoke Testing (Day 9-10)** | 0% |

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

**Day 8 - UI/UX Refinement & FAB Keresés (TODAY)**
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
- [ ] **Responsive smoke teszt az összes route-on** (`/`, `/products`, `/auth/login`, `/auth/register`, `/cart`)
  - [ ] Breakpoints: 375px, 390px, 768px, 820px, 1024px
  - [ ] Ellenőrzés:
    - [x] Nincs vízszintes overflow egyetlen breakpoint-on sem
    - [x] Header search bar, auth gombok, cart badge helyesen rendezve
    - [x] Header kategória nav mobil rájátékra swipe-olható
    - [x] Products FAB gomb funkcionális, expand/collapse működik
    - [x] FAB kategória filterek működnek, kiválasztás szűr
    - [x] Product card rács nem tö rédik meg
    - [x] Cart mennyiség +/- gombok működnek
    - [x] Form validáció auth oldalon működik
    - [x] Nincs konzol JavaScript error
  - [ ] Dokumentálás: PASS/FAIL státusz tracker frissítése route×breakpoint mátrixban
- [ ] **Bundle size optimalizálás** (ha szükséges)
- [ ] **MILESTONE_1_TRACKER.md Day 9-10 szekció** kitöltése smoke test eredményekkel
- [ ] **Milestone 1 zárás** (ha összes teszt PASS)

**Megjegyzés**: Material Icon font teljes eltávolítása miatt SVG-alapú icon rendszer használatban. FAB pattern UX-centrikus, mobil-first Design. Week 2 core feladatok befejezve, smoke testing következik.

### ✅ Day 9-10 Smoke Checklist (03.07-03.09)

**Breakpoints (mindegyik route-on):**
- [ ] 375x667
- [ ] 390x844
- [ ] 768x1024
- [ ] 820x1180
- [ ] 1024x1366

**Route checklist:**
- [ ] `/` Home: nincs vízszintes overflow, hero + category + footer render rendben
- [ ] `/products`: FAB keresés/szűrés működik, ProductCard rács törésmentes
- [ ] `/products/:id`: vissza gomb, kosárba rakás, not-found state működik
- [ ] `/cart`: mennyiség +/- , törlés, összegzés, szállítási logika, disabled checkout out-of-stock esetben
- [ ] `/auth/login`: form validáció, remember me, returnUrl flow
- [ ] `/auth/register`: form validáció, password match, returnUrl flow

**Általános UI/UX ellenőrzés:**
- [ ] Header: search bar középre van, auth gombok nem lógnak ki, category nav mobilon swipe-olható
- [ ] Footer: tartalom tördelése rendben, social ikonok rendben, nincs page-level overflow
- [ ] Products FAB: zöld gomb jelenik meg, expand/collapse működik, kategória filterek interaktívak
- [ ] Toast/Error üzenetek olvashatók és bezárhatók
- [ ] Nincs konzol JavaScript error
- [ ] Konzol: nincs új JavaScript error (network fallback log elfogadható)

**Dokumentáció zárás:**
- [ ] Tracker frissítve PASS/FAIL státusszal route-onként
- [ ] INDEX státuszfrissítés (ha minden smoke teszt PASS)

**2. Hét Célja (március 3-9):**
- [x] Auth Module UI komplett (login, register)
- [x] Products lista és detail oldalak
- [x] Cart page (checkout flow kezdet)
- [x] ProductCard addToCart integráció (Home + Products oldalak)
- [ ] ErrorMessage komponens bekötése az auth/cart/product flow-kba

---

**Utolsó frissítés**: 2026.03.05 (nap 8, UI/UX refinement + FAB kategória szűrőkkel kész)
