# SPECIFICATION.md - BioMarket Projekt Specifikáció

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Keretrendszer**: Angular 17 (Standalone Components) + Spring Boot 3.2.0  
**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026.03.02

---

## 📱 Projekt Leírása

A **BioMarket** egy mobilbarát webalkalmazás, amely hozzáférést biztosít minősített bio élelmiszerekhez. Az alkalmazás célja egy egyszerű, felhasználóbarát vásárlási élmény nyújtása, ahol a vásárlók böngészhetik a termékeket kategóriák szerint, kosárba helyezhetik őket, és online megrendeléseket adhatnak le.

Az adminisztrátorok külön felületen keresztül kezelhetik a termékkínálatot, nyomon követhetik a rendeléseket, és áttekinthetik az értékesítési statisztikákat.

### Fő célkitűzések:
- **Vásárlói élmény**: Intuitív, responsive UI bio élelmiszerekhez
- **Termékportfólió**: Több kategória (tejtermékek, pékáruk, zöldség-gyümölcs, húskészítmények, italok, snackek)
- **E-commerce funkciók**: Kosár, rendelés, kedvencek, keresés/szűrés
- **Admin felület**: Termék- és rendelésezelés
- **Biztonság**: Autentikáció, jogosultságkezelés
- **Mobil-barát**: Responsive design, touch-optimalizált

---

## 🎯 Funkcionális Követelmények

### FR-1: Felhasználói Autentikáció
- **FR-1.1**: A rendszer lehetővé teszi a regisztrációt email és jelszó megadásával
- **FR-1.2**: A felhasználók bejelentkezhetnek email/jelszó párossal
- **FR-1.3**: A munkamenet perzisztens (localStorage, automatikus bejelentkezés)
- **FR-1.4**: A felhasználók kijelentkezhetnek
- **FR-1.5**: A jelszónak minimum 6 karakter hosszúnak kell lennie

### FR-2: Termék Böngészés és Keresés
- **FR-2.1**: A főoldalon megjelennek a kiemelt (featured) termékek
- **FR-2.2**: A termékek kategóriák szerint szűrhetők (6 kategória: Tejtermékek, Pékáruk, Zöldség-gyümölcs, Húskészítmények, Italok, Snackek)
- **FR-2.3**: A keresősávban szöveges keresés lehetséges (név és leírás alapján)
- **FR-2.4**: A termékek rendezhetők ár (növekvő/csökkenő), név, értékelés szerint
- **FR-2.5**: A listázó nézetben megjelenik a termék neve, ára, képe, értékelése, készletállapota
- **FR-2.6**: A termékekre kattintva részletes nézet érhető el (leírás, teljes specifikáció, értékelések)

### FR-3: Kosárkezelés
- **FR-3.1**: A felhasználók termékeket helyezhetnek kosárba (mennyiség megadható)
- **FR-3.2**: A fejléc kosár ikonja badge-dzsel jelzi a kosárban lévő termékek darabszámát
- **FR-3.3**: A kosár oldalon módosítható a termékek mennyisége (+/- gombok)
- **FR-3.4**: A kosárból termékek törölhetők
- **FR-3.5**: A kosár tartalma perzisztens (localStorage)
- **FR-3.6**: A kosár összesítést mutat (végösszeg)

### FR-4: Rendelés Leadása
- **FR-4.1**: A bejelentkezett felhasználók leadhatnak rendelést a kosár tartalmából
- **FR-4.2**: A rendeléshez meg kell adni a szállítási címet (utca, város, irányítószám, ország)
- **FR-4.3**: Sikeres rendelés után a kosár kiürül
- **FR-4.4**: A felhasználó visszajelzést kap a sikeres rendelésről (Toast/Snackbar)
- **FR-4.5**: A rendelések listázhatók a felhasználó profiljában
- **FR-4.6**: A bejelentkezett felhasználók `/checkout` oldalán a szállítási cím pre-fill-elt a profilban mentett adatokkal (ha rendelkezésre állnak)
- **FR-4.7**: A checkout form tartalmaz egy "Szállítási cím mentése profilba" checkboxot (opcionális, csak auth flow-ban aktív)
- **FR-4.8**: Ha a checkbox be van jelölve és a form beküldésre kerül, az AuthService.updateProfile() meghívódik az új szállítási cím adatokkal
- **FR-4.9**: A checkout oldal mobil-barát: szöveges input mezők responsive grid-ben, végösszeg (kosár + szállítás) jól látható
- **FR-4.10**: A szállítási költség dinamikus: 3500 Ft felett ingyenes, alatta 500 Ft

