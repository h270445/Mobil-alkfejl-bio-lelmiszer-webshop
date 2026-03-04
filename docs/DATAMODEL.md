# DATAMODEL.md - BioMarket Adatmodell

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026.03.04

---

## 📊 Adatmodell Áttekintés

Az alkalmazás **8 fő entitásra** épül, amelyek közül **7 persistens** (adatbázisban tárolódik), és **1 transziens** (csak runtime-ban, localStorage-ben).

| # | Entitás | Típus | Leírás | Megmarad-e? |
|----|---------|-------|--------|-------------|
| 1 | **User** | Persistens | Felhasználók (vásárlók, adminok) | ✅ DB + localStorage |
| 2 | **Address** | Persistens | Címek (számlázási/szállítási) | ✅ DB |
| 3 | **Category** | Persistens | Termékkategóriák | ✅ DB |
| 4 | **Product** | Persistens | Termékek katalógus | ✅ DB |
| 5 | **Review** | Persistens | Felhasználói értékelések/visszajelzések | ✅ DB |
| 6 | **Order** | Persistens | Felhasználó rendelések | ✅ DB |
| 7 | **OrderItem** | Persistens | Rendelés tételei | ✅ DB |
| 8 | **Favorites** | Persistens (N:M) | Felhasználó kedvenc termékei | ✅ DB (junction) |
| 9 | **CartItem** | **Transziens** | Kosár tartalma (runtime csak) | ❌ localStorage (nem persistent) |

---

## 🗂️ Entitás Definíciók

### 1️⃣ **User** (Felhasználó)

Felhasználók (vásárlók és adminok) alapvető adatait tartalmazza.

```
┌──────────────────────────────────────────┐
│               USER                       │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│     email: VARCHAR(255) UNIQUE NOT NULL  │
│     password: VARCHAR(255) NOT NULL      │
│     firstName: VARCHAR(100) NOT NULL     │
│     lastName: VARCHAR(100) NOT NULL      │
│     phone: VARCHAR(20)                   │
│     role: ENUM(user, admin) = 'user'     │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
│     updatedAt: TIMESTAMP                 │
│     isActive: BOOLEAN DEFAULT true       │
├──────────────────────────────────────────┤
│ FK  addresses: Address[] (1:N)           │
│ FK  orders: Order[] (1:N)                │
│ FK  reviews: Review[] (1:N)              │
│ FK  favorites: Product[] (N:M junction)  │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **email** | VARCHAR(255) | UNIQUE, NOT NULL | Email cím (login felhasználónév) |
| **password** | VARCHAR(255) | NOT NULL | Jelszó (bcrypt hash) |
| **firstName** | VARCHAR(100) | NOT NULL | Keresztnév |
| **lastName** | VARCHAR(100) | NOT NULL | Vezetéknév |
| **phone** | VARCHAR(20) | OPTIONAL | Telefonszám |
| **role** | ENUM | DEFAULT 'user' | Szerepkör: 'user' vagy 'admin' |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Regisztráció dátuma |
| **updatedAt** | TIMESTAMP | OPTIONAL | Utolsó módosítás |
| **isActive** | BOOLEAN | DEFAULT true | Felhasználó aktív-e? |

**Validáció**:
- Email: RFC 5322 format, unique
- Jelszó: minimum 6 karakter, bcrypt hash
- Név: 1-100 karakter

**Mock adatok**: 3 user (1 admin, 2 regular)

---

### 2️⃣ **Address** (Cím)

Szállítási és számlázási címek. Egy felhasználónak több címe lehet.

```
┌──────────────────────────────────────────┐
│              ADDRESS                     │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│ FK  userId: BIGINT NOT NULL              │
│     street: VARCHAR(255) NOT NULL        │
│     city: VARCHAR(100) NOT NULL          │
│     zipCode: VARCHAR(10) NOT NULL        │
│     country: VARCHAR(100) = 'Hungary'    │
│     isDefault: BOOLEAN DEFAULT false     │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
├──────────────────────────────────────────┤
│ FK  user: User (N:1)                     │
│ FK  orders: Order[] (1:N)                │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **userId** | BIGINT | FK → User.id, NOT NULL | Tulajdonos felhasználó |
| **street** | VARCHAR(255) | NOT NULL | Utca, házszám |
| **city** | VARCHAR(100) | NOT NULL | Város |
| **zipCode** | VARCHAR(10) | NOT NULL | Irányítószám |
| **country** | VARCHAR(100) | DEFAULT 'Hungary' | Ország |
| **isDefault** | BOOLEAN | DEFAULT false | Alapértelmezett szállítási cím? |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Létrehozás dátuma |

