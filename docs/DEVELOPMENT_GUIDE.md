# 🚀 Projekt Beállítási Útmutató

## Szükséges Szoftverek

- **Node.js**: v18+ (npm 10+)
- **Java**: JDK 21
- **Maven**: 3.8+
- **Docker**: (opcional, dockerizáshoz)
- **Git**: verziókezeléshez

---

## 🔧 Fejlesztői Környezet Beállítása

### 1. Frontend Setup (Angular)

```bash
# Könyvtárba lépés
cd frontend

# Függőségek telepítése
npm install

# Development szerver indítása
npm start

# Hozzáférhető: http://localhost:4200
```

### 2. Backend Setup (Spring Boot)

```bash
# Könyvtárba lépés
cd backend

# Maven függőségek letöltése (első futtatásnál időigényes)
mvn clean install

# Development szerver indítása
mvn spring-boot:run

# API dokumentáció: http://localhost:8080/api/swagger-ui.html
```

### 3. Adatbázis Setup (PostgreSQL - Docker)

```bash
# Docker compose fájl a projekt gyökerében

# Teljes stack indítása (PostgreSQL + Backend)
docker-compose up --build

# Leállítás
docker-compose down
```

---

## 📝 Git Konvenciók

### Branch Nómenklatúra

```
main                    - Production ready kód
├── milestone-1         - Mérföldkő 1 (UI)
├── milestone-2         - Mérföldkő 2 (Backend)
└── milestone-3         - Mérföldkő 3 (Security & Deploy)

feature/               - Új feature development
├── feature/auth-ui
├── feature/products-list
└── feature/cart

bugfix/                - Bug fix branchek
├── bugfix/login-validation
```

### Commit Message Formátum

```
[TYPE] Modulus: Rövid leírás (max 50 char)

Részletesebb leírás ha szükséges.
Dapat megkulömböztetni a mit, miért és hogyan.

Fixes: #123 (issue szám ha van)
```

**Típusok:**
- `FEAT`: Új feature
- `FIX`: Bug javítás
- `REFACTOR`: Kód tisztító refaktoring
- `STYLE`: Formázás/stílus változások
- `DOCS`: Dokumentáció
- `TEST`: Test hozzáadás/módosítás
- `CHORE`: Build, dependency, config

**Példák:**
```
[FEAT] auth: Login form komponens implementálása

[FIX] products: Termék lista szűrési bug javítása

[DOCS] README update az 1. mérföldkővel
```

---

## 📂 Könyvtárstruktúra Magyarázat

```
Mobil-alkfejl-bio-lelmiszer-webshop/
├── frontend/                          # Angular alkalmazás
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                 # Shared services, guards
│   │   │   ├── shared/               # Megosztott komponensek
│   │   │   ├── features/             # Feature modulok
│   │   │   │   ├── auth/
│   │   │   │   ├── products/
│   │   │   │   ├── cart/
│   │   │   │   ├── orders/
│   │   │   │   └── admin/
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts
│   │   └── styles.scss
│   ├── angular.json
│   └── package.json
│
├── backend/                           # Spring Boot alkalmazás
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/hu/biomarket/
│   │   │   │   ├── controller/       # REST controllere
│   │   │   │   ├── service/          # Business logic
│   │   │   │   ├── repository/       # DB access
│   │   │   │   ├── entity/           # JPA entitások
│   │   │   │   ├── dto/              # Transfer objektumok
│   │   │   │   ├── security/         # JWT, config
│   │   │   │   ├── exception/        # Szokoásba hordott kivételek
│   │   │   │   └── BiomarketApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Unit/Integration tesztek
│   ├── pom.xml
│   └── Dockerfile
│
├── docs/                              # Dokumentáció
│   ├── MILESTONE_1_PLAN.md           # 1. mérföldkő ütemterv
│   ├── DEVELOPMENT_GUIDE.md          # Ez a fájl
│   └── API_SPEC.md                   # API specifikáció (később)
│
├── docker-compose.yml                 # Dockerizált environment
└── README.md                          # Projekt overview
```

---

