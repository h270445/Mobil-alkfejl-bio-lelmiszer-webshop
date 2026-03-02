# Mobil architektúrák - Értékelési szempontrendszer

## Általános tudnivalók

* Az értékelés automatikus (AI-alapú) kódelemzéssel történik.
* A pontok nem kumulatívak a mérföldkövek között; minden mérföldkő a saját szempontjait értékeli.
* A dokumentációs fájlokat a repository gyökerében vagy a `docs/` mappában kell elhelyezni.
* Az elvárt technikáknak (pl. mobil-specifikus megoldások) jelen kell lenniük a kódbázisban.

| Szempont | Max. pont |
| :--- | :--- |
| 1. mérföldkő - Specifikáció, UI és megjelenés | 15 |
| 2. mérföldkő - Backend és adatok | 25 |
| 3. mérföldkő - Biztonság és tesztelés | 20 |
| AI tudatosság | 15 |
| Peer-review | 25 |
| **Összesen** | **100** |

---

## 1. mérföldkő: Specifikáció, UI és megjelenés (15 pont)

**Határidő: 2026.03.29. 23:59**

### 1.1 Dokumentáció (5 pont)

* **SPECIFICATION.md (2 pont):** Tartalmazza a projekt rövid leírását, funkcionális és nem-funkcionális követelményeket (technológiai döntések), legalább 2 felhasználói szerepkört és a képernyő-listát navigációs tervvel.
* **DATAMODEL.md (2 pont):** Legalább 5 entitás felsorolása mezőkkel és típusokkal, valamint a köztük lévő logikai kapcsolatok (1:N, N:M) bemutatása.
* **COMPONENTS.md (1 pont):** Az alkalmazás komponens-hierarchiájának (komponensfa) vagy navigációs gráfjának bemutatása.

### 1.2 Implementáció (10 pont)

* **Adaptív megjelenés (3 pont):** Az app különböző kijelzőméreteken és orientációban is jól használható. Elvárt technikák (legalább 4): Safe Area kezelése, Constraint/Flexbox layout, adaptív tipográfia, touch-barát interakciók (min. 44 x 44px), kép-optimalizálás.
* **Design token rendszer (2 pont):** Központi színrendszer, egységes térközök (spacing), tipográfiai skála és lekerekítések (border-radius) következetes használata tokenek segítségével.
* **Akadálymentesség (2 pont):** Platform-specifikus accessibility (pl. contentDescription, accessibilityLabel), helyes heading-hierarchia és megfelelő (min. 4.5:1) kontrasztarány.
* **Navigáció (2 pont):** Stack-alapú vagy Tab-alapú navigáció legalább 4 képernyővel, aktív állapot vizuális jelzése és hibás navigáció kezelése.
* **Komponens-architektúra (1 pont):** Legalább 6 önálló, saját fájlban lévő komponens beágyazott hierarchiával.

---

## 2. mérföldkő: Backend és adatok (25 pont)

**Határidő: 2026.04.26. 23:59**

* **Adatmodell (4 pont):** Legalább 5 működő entitás a tervnek megfelelően, értelmes kapcsolatokkal.
* **CRUD műveletek (6 pont):** Legalább 2 entitáson teljes Create (validált form), Read (listázó és részletes nézet), Update (adatbetöltés) és Delete (megerősítő dialógus).
* **Backend integráció (5 pont):** Perzisztens tárolás (Firebase, Supabase vagy REST API), service réteg elkülönítése és írási műveletek backenden való végrehajtása.
* **Állapotkezelés (4 pont):** Központi állapotkezelés (pl. Riverpod, BLoC, Signals), reaktív adatfolyam, számított értékek és form állapotkezelés.
* **Aszinkron műveletek (3 pont):** Betöltés közbeni visszajelzés (Shimmer/Spinner), hálózati hiba kezelése, üres állapot (empty state) és sikeres műveletek visszajelzése (Toast/Snackbar).
* **UX kiegészítések (3 pont):** Keresés, szűrés, rendezés vagy lapozás/infinite scroll megvalósítása.

---

## 3. mérföldkő: Biztonság és tesztelés (20 pont)

**Határidő: 2026.05.10. 23:59**

* **Autentikáció (5 pont):** Működő regisztráció, login, logout, munkamenet perzisztencia és auth-függő felület.
* **Jogosultágkezelés (5 pont):** Védett képernyők (guards), szerepkör-alapú UI elemek és backend-oldali biztonsági szabályok.
* **Input validáció (2 pont):** Kliens- és szerver-oldali adatellenőrzés, érzékeny adatok védelme.
* **Tesztelés (5 pont):** Legalább 10 unit teszt (érdemi logikára) és legalább 1 integrációs/E2E teszt a fő folyamatra.
* **Deploy (3 pont):** Letölthető telepítőfájl (APK/IPA) vagy tesztelési link (TestFlight/Firebase), és README a lokális futtatáshoz.

---

## AI tudatosság (15 pont)

**Fájl: AI_PROMPT_LOG.md**

* **Prompt napló (6 pont):** Legalább 10 jelentős prompt és az AI válaszainak összefoglalása.
* **Döntéshozatal (4 pont):** Legalább 5 dokumentált döntés (elfogadás/módosítás/elutasítás) indoklással.
* **Kritikai szemlélet (5 pont):** Legalább 2 eset bemutatása, amikor az AI tévedett, és a napló tükrözze a projekt fejlesztési ívét.

---

## Érdemjegyek

| Pontszám | Érdemjegy |
| :--- | :--- |
| 0-49 | Elégtelen (1) |
| 50-61 | Elégséges (2) |
| 62-73 | Közepes (3) |
| 74-85 | Jó (4) |
| 86-100 | Jeles (5) |

**Minimum az elfogadáshoz: 50 pont.**
