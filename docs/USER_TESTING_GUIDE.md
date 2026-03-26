# 👥 Felhasználói Tesztelői Útmutató (UAT)

**Projekt**: BioMarket - Bio Élelmiszer Webshop  
**Célközönség**: nem fejlesztő, átlag felhasználó tesztelők  
**Becsült idő**: 25-35 perc / fő

---

## 1. Mi a célod tesztelőként?

A cél az, hogy valódi felhasználóként kipróbáld az alap vásárlási folyamatot, és jelezd, ha valami:
- nem egyértelmű,
- hibásan működik,
- vagy zavaró használat közben.

Nem kell programozói tudás.

---

## 2. Gyors Setup (Windows)

### 2.1. Ha a projekt már fut
Ha a fejlesztő már elindította az oldalt, csak nyisd meg ezt:
- http://localhost:4200

### 2.2. Ha neked kell elindítani
1. Nyisd meg a projekt mappáját VS Code-ban.
2. Nyiss egy Terminált.
3. Futtasd:

```bash
cd frontend
npm install
npm start
```

4. Böngészőben nyisd meg:
- http://localhost:4200

Ha hiba van induláskor, jelezd a fejlesztőnek, és küldd el a hibaüzenetet (képernyőfotóval).

---

## 3. Teszt fiókok

Használd az alábbi belépési adatokat:

### Normál felhasználó
- Email: kovacs.janos@example.com
- Jelszó: user123

### Admin felhasználó
- Email: admin@biomarket.hu
- Jelszó: admin123

---

## 4. Teszt forgatókönyv (kattintásos lista)

### 4.1. Böngészés és terméklista
1. Nyisd meg a főoldalt.
2. Menj a Termékek oldalra.
3. Próbáld ki a keresést (írj be legalább 1 kulcsszót).
4. Válassz kategóriát.
5. Válts rendezést (pl. ár szerint).

Elvárt eredmény:
- A lista frissül, nincs szétesett elrendezés, nincs olvashatatlan elem.

### 4.2. Termék részletek + kommentek
1. Nyiss meg egy termék adatlapot.
2. Ellenőrizd, hogy látszanak a kommentek/értékelések.
3. Szűrj csillag alapján (1-5).
4. Bejelentkezve írj egy rövid kommentet és adj értékelést.

Elvárt eredmény:
- A szűrés működik.
- Új komment megjelenik a listában.

### 4.3. Kosár és checkout
1. Tegyél legalább 2 terméket kosárba.
2. Módosíts mennyiséget (+/-).
3. Menj a checkout oldalra.
4. Töltsd ki a címet (utca + házszám külön mező).
5. Válassz fizetési módot.
6. Adj le rendelést.

Elvárt eredmény:
- Sikeres visszajelzés jelenik meg.
- Látható rendelés összesítő.
- A folyamat végén nem marad hibás állapot.

### 4.4. Profil és rendelések
1. Nyisd meg a Profil oldalt.
2. Ellenőrizd a mentett címet és értesítési címet.
3. Nyisd meg a Rendeléseim oldalt.
4. Nyiss meg egy rendelés részleteit.

Elvárt eredmény:
- Az adatok olvashatók, logikusak, hiánytalanok.

### 4.5. Admin alapellenőrzés (admin fiókkal)
1. Jelentkezz be adminnal.
2. Nyisd meg az admin felületet.
3. Lépj a felhasználók listájára.
4. Mobil nézetben ellenőrizd, hogy kártyás/collapse viselkedés működik.

Elvárt eredmény:
- Admin nézet betölt.
- Lista kezelhető mobilon is.

---

## 5. Mire figyelj különösen?

- Van-e elírás a felületen?
- Van-e olyan gomb, ami nem reagál?
- Ugrál-e az oldal rossz pozícióra navigációnál?
- Minden szöveg olvasható-e (dropdownok, toast üzenetek, gombok)?
- Mobilon is kényelmes-e a használat?

---

## 6. Hibabejelentés sablon

Másold ki és töltsd ki:

```text
Tesztelő neve:
Dátum/idő:
Eszköz + böngésző: (pl. iPhone 13, Safari)
Oldal/útvonal: (pl. /products/3)
Mit csináltam lépésről lépésre:
1.
2.
3.

Várt eredmény:
Tényleges eredmény:
Súlyosság: (Alacsony / Közepes / Magas)
Képernyőkép vagy videó: (igen/nem)
Megjegyzés:
```

---

## 7. Gyors hibaelhárítás tesztelőknek

### Nem tölt be az oldal
- Ellenőrizd, hogy a http://localhost:4200 címet nyitottad-e meg.
- Frissítsd az oldalt (Ctrl + F5).

### Furcsa régi adatok látszanak
- Böngészőben nyiss privát/incognito ablakot, és ott próbáld újra.
- Ha továbbra is gond van, szólj a fejlesztőnek (localStorage reset kellhet).

---

Köszönjük a tesztelést! A visszajelzésed közvetlenül javítja a használhatóságot.