**Kapcsolat**: User 1:N Address (egy user több címmel)

**Mock adatok**: Minden user-nek 1-2 cím

---

### 3️⃣ **Category** (Kategória)

Termékkategóriák (6 kategória).

```
┌──────────────────────────────────────────┐
│            CATEGORY                      │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│     name: VARCHAR(100) UNIQUE NOT NULL   │
│     slug: VARCHAR(100) UNIQUE NOT NULL   │
│     description: TEXT                    │
│     icon: VARCHAR(255)                   │
│     displayOrder: INT DEFAULT 0          │
│     isActive: BOOLEAN DEFAULT true       │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
├──────────────────────────────────────────┤
│ FK  products: Product[] (1:N)            │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **name** | VARCHAR(100) | UNIQUE, NOT NULL | Kategória neve (pl. "Tejtermékek") |
| **slug** | VARCHAR(100) | UNIQUE, NOT NULL | URL-barát név (pl. "tejtermekek") |
| **description** | TEXT | OPTIONAL | Kategória leírása |
| **icon** | VARCHAR(255) | OPTIONAL | Material Icon név (pl. "local_dairy") |
| **displayOrder** | INT | DEFAULT 0 | Megjelenési sorrend |
| **isActive** | BOOLEAN | DEFAULT true | Aktív kategória? |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Létrehozás dátuma |

**Kategóriák** (6 darab):
1. Tejtermékek (local_dairy)
2. Pékáruk (bakery_dining)
3. Zöldség-gyümölcs (eco)
4. Húskészítmények (restaurant)
5. Italok (local_bar)
6. Snackek (fastfood)

---

### 4️⃣ **Product** (Termék)

Termékek katalógusa.

```
┌──────────────────────────────────────────┐
│             PRODUCT                      │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│ FK  categoryId: BIGINT NOT NULL          │
│     name: VARCHAR(255) NOT NULL          │
│     description: TEXT                    │
│     imageUrl: VARCHAR(500)               │
│     price: DECIMAL(10,2) NOT NULL        │
│     originalPrice: DECIMAL(10,2)         │
│     inStock: BOOLEAN DEFAULT true        │
│     stockQuantity: INT DEFAULT 0         │
│     rating: DECIMAL(3,2) DEFAULT 0       │
│     reviewCount: INT DEFAULT 0           │
│     isFeatured: BOOLEAN DEFAULT false    │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
│     updatedAt: TIMESTAMP                 │
├──────────────────────────────────────────┤
│ FK  category: Category (N:1)             │
│ FK  reviews: Review[] (1:N)              │
│ FK  orderItems: OrderItem[] (1:N)        │
│ FK  favoritedBy: User[] (N:M junction)   │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **categoryId** | BIGINT | FK → Category.id, NOT NULL | Kategória |
| **name** | VARCHAR(255) | NOT NULL | Termék neve (pl. "Bio Tehéntej") |
| **description** | TEXT | OPTIONAL | Termék leírása |
| **imageUrl** | VARCHAR(500) | OPTIONAL | Termék képének URL-je |
| **price** | DECIMAL(10,2) | NOT NULL | Aktuális ár (Ft-ban, 2 tizedesjegy) |
| **originalPrice** | DECIMAL(10,2) | OPTIONAL | Eredeti ár (akció esetén) |
| **inStock** | BOOLEAN | DEFAULT true | Készleten van-e? |
| **stockQuantity** | INT | DEFAULT 0 | Készletmennyiség |
| **rating** | DECIMAL(3,2) | DEFAULT 0 | Átlagos értékelés (0.0 - 5.0) |
| **reviewCount** | INT | DEFAULT 0 | Értékelések száma |
| **isFeatured** | BOOLEAN | DEFAULT false | Kiemelt termék (főoldal)? |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Kiadás dátuma |
| **updatedAt** | TIMESTAMP | OPTIONAL | Utolsó módosítás |

**Validáció**:
- Price: > 0
- Rating: 0-5
- Stock: >= 0

**Mock adatok**: 18 termék (6 kategóriában szétoszlatva)

---

### 5️⃣ **Review** (Értékelés/Vélemény)

Felhasználói értékelések és vélemények termékekről.

