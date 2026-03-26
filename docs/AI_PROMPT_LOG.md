# AI_PROMPT_LOG

Ez a dokumentum a projekt AI-tamogatott fejlesztesi naploja.
Cel: a promptok, dontesek, javitasok es tanulsagok nyomon kovetese.

## 1. Prompt Naplo (jelentos promptok)

| # | Datum | Kontextus | Prompt roviden | AI javaslat roviden | Eredmeny |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026-03-05 | Header UI hiba | "A header searchbar szoveges resze nincs kozepen" | Search field vertical alignment fix (flex + padding) | Elfogadva, implementalva |
| 2 | 2026-03-05 | Header UI hiba 2 | "A header search tul magasan van" | Height/padding finomhangolas, 48px visual alignment | Elfogadva, implementalva |
| 3 | 2026-03-05 | Products UX | "Legyen kontextusfuggo keresesi megoldas" | FAB pattern (mobilbarat, helytakarekos) | Elfogadva, implementalva |
| 4 | 2026-03-05 | Products UX 2 | "Ha C a legfelhasznalobaratabb" | Floating search panel + overlay + close flow | Elfogadva, implementalva |
| 5 | 2026-03-05 | Szures bovites | "A FAB-ban legyen kategoria filter is" | 2 oszlopos category button grid + aktiv allapot | Elfogadva, implementalva |
| 6 | 2026-03-05 | Dokumentacio | "Frissitsd a docs-okat" | MILESTONE tracker Day 8 update + smoke checklist | Elfogadva, implementalva |
| 7 | 2026-03-09 | Mobil header bug | "Mobil kicsinyitett headerben keresore kattintva nem nyilik semmi" | Mobil expandable search panel + toggle state | Elfogadva, implementalva |
| 8 | 2026-03-09 | Esztetikai hiba | "A keresesi ikon erinti a box szelet" | Prefix icon spacing szabaly desktop+mobil mezore | Elfogadva, implementalva |
| 9 | 2026-03-09 | Floating CTA utkozes | "Fel ikon es FAB ugyanott van" | Route-fuggo eltolas a back-to-top gombnak | Elfogadva, implementalva |
| 10 | 2026-03-09 | Auth alert UI | "Nincs megfelelo ikon az error bezarasahoz" | Material close icon -> SVG close-icon csere | Elfogadva, implementalva |
| 11 | 2026-03-26 | Checkout/Order UX | "Legyen kulon szallitasi es ertesitesi cim + fizetesi mod" | Modell bovitese + checkout/profile/order flow frissites | Elfogadva, implementalva |
| 12 | 2026-03-26 | Product review feature | "Legyen komment + ertekeles, szures csillag alapjan" | CommentService + product detail review UI + rating filter | Elfogadva, implementalva |
| 13 | 2026-03-26 | Header/responsive polish | "Desktop koszones iPaden legyen elrejtve" | Breakpoint emeles 1200px-re | Elfogadva, implementalva |
| 14 | 2026-03-26 | Navigation UX bug | "Navigaciokor felulrol induljon az oldal" | Globalis scroll-top megerositese AppComponent route eventtel | Elfogadva, implementalva |

## 2. Dokumentalt Dontesek (elfogadas/modositas/elutasitas)

| # | Datum | Temakor | AI javaslat | Vegso dontes | Indoklas |
| --- | --- | --- | --- | --- | --- |
| D1 | 2026-03-05 | Keresesi UX | Dupla keresomezo (header + products) helyett kontextusfuggo UX | Modositva/elfogadva (FAB a products oldalon) | Mobilon jobb helykihasznalas es kisebb kognitiv terheles |
| D2 | 2026-03-05 | Ikonrendszer | Vegyes Material icon + SVG hasznalat | Elfogadva: teljes SVG migracio | Konzisztens stilus, jobb kontroll, font fugges csokkentese |
| D3 | 2026-03-09 | Mobil header search | Csak kereses trigger, input nelkul | Elutasitva, majd uj megoldas elfogadva | Kattintasra vizualis input kell, kulonben UX hiba |
| D4 | 2026-03-09 | FAB vs back-to-top | Azonos koordinata hasznalata | Modositva: route-fuggo eltolas | Elkeruli overlap-et, javitja tap target megbizhatosagot |
| D5 | 2026-03-09 | Error close ikon | Material `mat-icon` close | Elutasitva, SVG close ikon elfogadva | A projekt SVG alapu, ez ad vizualis es technikai konzisztenciat |

## 3. Kritikai Szemlelet (AI tevedesek es korrekciok)

### E1 - Mobil keresesi flow hianya
- Helyzet: a mobil search ikon kezdetben nem nyitott beviteli mezot.
- Mi volt a problema: a trigger csak `onSearch()` hivast tett, de mobilon a search field rejtve volt.
- Korrekcio: `showMobileSearch` allapot + nyithato mobil panel + bezaras.
- Tanulsag: interakciohoz mindig lathato input/allapot kell.

### E2 - Error close ikon inkompatibilis mintaja
- Helyzet: alert close ikon `mat-icon` alapon maradt, mikozben a projekt SVG alapu.
- Mi volt a problema: hibas/inkonzisztens render ("clc"-szeru megjelenes).
- Korrekcio: SVG `close-icon.svg` hasznalata.
- Tanulsag: UI migracio utan vegig kell ellenorizni a maradek legacy komponenseket.

## 4. Folyamatos Frissitesi Szabaly

Minden jelentosebb blokk utan (feature, bugfix, refactor) rogzits:
1. Datum
2. Prompt roviden
3. AI javaslat roviden
4. Vegso dontes (elfogadva/modositva/elutasitva)
5. 1 mondatos indoklas

## 5. Kovetkezo Bovitesi Csomag (Milestone 2)

- Backend modellek es API integracios promptok
- CRUD endpoint valasztasi dontesek
- Error/empty/loading allapotokra adott AI javaslatok ertekelese
- Security es validacios trade-offok dokumentalasa

---

Utolso frissites: 2026-03-26