### FR-5: Felhasználói Profil
- **FR-5.1**: A bejelentkezett felhasználók megtekinthetik profiljukat (név, email, telefon, cím)
- **FR-5.2**: A profil adatai módosíthatók
- **FR-5.3**: A rendelési előzmények megtekinthetők
- **FR-5.4**: A rendelések státusza látható (pending, paid, shipped, delivered, cancelled)

### FR-6: Admin Funkciók
- **FR-6.1**: Az admin szerepkörű felhasználók hozzáférnek az admin dashboardhoz
- **FR-6.2**: Az admin listázhatja az összes terméket
- **FR-6.3**: Az admin új terméket hozhat létre (név, kategória, ár, leírás, kép URL, készlet)
- **FR-6.4**: Az admin módosíthatja a meglévő termékeket
- **FR-6.5**: Az admin törölheti a termékeket (confirmációval)
- **FR-6.6**: Az admin láthatja az összes rendelést
- **FR-6.7**: Az admin módosíthatja a rendelés státuszát (pending → paid → shipped → delivered)

### FR-7: Kedvencek Kezelés
- **FR-7.1**: A termék kártyán szív ikonnal kedvencekhez lehet adni a terméket
- **FR-7.2**: A kedvenc termékek listázhatók külön oldalon
- **FR-7.3**: A kedvencek perzisztensek (localStorage)

### FR-8: UI/UX Funkciók
- **FR-8.1**: Loading állapotban spinner jelenik meg (almás SVG animáció)
- **FR-8.2**: Hibás műveletek esetén hibaüzenet jelenik meg (Snackbar)
- **FR-8.3**: A navigáció nyomon követhető (breadcrumb vagy aktív menüpont kiemelés)
- **FR-8.4**: Back-to-top gomb jelenik meg hosszú oldalak alján
- **FR-8.5**: Üres állapotok (empty state) kezelése (pl. üres kosár, nincs rendelés)

---

## 🔧 Nem-funkcionális Követelmények

### NFR-1: Technológiai Stack
- **Frontend**: Angular 17 (Standalone Components architektúra)
- **UI Framework**: Angular Material 17
- **Styling**: SCSS + CSS Custom Properties (design tokens)
- **State Management**: RxJS BehaviorSubject pattern
- **Backend**: Spring Boot 3.2.0 + Java 21 (2. mérföldkő)
- **Database**: PostgreSQL 16 (Docker Compose)
- **Perzisztencia**: localStorage (mock services), REST API (2. mérföldkő)
- **Version Control**: Git + GitHub

### NFR-2: Teljesítmény
- **NFR-2.1**: Az oldalak betöltési ideje nem haladhatja meg a 3 másodpercet
- **NFR-2.2**: A bundle méret nem haladhatja meg az 1 MB-ot (gzip-el)
- **NFR-2.3**: Mock service-ek network delay szimulációval (300-500ms) tesztelhetőségért

### NFR-3: Biztonság
- **NFR-3.1**: A jelszavak nem tárolódnak plaintext-ben
- **NFR-3.2**: Auth guard védi a védett útvonalakat (pl. /profile, /orders, /admin)
- **NFR-3.3**: A szerepkör-alapú hozzáférés ellenőrzött (admin vs. user)