```
┌──────────────────────────────────────────┐
│              REVIEW                      │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│ FK  userId: BIGINT NOT NULL              │
│ FK  productId: BIGINT NOT NULL           │
│     rating: INT NOT NULL (1-5)           │
│     title: VARCHAR(255)                  │
│     comment: TEXT                        │
│     helpful: INT DEFAULT 0               │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
│     updatedAt: TIMESTAMP                 │
├──────────────────────────────────────────┤
│ FK  user: User (N:1)                     │
│ FK  product: Product (N:1)               │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **userId** | BIGINT | FK → User.id, NOT NULL | Értékelő felhasználó |
| **productId** | BIGINT | FK → Product.id, NOT NULL | Értékelt termék |
| **rating** | INT | NOT NULL, 1-5 range | Csillagos értékelés (1-5) |
| **title** | VARCHAR(255) | OPTIONAL | Értékelés címe |
| **comment** | TEXT | OPTIONAL | Részletes vélemény |
| **helpful** | INT | DEFAULT 0 | "Hasznos" szavazatok száma |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Értékelés dátuma |
| **updatedAt** | TIMESTAMP | OPTIONAL | Utolsó módosítás |

**Unique Constraint**: (userId, productId) - egy felhasználó csak egyszer értékelheti ugyanazt a terméket

**Validáció**:
- Rating: 1-5
- Comment: max 1000 karakter

**Mock adatok**: 18 termékhez ~50-60 review (néhány terméknek több, másnak kevesebb)

---

### 6️⃣ **Order** (Rendelés)

Felhasználó rendeléseit tartalmazza.

```
┌──────────────────────────────────────────┐
│              ORDER                       │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│ FK  userId: BIGINT NOT NULL              │
│ FK  shippingAddressId: BIGINT NOT NULL   │
│     status: ENUM(pending, paid,          │
│          shipped, delivered, cancelled)  │
│     totalPrice: DECIMAL(10,2) NOT NULL   │
│     createdAt: TIMESTAMP DEFAULT NOW()   │
│     updatedAt: TIMESTAMP                 │
│     shippedAt: TIMESTAMP                 │
│     deliveredAt: TIMESTAMP               │
├──────────────────────────────────────────┤
│ FK  user: User (N:1)                     │
│ FK  shippingAddress: Address (N:1)       │
│ FK  items: OrderItem[] (1:N)             │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **userId** | BIGINT | FK → User.id, NOT NULL | Rendelő felhasználó |
| **shippingAddressId** | BIGINT | FK → Address.id, NOT NULL | Szállítási cím |
| **status** | ENUM | NOT NULL, DEFAULT 'pending' | Rendelés státusza |
| **totalPrice** | DECIMAL(10,2) | NOT NULL | Végösszeg (Ft-ban) |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Rendelés leadása |
| **updatedAt** | TIMESTAMP | OPTIONAL | Utolsó státusz módosítás |
| **shippedAt** | TIMESTAMP | OPTIONAL | Feladás dátuma |
| **deliveredAt** | TIMESTAMP | OPTIONAL | Szállítás dátuma |

**Status életciklusa**:
- `pending` → `paid` → `shipped` → `delivered` ✅
- Bármikor → `cancelled` ❌

**Validáció**:
- totalPrice: > 0
- shippingAddressId: létezô Address

**Mock adatok**: 10-15 rendelés (user-ek között szétoszlatva)

---

### 7️⃣ **OrderItem** (Rendelés Tétel)

Egy rendelés szállított tételeit tartalmazza. Szétválasztva a Product-tól, hogy az árhistória megmaradjon.

