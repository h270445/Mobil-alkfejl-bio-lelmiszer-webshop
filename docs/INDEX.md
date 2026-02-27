# 📖 Projekt Dokumentáció Index

Ez a könyvtár tartalmazza az összes szükséges dokumentációt a BioMarket projekthez.

---

## 📑 Fájlok

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

**Állapot**: 🟢 Aktív fejlesztés alatt

**Mi szükséges:**
- ✅ Projekt alapstruktúra
- ✅ Angular setup
- ✅ Ütemterv
- 🔄 Komponensek fejlesztése
- 🔄 Mock adatok
- 🔄 Responsive design

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