### NFR-4: Használhatóság
- **NFR-4.1**: Az alkalmazás mobile-first megközelítéssel készül
- **NFR-4.2**: Responsive breakpointek: 320px (mobile), 768px (tablet), 1024px (desktop)
- **NFR-4.3**: Touch-barát gombok (minimum 44x44px)
- **NFR-4.4**: Akadálymentesség: aria-label attribútumok, minimum 4.5:1 kontrasztarány
- **NFR-4.5**: Heading hierarchia (h1 → h2 → h3) betartása

### NFR-5: Karbantarthatóság
- **NFR-5.1**: Komponens-alapú architektúra (beágyazott hierarchia)
- **NFR-5.2**: Service réteg elkülönítése (core/services)
- **NFR-5.3**: TypeScript strict mode használata
- **NFR-5.4**: Egységes kód formázás (Angular style guide)

### NFR-6: Kompatibilitás
- **NFR-6.1**: Modern böngészők támogatása (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **NFR-6.2**: Mobil böngészők támogatása (iOS Safari, Chrome Mobile)

---

## 👥 Felhasználói Szerepkörök

### 1. **User (Vásárló)**
**Leírás**: Regisztrált felhasználó, aki termékeket böngészhet, kosárba helyezhet és rendeléseket adhat le.

**Jogosultságok**:
- ✅ Termékek böngészése, keresés, szűrés
- ✅ Termékek kosárba helyezése
- ✅ Rendelés leadása
- ✅ Saját profil megtekintése és szerkesztése
- ✅ Saját rendelések megtekintése
- ✅ Kedvencek kezelése
- ❌ Admin felülethez való hozzáférés
- ❌ Termék létrehozás/módosítás/törlés
- ❌ Más felhasználók rendeléseinek megtekintése

**Használati esetek**:
1. János új felhasználóként regisztrál
2. Böngészi a „Tejtermékek" kategóriát
3. Kosárba helyez egy Bio Tejet és egy Bio Joghurtot
4. Leadja a rendelést a mentett címére
5. Profiljában megtekinti a rendelés státuszát

---

### 2. **Admin (Adminisztrátor)**
**Leírás**: Az alkalmazás kezelője, aki a teljes termékkínálatot és az összes rendelést kezelheti.

**Jogosultságok**:
- ✅ Minden User jogosultság (böngészés, vásárlás stb.)
- ✅ Admin dashboard hozzáférés
- ✅ Termékek létrehozása
- ✅ Termékek módosítása
- ✅ Termékek törlése
- ✅ Összes rendelés megtekintése
- ✅ Rendelések státuszának módosítása (pending → paid → shipped → delivered)
- ✅ Felhasználók rendeléseinek megtekintése

**Használati esetek**:
1. Az admin bejelentkezik (admin@biomarket.hu)
2. Új terméket hoz létre: „Bio Kombucha, 1500 Ft, Italok kategória"
3. Módosítja a „Bio Alma" árát 690 Ft-ról 750 Ft-ra
4. Megtekinti a mai rendeléseket
5. Frissíti János rendelését „pending" → „paid" státuszra

---

## 📱 Képernyő-lista és Navigációs Terv

### Nyilvános képernyők (nincs login szükséges)

| # | Képernyő neve | URL | Leírás | Komponens |
|---|---------------|-----|--------|-----------|
| 1 | **Főoldal** | `/` | Hero section, kiemelt termékek, kategóriák grid | `HomeComponent` |
| 2 | **Termékek listája** | `/products` | Összes termék grid-ben, kategória szűrő, keresés | `ProductsListComponent` |
| 3 | **Termék részletek** | `/products/:id` | Termék teljes leírása, értékelések, kosárba helyezés | `ProductDetailComponent` |
| 4 | **Bejelentkezés** | `/auth/login` | Email/jelszó form, regisztrációra link | `LoginComponent` |
| 5 | **Regisztráció** | `/auth/register` | Név, email, jelszó, cím form | `RegisterComponent` |

### Védett képernyők (csak bejelentkezett usereknek)

| # | Képernyő neve | URL | Leírás | Komponens |
|---|---------------|-----|--------|-----------|
| 6 | **Kosár** | `/cart` | Kosár tartalma, mennyiség módosítás, rendelés gomb | `CartPageComponent` |
| 7 | **Profil** | `/profile` | Felhasználói adatok, cím szerkesztés | `ProfileComponent` |
| 8 | **Rendeléseim** | `/orders` | Felhasználó összes rendelése, státusz | `OrdersListComponent` |
| 9 | **Rendelés részletek** | `/orders/:id` | Egy konkrét rendelés tételei, szállítási adatok | `OrderDetailComponent` |
| 10 | **Kedvenceim** | `/favorites` | Kedvenc termékek listája | `FavoritesComponent` |

### Admin képernyők (csak admin szerepkörrel)

| # | Képernyő neve | URL | Leírás | Komponens |
|---|---------------|-----|--------|-----------|
| 11 | **Admin Dashboard** | `/admin` | Statisztikák, gyors linkek | `AdminDashboardComponent` |
| 12 | **Termékek kezelése** | `/admin/products` | Termékek listája, szerkesztés/törlés gombok | `AdminProductsComponent` |
| 13 | **Termék szerkesztő** | `/admin/products/edit/:id` | Termék adatok form | `ProductEditorComponent` |
| 14 | **Új termék** | `/admin/products/new` | Új termék létrehozás form | `ProductEditorComponent` |
| 15 | **Rendelések kezelése** | `/admin/orders` | Összes rendelés, státusz módosítás | `AdminOrdersComponent` |

---

## 🗺️ Navigációs Térkép (Navigation Flow)

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (minden oldalon)                  │
│  [Logo] [Keresősáv] [Kategóriák] [Kosár badge] [User Menu]     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          FŐOLDAL (/)                             │
│  • Hero section: "Üdvözlünk a BioMarket-ben!"                   │
│  • Kiemelt termékek (6 db)                                      │
│  • Kategóriák grid (6 kategória)                                │
│  • Info section (100% Bio, Gyors Szállítás, Minőség Garantált) │
│                                                                  │
│  [Termékek böngészése gomb] ──────────────┐                     │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                    ┌─────────────────────────┴─────────────┐
                    │                                       │
                    ▼                                       ▼
         ╔══════════════════════╗              ╔══════════════════════╗
         ║ TERMÉKEK LISTA       ║              ║ TERMÉK RÉSZLETEK     ║
         ║ (/products)          ║─────────────►║ (/products/:id)      ║
         ╠══════════════════════╣              ╠══════════════════════╣
         ║ • Grid layout         ║              ║ • Nagyobb kép        ║
         ║ • Keresés/szűrés      ║              ║ • Teljes leírás      ║
         ║ • Rendezés            ║              ║ • Értékelések        ║
         ║ • ProductCard-ok      ║              ║ • Kosárba gomb       ║
         ║                       ║              ║ • Mennyiség választó ║
         ║ [Kosárba gomb]────────┼──────┐       ║                      ║
         ╚══════════════════════╝      │       ╚══════════════════════╝
                                        │                │
                                        │                │ [Kosárba]
                                        │                │
                                        └────────┬───────┘
                                                 ▼
                                      ╔══════════════════════╗
                                      ║ KOSÁR (/cart)        ║
                                      ║ [AUTH GUARD]         ║
                                      ╠══════════════════════╣
                                      ║ • Kosár tartalom     ║
                                      ║ • Mennyiség +/-      ║
                                      ║ • Törlés gomb        ║
                                      ║ • Végösszeg          ║
                                      ║                      ║
                                      ║ [Rendelés leadása]   ║
                                      ╚══════════════════════╝
                                                 │
                                                 ▼
                                      ╔══════════════════════╗
                                      ║ RENDELÉS LEADÁS      ║
                                      ║ (Dialog/Checkout)    ║
                                      ╠══════════════════════╣
                                      ║ • Szállítási cím     ║
                                      ║ • Összesítés         ║
                                      ║ [Megerősítés]        ║
                                      ╚══════════════════════╝
                                                 │
                                                 ▼
                                      ╔══════════════════════╗
                                      ║ RENDELÉSEIM          ║
                                      ║ (/orders)            ║
                                      ║ [AUTH GUARD]         ║
                                      ╠══════════════════════╣
                                      ║ • Lista (státusszal) ║
                                      ║ • Rendelés részletek ║
                                      ╚══════════════════════╝

┌─────────────────────────────────────────────────────────────────┐
│                    AUTENTIKÁCIÓ                                  │
├─────────────────────────────────────────────────────────────────┤
│  ╔════════════════╗          ╔════════════════╗                 │
│  ║ LOGIN          ║          ║ REGISTER       ║                 │
│  ║ (/auth/login)  ║◄────────►║ (/auth/register)║                │
│  ╠════════════════╣          ╠════════════════╣                 │
│  ║ • Email        ║          ║ • Név          ║                 │
│  ║ • Jelszó       ║          ║ • Email        ║                 │
│  ║ [Belépés]      ║          ║ • Jelszó       ║                 │
│  ║ [Regisztráció] ║          ║ • Cím          ║                 │
│  ╚════════════════╝          ║ [Regisztrálok] ║                 │
│          │                   ╚════════════════╝                 │
│          └─────────┬─────────────────┘                          │
│                    ▼                                             │
│         ╔══════════════════════╗                                │
│         ║ PROFIL (/profile)    ║                                │
│         ║ [AUTH GUARD]         ║                                │
│         ╠══════════════════════╣                                │
│         ║ • Név, email         ║                                │
│         ║ • Cím szerkesztés    ║                                │
│         ║ • Jelszó módosítás   ║                                │
│         ║ [Mentés]             ║                                │
│         ╚══════════════════════╝                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN KÉPERNYŐK                               │
│                    [AUTH GUARD + ROLE: ADMIN]                    │
├─────────────────────────────────────────────────────────────────┤
│  ╔══════════════════════╗                                       │
│  ║ ADMIN DASHBOARD      ║                                       │
│  ║ (/admin)             ║                                       │
│  ╠══════════════════════╣                                       │
│  ║ • Napi rendelések    ║                                       │
│  ║ • Termék statisztika ║                                       │
│  ║ [Termékek kezelése]──┼──────┐                                │
│  ║ [Rendelések kezelése]║      │                                │
│  ╚══════════════════════╝      │                                │
│                                 ▼                                │
│         ╔══════════════════════════════════╗                    │
│         ║ TERMÉKEK KEZELÉSE                ║                    │
│         ║ (/admin/products)                ║                    │
│         ╠══════════════════════════════════╣                    │
│         ║ • Termék lista (táblázat)        ║                    │
│         ║ • [Új termék] [Szerkeszt] [Töröl]║                    │
│         ╚══════════════════════════════════╝                    │
│                    │                                             │
│                    ▼                                             │
│         ╔══════════════════════════════════╗                    │
│         ║ TERMÉK SZERKESZTŐ                ║                    │
│         ║ (/admin/products/edit/:id)       ║                    │
│         ╠══════════════════════════════════╣                    │
│         ║ • Form: név, kategória, ár,      ║                    │
│         ║   leírás, kép URL, készlet       ║                    │
│         ║ [Mentés] [Mégse]                 ║                    │
│         ╚══════════════════════════════════╝                    │
│                                                                  │
│         ╔══════════════════════════════════╗                    │
│         ║ RENDELÉSEK KEZELÉSE              ║                    │
│         ║ (/admin/orders)                  ║                    │
│         ╠══════════════════════════════════╣                    │
│         ║ • Összes rendelés listája        ║                    │
│         ║ • Státusz módosító dropdown      ║                    │
│         ║ • Rendelés részletek             ║                    │
│         ╚══════════════════════════════════╝                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        FOOTER (minden oldalon)                   │
│  [Kapcsolat] [Adatvédelem] [ÁSZF] [Szociális média] [Back-to-top]│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Navigációs Szabályok (Guards)

| Útvonal | Guard | Szerepkör | Átirányítás hiba esetén |
|---------|-------|-----------|-------------------------|
| `/cart` | AuthGuard | User/Admin | `/auth/login` |
| `/orders` | AuthGuard | User/Admin | `/auth/login` |
| `/profile` | AuthGuard | User/Admin | `/auth/login` |
| `/favorites` | AuthGuard | User/Admin | `/auth/login` |
| `/admin/*` | AuthGuard + RoleGuard | Admin | `/` (Forbidden) |

---

## 📊 Adatfolyam (User Journey példák)

### User Journey 1: Vásárlás (User szerepkör)
1. **Főoldal** → Böngészi a kiemelt termékeket
2. **Termékek lista** (`/products?category=tejtermekek`) → Szűr kategóriára
3. **Termék részletek** (`/products/1`) → Megnézi a Bio Tej részleteit
4. **Kosárba helyez** → Header badge frissül (1 termék)
5. **Kosár** (`/cart`) → Ellenőrzi a kosarat, módosítja mennyiséget
6. **Rendelés leadás** → Megerősíti a szállítási címet
7. **Sikeres rendelés** → Snackbar: "Rendelés sikeresen leadva!"
8. **Rendeléseim** (`/orders`) → Megtekinti a rendelést (státusz: pending)

### User Journey 2: Termék kezelés (Admin szerepkör)
1. **Bejelentkezés** (`/auth/login`) → Belép mint admin@biomarket.hu
2. **Admin Dashboard** (`/admin`) → Megtekinti napi statisztikát
3. **Termékek kezelése** (`/admin/products`) → Listázza az összes terméket
4. **Új termék** (`/admin/products/new`) → Létrehoz egy új terméket
5. **Termék szerkesztés** (`/admin/products/edit/19`) → Módosítja az új termék árát
6. **Rendelések kezelése** (`/admin/orders`) → Megtekinti a napi rendeléseket
7. **Státusz frissítés** → János rendelését állítja "paid" státuszra

---

## 🎨 UI/UX Elvek

### Design Alapelvek
- **Simplicty**: Minimalista, clean design
- **Bio-brand identity**: Zöld (#C1EDCE) és natúr (#F6F6F7) színek használata
- **Touch-first**: Minden interaktív elem minimum 44x44px
- **Feedback**: Minden user akció azonnali visszajelzést kap (Toast, Snackbar)

### Színséma (Design Tokens)
- **Primary**: `#4caf50` (zöld - bio érzet)
- **Accent**: `#ff9800` (narancs - hover, CTA gombok)
- **Error**: `#f44336` (piros - hibák, törlés)
- **Surface**: `#F6F6F7` (light grey - card háttér)
- **Bio Surface**: `#C1EDCE` (light green - bio kiemelés)
- **Text**: `rgba(0, 0, 0, 0.87)` - primary, `rgba(0, 0, 0, 0.6)` - secondary

### Tipográfia
- **Font család**: Roboto (Angular Material default)
- **Display**: 36px / bold
- **Heading 1**: 24px / medium
- **Heading 2**: 20px / medium
- **Body**: 16px / regular
- **Caption**: 14px / regular

---

## ✅ Elfogadási Kritériumok

1. ✅ A specifikációban leírt összes főbb funkció implementálva
2. ✅ 2 felhasználói szerepkör működik (User, Admin)
3. ✅ Legalább 15 navigálható képernyő
4. ✅ Autentikáció működik (regisztráció, login, logout)
5. ✅ Mock service-ek perzisztencia localStorage-ban
6. ✅ Responsive design mobil, tablet, desktop nézetben
7. ✅ Material Design következetesen alkalmazva
8. ✅ Loading és error state-ek kezelése
9. ✅ Touch-optimalizált gombok (min. 44x44px)
10. ✅ Akadálymentesség alapkövetelmények (aria-labels, kontrasztarány)

---

**Utolsó módosítás**: 2026.03.02  
**Készítette**: BioMarket Development Team  
**Verzió**: 1.0.0