```
┌──────────────────────────────────────────┐
│            ORDERITEM                     │
├──────────────────────────────────────────┤
│ PK  id: BIGINT                           │
│ FK  orderId: BIGINT NOT NULL             │
│ FK  productId: BIGINT NOT NULL           │
│     productName: VARCHAR(255) NOT NULL   │
│     quantity: INT NOT NULL               │
│     priceAtPurchase: DECIMAL(10,2)       │
│ PK  createdAt: TIMESTAMP DEFAULT NOW()   │
├──────────────────────────────────────────┤
│ FK  order: Order (N:1)                   │
│ FK  product: Product (N:1)               │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **id** | BIGINT | PK, Auto-increment | Elsődleges kulcs |
| **orderId** | BIGINT | FK → Order.id, NOT NULL | Rendelés hivatkozás |
| **productId** | BIGINT | FK → Product.id, NOT NULL | Termék hivatkozás |
| **productName** | VARCHAR(255) | NOT NULL | Termék neve (snapshot) |
| **quantity** | INT | NOT NULL, > 0 | Megrendelt mennyiség |
| **priceAtPurchase** | DECIMAL(10,2) | NOT NULL | Termék ára a vásárlás időpontjában |
| **createdAt** | TIMESTAMP | DEFAULT NOW() | Tétel hozzáadása |

**Meglegyzés**: A `productName` és `priceAtPurchase` snapshot értékek, hogy meg tudjuk jeleníteni az árhistóriát akkor is, ha a termék ára később változik.

**Validáció**:
- quantity: > 0
- priceAtPurchase: > 0

---

### 8️⃣ **Favorites** (Kedvencek - N:M Junction Table)

Felhasználó kedvenc termékei (many-to-many relationship).

```
┌──────────────────────────────────────────┐
│           USER_FAVORITES                 │
│        (Junction/Link Table)             │
├──────────────────────────────────────────┤
│ PK  userId: BIGINT NOT NULL              │
│ PK  productId: BIGINT NOT NULL           │
│     addedAt: TIMESTAMP DEFAULT NOW()     │
├──────────────────────────────────────────┤
│ FK  user: User (N:M)                     │
│ FK  product: Product (N:M)               │
└──────────────────────────────────────────┘
```

| Mező | Típus | Constraint | Leírás |
|------|-------|-----------|--------|
| **userId** | BIGINT | PK, FK → User.id | Felhasználó |
| **productId** | BIGINT | PK, FK → Product.id | Termék |
| **addedAt** | TIMESTAMP | DEFAULT NOW() | Hozzáadás dátuma |

**Composite Primary Key**: (userId, productId) - egy user csak egyszer veheti fel ugyanazt a terméket

**Kapcsolat típusa**: N:M (egy user több termék, egy termék több user)

**Perzisztencia**: Frontend localStorage-ben + Backend DB-ben (2. mérföldkőtől)

---

### 9️⃣ **CartItem** (Kosár Tétel - **TRANSZIENS**)

⚠️ **FONTOS**: Ez az entitás **NEM PERSISTENT** - csak runtime-ban létezik, localStorage-ben tárolódik!

```
┌──────────────────────────────────────────┐
│          CARTITEM (Frontend)             │
│      (localStorage JSON formában)        │
├──────────────────────────────────────────┤
│ (nincs DB-ben!)                          │
│     product: Product                     │
│     quantity: INT                        │
├──────────────────────────────────────────┤
│ localStorage key: 'biomarket_cart'       │
│ Format: CartItem[]                       │
└──────────────────────────────────────────┘
```

| Mező | Típus | Leírás |
|------|-------|--------|
| **product** | Product | Termékobjektum (teljes) |
| **quantity** | INT | Kosárban lévő mennyiség |

**localStorage Tárolás**:
```json
{
  "biomarket_cart": [
    {
      "product": { "id": 1, "name": "Bio Tej", "price": 890, ... },
      "quantity": 2
    },
    {
      "product": { "id": 5, "name": "Bio Joghurt", "price": 1290, ... },
      "quantity": 1
    }
  ]
}
```

**Érvényes**: CartItem → OrderItem konverzió a rendelés leadásakor

**Frontend Service**: CartService (RxJS BehaviorSubject)

---

## 📐 Entitás-Kapcsolat (E-R) Diagram

```
                    ┌─────────────┐
                    │    USER     │
                    ├─────────────┤
                    │ id (PK)     │
                    │ email       │
                    │ password    │
                    │ firstName   │
                    │ lastName    │
                    │ phone       │
                    │ role        │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            │ 1:N          │ 1:N          │ 1:N
            ▼              ▼              ▼
        ┌────────┐    ┌────────┐    ┌────────┐
        │ADDRESS │    │ ORDER  │    │ REVIEW │
        ├────────┤    ├────────┤    ├────────┤
        │id (PK) │    │id (PK) │    │id (PK) │
        │userId  │    │userId  │    │userId  │
        │street  │    │status  │    │rating  │
        │city    │    │total   │    │comment │
        │...     │    │...     │    │...     │
        └────────┘    └────┬───┘    └────┬───┘
                           │             │
                        1:N│             │ N:1
                           │             │
                      ┌────▼────┐    ┌───▼────┐
                      │ORDERITEM│───→│PRODUCT │
                      ├─────────┤    ├────────┤
                      │id (PK)  │    │id (PK) │
                      │orderId  │    │name    │
                      │productId│    │price   │
                      │quantity │    │rating  │
                      │price... │    │...     │
                      └─────────┘    └───┬────┘
                                         │
                                      N:1│
                                         │
                                    ┌────▼────────┐
                                    │  CATEGORY   │
                                    ├─────────────┤
                                    │id (PK)      │
                                    │name         │
                                    │slug         │
                                    │...          │
                                    └─────────────┘

                    N:M Relationship
                 (via Junction Table)
                 
        ┌────────────────────────────────────┐
        │  USER_FAVORITES (Junction Table)   │
        ├────────────────────────────────────┤
        │  userId (PK, FK → User.id)         │
        │  productId (PK, FK → Product.id)   │
        │  addedAt                           │
        └────────────────────────────────────┘
                      │          │
           ┌──────────┘          └──────────┐
           │                                 │
        N:M│                                 │N:M
           │                                 │
           ▼                                 ▼
       ┌────────┐                      ┌────────┐
       │  USER  │◄────────────────────►│PRODUCT │
       │ (1000s)│  favorites (N:M)     │ (100s) │
       └────────┘                      └────────┘
