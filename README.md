# 🌿 BioMarket – Full-Stack Bio Élelmiszer Webshop

## 📌 Projekt cél

Production-közeli full-stack webalkalmazás fejlesztése Angular frontenddel és Spring Boot backenddel.

A projekt célja:

- Modern enterprise architektúra bemutatása
- JWT alapú autentikáció implementálása
- Role-based hozzáférés kezelés
- Dockerizált backend
- AWS deploy
- CI/CD pipeline használata

---

## 🏗 Architektúra Áttekintés

### Frontend Repository

Tech stack:

- Angular
- Angular Material
- Reactive Forms
- HttpInterceptor (JWT kezelés)
- Route Guards (role-based védelem)

Fő modulok:

- auth
- products
- cart
- orders
- admin
- core (interceptors, guards, services)
- shared (újrahasznosítható komponensek)

---

### Backend Repository

Tech stack:

- Spring Boot
- Spring Security
- JWT (access + refresh token)
- Role-Based Access Control
- PostgreSQL
- JPA / Hibernate
- Swagger / OpenAPI
- Docker

Rétegek:

- Controller
- Service
- Repository
- DTO
- Entity
- Security
- Exception handling

---

## 🔐 Autentikációs Stratégia

- Access Token (rövid élettartam)
- Refresh Token (hosszabb élettartam)
- Role-based endpoint védelem (USER / ADMIN)

Token kezelés:

- Kezdetben: Authorization header (Bearer token)
- Ha idő engedi: Refresh token HttpOnly cookie-ban

---

## 👤 Szerepkörök

### USER

- Termékek böngészése
- Kosár kezelés
- Rendelés leadása
- Saját rendelések megtekintése

### ADMIN

- Termék létrehozás
- Termék szerkesztés
- Termék törlés
- Képfeltöltés AWS S3-ra

Admin UI role-based renderinggel működik.

---

## 🗃 Adatmodell

### User

- id
- name
- email (unique)
- password (BCrypt hash)
- role (USER / ADMIN)
- createdAt

### Product

- id
- name
- description
- price
- stock
- imageUrl (S3 URL)
- isBioCertified
- category
- createdAt

### Order

- id
- user
- totalPrice
- status (PENDING / PAID / SHIPPED)
- createdAt

### OrderItem

- order
- product
- quantity
- priceAtPurchase

---

## ☁️ AWS Architektúra

Frontend:

- Angular production build
- AWS S3 static hosting

Backend:

- Docker container
- AWS EC2 instance

Database:

- PostgreSQL Docker container EC2-n

Image storage:

- AWS S3 (admin feltöltés)

---

## 🐳 Docker Setup

Backend és PostgreSQL docker-compose segítségével fut lokálisan.

Indítás:

``` cmd
docker-compose up --build
```

---

## 🔁 CI/CD

GitHub Actions pipeline:

- Backend:
  - Build
  - Teszt futtatás
  - Docker image build

- Frontend:
  - Production build
  - Deploy S3-ra

---

## 📚 API Dokumentáció

Swagger / OpenAPI használata:

- Endpoint dokumentáció
- Request/response modellek
- Auth flow tesztelése

---

## 🧪 Tesztelési Stratégia

Backend:

- Service layer unit tesztek
- Security tesztek
- Controller tesztek

Frontend:

- Component tesztek
- Service tesztek
- Guard tesztek

---

## 📦 Fő Funkciók

- Regisztráció
- Bejelentkezés
- JWT auth
- Terméklista
- Termék részletek
- Kosár
- Rendelés leadás
- Order history
- Admin termék CRUD
- S3 képfeltöltés

---

## 🎯 Fejlesztési Mérföldkövek

### 1️⃣ Mérföldkő: UI és Megjelenés

**Beadási határidő: 2026.03.29. 23:59**

Feladatok:

- Angular komponensek fejlesztése
- Angular Material UI implementálása
- Responsive design (mobile, tablet, desktop)
- Mock adatok integrálása
- Routing és navigation
- Kosár UI
- Bejelentkezés UI (még mocking szinten)
- Admin felület alapok

### 2️⃣ Mérföldkő: Backend és Adatok

**Beadási határidő: 2026.04.26. 23:59**

Feladatok:

- Spring Boot REST API kidolgozása
- PostgreSQL adatbázis implementálása
- JPA/Hibernate entity mappinrek
- Service layer és business logic
- JWT autentikáció
- Role-based access control (RBAC)
- API dokumentáció (Swagger/OpenAPI)
- Frontend-Backend integráció

### 3️⃣ Mérföldkő: Biztonság és Tesztelés

**Beadási határidő: 2026.05.10. 23:59**

Feladatok:

- Unit tesztek (backend + frontend)
- Integráció tesztek
- Security tesztelés
- Dockerizáció (backend + PostgreSQL)
- CI/CD pipeline (GitHub Actions)
- AWS Cloud deployment
- S3 integrácó (képfeltöltés)
- Production-ready konfigurációk

---

## 🚀 Portfólió Érték

Ez a projekt bemutatja:

- Full-stack fejlesztés
- REST API tervezés
- JWT alapú autentikáció
- Role-based security
- Docker használat
- AWS deploy
- CI/CD pipeline
- Production-közeli architektúra

---

## 👨‍🎓 Készítette

Varga Bence Tamás  
Mobil Alkalmazásfejlesztés – 2026

---

## 📚 Dokumentáció

- 📖 [Teljes Dokumentáció Index](./docs/INDEX.md)
- 🎯 [1. Mérföldkő Ütemterv](./docs/MILESTONE_1_PLAN.md)
- 🔧 [Fejlesztői Setup Útmutató](./docs/DEVELOPMENT_GUIDE.md)
- 📋 [1. Mérföldkő Feladatkövetés](./docs/MILESTONE_1_TRACKER.md)

---

## 🚀 Gyors Start

```bash
# Frontend (Angular) - 1. mérföldkő
cd frontend
npm install
npm start
# http://localhost:4200

# Backend (Spring Boot) - 2. mérföldkőtől
cd ../backend
mvn clean install
mvn spring-boot:run
# http://localhost:8080/api/swagger-ui.html

# Database (Docker) - opcionális
docker-compose up postgres
```
