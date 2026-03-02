# 📖 Projekt Dokumentáció Index

Ez a könyvtár tartalmazza az összes szükséges dokumentációt a BioMarket projekthez.

---

## � Követelmények (Université Requirements)

### 📜 [Mobil_Ertekeles_Szempontrendszer.md](./requirements/Mobil_Ertekeles_Szempontrendszer.md)
**Hivatalos értékelési szempontok és pontozás**

- 1. mérföldkő: Specifikáció, UI (15p)
- 2. mérföldkő: Backend, adatok (25p)
- 3. mérföldkő: Biztonság, tesztek (20p)
- AI tudatosság (15p) + Peer-review (25p)
- **Minimum: 50 pont az elfogadáshoz**

### 📝 [Mobil_Projektmunka_feladatkiiras.md](./requirements/Mobil_Projektmunka_feladatkiiras.md)
**Projekt feladatkiírás és minimális követelmények**

- 5 entitás, CRUD műveletek
- Adaptív UI, akadálymentesség
- Autentikáció, tesztelés
- Mérföldkő határidők

👉 **Olvass el mindent** a munka megkezdése előtt!

---

## 📑 Projekt Dokumentumok

### ✅ [SPECIFICATION.md](./SPECIFICATION.md) ⭐ **ÚJ!**
**Teljes projekt specifikáció (1. mérföldkő követelmény - 2 pont)**

- Projekt leírás (BioMarket bio webshop)
- Funkcionális követelmények (8 fő kategória, 40+ követelmény)
- Nem-funkcionális követelmények (tech stack, teljesítmény, biztonság)
- 2 felhasználói szerepkör (User, Admin) részletes használati esetekkel
- 15 képernyő részletes navigációs térképpel
- UI/UX elvek, színséma, tipográfia

👉 **Fontos**: Ez a dokumentum 2 pontot ér a Milestone 1-en!

---

### 🎯 [MILESTONE_1_PLAN.md](./MILESTONE_1_PLAN.md)
**Az 1. mérföldkőhöz szükséges részletes ütemterv**

Tartalom:
- Heti feladatok lebontása (február 27 – március 29)
- Projektstruktúra (Angular modulok)
- Kompoens lista és felelősségek
- Elfogadási kritériumok
- Design útmutatás (szín, tipográfia)
- Gyakori hibák és megoldásuk

👉 **Kezdj itt** ha most indítod a 1. mérföldkövet!

---

### 🔧 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
**Fejlesztői útmutató az IDE beállítástól az első commit-ig**

Tartalom:
- Szükséges szoftverek
- Frontend/Backend/Database setup
- Git konvenciók (branch, commit)
- Könyvtárstruktúra magyarázat
- Tipikus fejlesztő workflow
- Gyakori hibák és megoldások
- IDE ajánlások

👉 **Olvasd el** az első nap beállítása után!

---

## 🚀 Gyors Start

### 1. Klónozd a repository-t
```bash
git clone <repo-url>
cd Mobil-alkfejl-bio-lelmiszer-webshop
```

### 2. Frontend setup
```bash
cd frontend
npm install
npm start
# http://localhost:4200
```

### 3. Backend setup (csak 2. mérföldkőtől)
```bash
cd ../backend
mvn clean install
mvn spring-boot:run
# http://localhost:8080/api
```

### 4. Database setup (Docker)
```bash
# A projekt gyökerében
docker-compose up postgres
```

---

## 📅 Ütemterv Röviden

| Mérföldkő | Dátum | Fókusz |
|-----------|-------|--------|
| **1** | 2026.03.29. | UI és Design (Angular) |
| **2** | 2026.04.26. | Backend API (Spring Boot) |
| **3** | 2026.05.10. | Security, Tesztelés, Deploy |

---

## 🎯 Aktuális Fázis: 1. Mérföldkő

**Állapot**: 🟢 Aktív fejlesztés alatt (Week 1 Complete - 100%)

**Dokumentáció szükséges (5 pont!):**
- [x] **SPECIFICATION.md** (2p) ✅ - projekt leírás, szerepkörök, 15 képernyő
- [ ] **DATAMODEL.md** (2p) - 5 entitás, kapcsolatok (holnap)
- [ ] **COMPONENTS.md** (1p) - komponens hierarchia (holnap)

**Implementáció állapot:**
- ✅ Projekt alapstruktúra (Angular 17 + Material)
- ✅ Mock services (Auth, Product, Cart, Order)
- ✅ Komponensek (Header, Footer, Spinner, ProductCard)
- ✅ Routing + navigáció
- 🔄 Auth/Products UI oldalak (Week 2)
- 🔄 Accessibility + responsive polish

**Beadási határidő**: 2026.03.29. 23:59 CET

---

## 📚 További Dokumentáció (később)

- `API_SPEC.md` - REST API specifikáció (2. mérföldkőre)
- `DATABASE_SCHEMA.md` - Database design (2. mérföldkőre)
- `SECURITY_GUIDE.md` - JWT és RBAC implementáció (3. mérföldkőre)
- `DEPLOYMENT_GUIDE.md` - AWS és Docker deploy (3. mérföldkőre)
- `TESTING_STRATEGY.md` - Unit/Integration test tervezet (3. mérföldkőre)

---

## 🤝 Szerző

**Varga Bence Tamás**  
Mobil Alkalmazásfejlesztés kurzus – SZTE, 2026

---

## 📞 Segítségre van szükséged?

1. 📖 Olvasd át a [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)-t
2. 📋 Nézd meg az [MILESTONE_1_PLAN.md](./MILESTONE_1_PLAN.md)-et az aktuális feladatra
3. 🔍 GitHub Issues-ben jelezd a problémát

---

**Utolsó frissítés**: 2026.02.27