```

---

## 🔄 Kapcsolatok - Logikai és Fizikai

### 1:N Kapcsolatok

| Relationship | Leírás | Fizikai implementáció |
|--------------|--------|----------------------|
| User → Address | Egy user több szállítási cím | FK userId az Address táblában |
| User → Order | Egy user több rendelés | FK userId az Order táblában |
| User → Review | Egy user több értékelés | FK userId a Review táblában |
| Category → Product | Egy kategória több termék | FK categoryId a Product táblában |
| Product → OrderItem | Egy termék több rendelésben | FK productId az OrderItem táblában |
| Product → Review | Egy termék több értékelés | FK productId a Review táblában |
| Order → OrderItem | Egy rendelés több tétel | FK orderId az OrderItem táblában |
| Address → Order | Egy cím több rendelésben | FK shippingAddressId az Order táblában |

### N:M Kapcsolatok

| Relationship | Leírás | Fizikai implementáció |
|--------------|--------|----------------------|
| User ←→ Product (Favorites) | Egy user több kedvenc termék, egy termék több user kedvence | Junction tábla: user_favorites (userId, productId) |

### Fontos: Transziens Kapcsolatok

| Relationship | Leírás | Tárolás |
|--------------|--------|---------|
| CartItem | Kosár tartalom (product + quantity) | localStorage (JSON) - **nem persistent** |

---

## 💾 Normalizálás

Az adatmodell **3. normál formában (3NF)** van:

✅ **1NF**: Minden attribútum atomi (egyértékű)  
✅ **2NF**: Nincs részleges függőség (minden nem-kulcs attribútum függ az egész elsődleges kulcstól)  
✅ **3NF**: Nincs tranzitív függőség (nem-kulcs attribútumok nem függenek egymástól)

**Redundancia elkerülése**:
- Product mezőket nem ismételjük meg OrderItem-ben (csak snapshot értékeket)
- Category-t külön entitásnak tartjuk (nem enum a Product-ban)
- Address szeparálva van User-től (1:N, nem embedded)

---

## 🗄️ Implementációs Megjegyzések

### Frontend (Milestone 1-3)

**localStorage tárolt entitások**:
- `biomarket_current_user` - Bejelentkezett user (User + token)
- `biomarket_cart` - CartItem[] (transziens)
- `biomarket_favorites` - productId[] (mock)

**Mock Data Szolgáltatások** (@Milestone 1):
- 18 Product
- 6 Category
- 3 User
- 50-60 Review (mock)
- Üres Order[], Address[], Favorites[] (mock inicializálva)

### Backend (Milestone 2+)

**Adatbázis** (PostgreSQL):
- 8 tábla (CartItem nélkül)
- Indexek: email (User), categoryId (Product), userId (Order, Review, Address)
- Constraints: FK, UNIQUE (email), CHECK (rating 0-5)

**API Endpoints** (Spring Boot):
- `/api/users/register` POST
- `/api/users/login` POST
- `/api/products` GET, GET/:id
- `/api/categories` GET
- `/api/orders` POST, GET (felhasználói)
- `/api/reviews` POST, GET
- `/api/favorites` POST, DELETE

---

## ✅ Adatmodell Validáció

- ✅ **Minimum 5 entitás**: 8 persistens + 1 transziens = ✅
- ✅ **Értelmes kapcsolatok**: 1:N, N:M, szeparáció
- ✅ **Normalizálás**: 3NF-ben
- ✅ **Mock adatok**: 18 Product, 3 User, 6 Category, 50+ Review
- ✅ **Frontend-Backend szeparáció**: CartItem transziens, Favorites N:M

---

**Verzió**: 1.0.0  
**Utolsó frissítés**: 2026.03.04  
**Készítette**: BioMarket Development Team