## 🧪 Fejlesztési Workflow

### Egy tipikus munkanap:

```bash
# 1. Frissítsd a mainon
git checkout main
git pull origin main

# 2. Hozz létre egy feature branchet
git checkout -b feature/my-feature

# 3. Végezz munkát
# (kód írás, szerkesztés)

# 4. Stash-eld vagy commitold a changes-t
git add .
git commit -m "[FEAT] auth: Login form"

# 5. Push-old a branchet
git push origin feature/my-feature

# 6. GitHub-on hozz létre Pull Request-et
# - Válts be description-t
# - Kérd meg review-ert
# - Merge után töröld a branchet
```

---

## 🔍 Tipikus Fejlesztés Célok (1. Mérföldkő)

### Frontend Fejlesztő TODO

```
☐ HeaderComponent (navigáció, user menü)
☐ FooterComponent
☐ LoginComponent (mock auth)
☐ RegisterComponent
☐ ProductListComponent
☐ ProductDetailComponent
☐ ProductCardComponent
☐ CartPageComponent + CartService
☐ OrderListComponent
☐ OrderDetailComponent
☐ AdminDashboardComponent
☐ ProductManagementComponent (CRUD UI)
☐ Responsive design finomítás
☐ Bug fixes az 1. mérföldkőig
```

### Backend Fejlesztő TODO (2. mérföldkőre)

```
☐ User entitás + repository
☐ Product entitás + repository
☐ Order/OrderItem entitás + repository
☐ JWT konfigurálás
☐ SecurityConfiguration
☐ Auth controller (login, register)
☐ Exception handler
☐ DTOs
☐ Service layer
☐ Rest Controllers
☐ Swagger/OpenAPI konfig
☐ Database migrations
```

---

## 🆘 Gyakori Hibák és Megoldásuk

### Hiba: "Cannot find module" az Angularban

**Megoldás:**
```bash
npm install
npm start
```

### Hiba: Spring Boot nem tud csatlakozni adatbázishoz

**Megoldás:**
```bash
# Indítsd el a PostgreSQL containert
docker-compose up postgres

# Ellenőrizd az application.properties konfigurációt
```

### Hiba: npm/Maven version hibák

**Megoldás:**
```bash
node --version  # v18+ szükséges
npm --version   # 10+ szükséges
mvn --version   # 3.8+ szükséges
```

### Hiba: CORS error a Frontend-Backend kommunikációban

**Megoldás:** (2. mérföldkőben)
- SecurityConfiguration-ban engedélyezd a CORS-t
- Frontend interceptor megfelelő Origins-sel

---

## 💡 Hasznos Tippek

### Angular Development

```typescript
// Gyors komponens generálás
ng generate component features/auth/login --standalone

// Service generálás
ng generate service core/services/auth

// Guard generálás
ng generate guard core/guards/auth
```

### Spring Boot Development

```bash
# Gyors Maven build
mvn clean package -DskipTests

# Dev profile futtatás
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Docker

```bash
# Build és futtatás egy parancsban
docker-compose up --build

# Csak egy szervíz (pl. csak DB)
docker-compose up postgres

# Clean shutdown
docker-compose down -v  # -v törli az adatokat is
```

---

## 📊 IDE Ajánlások

### Frontend
- **VS Code** (ajánlott)
  - Extensions: Angular Language Service, SCSS IntelliSense, Thunder Client

### Backend
- **IntelliJ IDEA Community** (ajánlott)
  - Beépített Spring támogatás, Maven integrálás

---

## 🔗 Hasznos Linkek

- [Angular Docs](https://angular.io/docs)
- [Angular Material](https://material.angular.io)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [JWT io](https://jwt.io)
- [PostgreSQL Docs](https://www.postgresql.org/docs/16/)
- [Docker Docs](https://docs.docker.com/)

---

## 📞 Támogatás

Kérdések vagy problémák esetén:
1. Ellenőrizd ezt a fájlt
2. Küldetd meg az issue-t a GitHub-on
3. Keress esetleg hasonló problémákat az interneten

---

**Utolsó frissítés**: 2026.02.27
