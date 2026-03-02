# Projektmunka feladatkiírás - Mobilfejlesztési keretrendszerek

2025/2026 tavaszi félév
BSc gyakorlat

## 1. Követelmények

A projektmunka a félév során tanult modern mobilfejlesztési módszertanok gyakorlati alkalmazásának lehetősége. A félév folyamán egy tetszőleges mobil keretrendszerrel (pl. Flutter, React Native, Swift, Kotlin) készítesz mobilalkalmazást, amely tartalmazza a tanult legjobb gyakorlatokat. A hangsúly nem a funkciók mennyiségén van, hanem a megoldások minőségén, a tudatos technológiai döntéseken és az AI-asszisztált fejlesztés hatékony alkalmazásán. Minden hallgató egyénileg dolgozik a saját projektjén.

## 2. Minimum követelmények és komplexitás

### 2.1 Funkcionális követelmények

* **Entitások:** Legalább 5 önálló entitás, amelyek a választott téma köré illeszkednek és egymással logikailag értelmes kapcsolatban állnak.
* **CRUD:** Az alkalmazásnak kezelnie kell az alapvető CRUD műveleteket az entitásokon.
* **Perzisztens adattárolás:** Az alkalmazásnak munkamenetek között is meg kell őriznie az adatokat (helyi adatbázis, Firebase, vagy egyéb backend megoldás).
* **UI:** Működő, interaktív, natív-érzetű mobil felhasználói felület (nem webview vagy CLI).
* **Szerepkörök:** Legalább 2 felhasználói szerep vagy interakciós mód (pl. admin vs. felhasználó).
* **Adatkezelés:** Keresés, szűrés és rendezés legalább egy listázó nézeten.

### 2.2 Technikai követelmények

* **Adaptív elrendezés:** Alkalmazkodás különböző képernyőméretekhez és orientációhoz (álló/fekvő), Safe Area kezelése.
* **Akadálymentesítés:** Platform-specifikus accessibility (pl. contentDescription, accessibilityLabel), kontrasztarányok, képernyőolvasó támogatás.
* **Architektúra:** Választott mobil architektúra (pl. MVVM, BLoC, Clean Architecture), egyértelmű adatfolyam.
* **Állapotkezelés:** Keretrendszernek megfelelő stratégia (pl. Signals, Provider, Riverpod, Redux).
* **Navigáció:** Stack-alapú navigáció, tab-ek vagy drawer, deep linking támogatása.
* **Biztonság:** Autentikáció (email/jelszó vagy biometrikus), védett képernyők/útvonalak.
* **Tesztelés:** Legalább 10 unit teszt és legalább 1 integrációs/E2E teszt a fő folyamatra.
* **Üzemeltetés:** A működő alkalmazás letölthető bináris formában (APK/IPA) vagy tesztelési csatornán keresztül.
* **UX:** Loading és error state kezelése: shimmer/skeleton loading, hibaüzenetek.

### 2.3 Ami nem szükséges

Nem szükséges fizetési integráció, valós idejű funkciók (WebSocket), komplex DevOps
pipeline vagy natív mobilalkalmazás. Egy publikusan elérhető alkalmazás (pl.: Firebase
Hosting-on keresztül vagy APK), világos README-vel teljesen elegendő. A hangsúly a minőségi
frontend-munkán és a tudatos fejlesztésen van, nem az infrastruktúrán.

## 3. Vibe Coding és AI-asszisztált fejlesztés

A kurzus része az AI-asszisztált fejlesztés. Bármilyen AI eszköz használható (GitHub Copilot, ChatGPT, Claude).

**AI tudatosság (15 pont):**

* **Prompt napló:** Jelentős promptok és válaszok naplózása.
* **Értékelés:** Dokumentáld, miért fogadtad el, módosítottad vagy utasítottad el az AI javaslatait.
* **Kritikus gondolkodás:** Annak bemutatása, hogy érted a generált kódot.
* **AI korlátok:** Dokumentálj egy esetet, amikor az AI hibázott, és hogyan javítottad ki.

## 4. Mérföldkövek és határidők

| Mérföldkő | Tartalom | Határidő |
| :--- | :--- | :--- |
| 1. mérföldkő | Specifikáció, adatmodell, UI tervek (Figma/Wireframe), navigációs térkép | 2026.03.29. 23:59 |
| 2. mérföldkő | Backend integráció, CRUD műveletek, állapotkezelés, aszinkron hívások | 2026.04.26. 23:59 |
| 3. mérföldkő | Autentikáció, tesztelés, üzemeltetés (bináris build) | 2026.05.10. 23:59 |

## 5. Beadandók

* Forráskód GitHub Classroom-ban.
* README.md (telepítési/futtatási útmutató).
* AI prompt napló és értékelési jegyzetek.
* Screencast videó (max. 5 perc, demo a működésről).

## 6. Pontozási rendszer

Összesen 100 pont, minimum 50 pont szükséges.

* **Specifikáció és UI (15p):** Dokumentáció, UI tervek, adatmodell.
* **Backend és adatok (25p):** Integráció, 5 entitás, CRUD, állapotkezelés.
* **Biztonság és tesztelés (20p):** Autentikáció, tesztek, deploy (bináris).
* **AI tudatosság (15p):** Napló és kritikus értékelés.
* **Peer-review (25p):** 3 társprojekt értékelése a megadott szempontok alapján.
