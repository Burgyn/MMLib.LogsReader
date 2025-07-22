# KROS Log Viewer

Enhanced VSCode extension pre lepšie zobrazovanie a analyzovanie KROS aplikačných logov s filtrovaním a vizualizáciou.

## Funkcionalita

- **Kontextové menu**: Pravý klik na .log súbory v exploreri pre otvorenie v KROS Log Viewer
- **Pokročilé filtrovanie**: Filtruj logy podľa kategórií a úrovní závažnosti
- **Farebné kódovanie**: Rôzne farby pre rôzne úrovne logov (Error, Warning, Info, Debug, Verbose)
- **Optimalizované výsledky**: Efektívne spracovanie aj veľkých log súborov
- **VSCode integrácia**: Prirodzený vzhľad a správanie v VSCode prostredí

## Podporované log formáty

Extension rozpoznáva KROS log formát:
```
2025-07-21 13:08:34.239 +00:00 [INF] [Partners] Správa logu
2025-07-21 13:08:34.385 +00:00 [DBG] Debug správa bez kategórie
2025-07-21 13:08:34.535 +00:00 [ERR] [MyDocuments] Chybová správa
```

### Úrovne závažnosti:
- `ERR` - Error (červená)
- `WRN` - Warning (oranžová) 
- `INF` - Information (modrá)
- `DBG` - Debug (zelená)
- `VRB` - Verbose (fialová)

### Kategórie:
- Kategórie sú uvedené v hranatých zátvorkách `[Názov]`
- Ak kategória chýba, zobrazuje sa ako `MAIN`

## Použitie

1. Otvor log súbor v exploreri
2. Pravý klik na .log súbor
3. Zvoľ "Show KROS Log" z kontextového menu
4. Použi filtre pre zobrazenie len potrebných logov:
   - **Categories**: Vyber konkrétne kategórie alebo "All Categories"
   - **Log Levels**: Vyber úrovne závažnosti alebo "All Levels"
5. Klikni "Apply Filters" pre aplikovanie filtrov
6. Použi "Clear All" pre resetovanie filtrov
7. Použiť "Refresh" pre obnovenie zobrazenia

## Inštalácia a vývoj

```bash
# Inštalácia závislostí
npm install

# Kompilácia
npm run compile

# Spustenie v Development móde
F5 v VSCode (spustí Extension Development Host)
```

## Požiadavky

- VSCode ^1.74.0
- TypeScript ^4.9.4

## Známe obmedzenia

- Pre výkon sa zobrazuje maximálne 1000 záznamov naraz z filtrovaných výsledkov
- Veľké súbory (>10MB) môžu trvať dlhšie na spracovanie

## Prispievanie

1. Fork repository
2. Vytvor feature branch
3. Commit zmeny
4. Push do branch
5. Vytvor Pull Request

## Licencia

MIT License 