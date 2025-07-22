# Inštalácia KROS Log Viewer Extension

## Možnosť 1: Vývoj a testovanie (Development Mode)

1. **Otvor projekt vo VSCode**:
   ```bash
   cd MMLib.LogsReader
   code .
   ```

2. **Nainštaluj závislosti** (ak neboli nainštalované):
   ```bash
   npm install
   ```

3. **Skompiluj extension**:
   ```bash
   npm run compile
   ```

4. **Spusti Extension Development Host**:
   - Stlač `F5` alebo
   - Choď do `Run and Debug` (Ctrl+Shift+D) 
   - Vyber "Run Extension" 
   - Klikni ▶️ (Start Debugging)

5. **Otvorí sa nové VSCode okno s extension nainštalovaným**

## Možnosť 2: Vytvoriť VSIX balík

1. **Nainštaluj vsce** (VSCode Extension CLI):
   ```bash
   npm install -g vsce
   ```

2. **Vytvor VSIX balík**:
   ```bash
   vsce package
   ```

3. **Nainštaluj z VSIX súboru**:
   - Vo VSCode: `Extensions` > `...` > `Install from VSIX...`
   - Vyber vytvorený `.vsix` súbor

## Testovanie extension

1. **Použij pripravené test súbory**:
   - `logexample.log` - originálny log súbor
   - `test-log.log` - jednoduchý test súbor

2. **Testuj funkcionalitu**:
   - Pravý klik na .log súbor v exploreri
   - Vyber "Show KROS Log"
   - Vyskúšaj filtrovanie podľa kategórií a levelov
   - Otestuj rôzne kombinácie filtrov

## Riešenie problémov

### Extension sa nenačítava
- Skontroluj či je extension skompilované (`out/` zložka existuje)
- Reštartuj VSCode
- Skontroluj `Developer Console` (Help > Toggle Developer Tools)

### Logy sa nezobrazujú správne  
- Skontroluj formát log súboru
- Extension rozpoznáva formát: `YYYY-MM-DD HH:mm:ss.fff ±HH:mm [LEVEL] [CATEGORY] message`
- Kategória je nepovinná

### Performance problémy
- Extension zobrazuje max 1000 záznamov naraz
- Pre veľké súbory použi filtrovanie pre zmenšenie počtu zobrazených záznamov

## Debug režim

Pre debugovanie extension:

1. Nastav breakpointy v TypeScript kóde
2. Spusti `F5`
3. V novom okne vykonaj akciu ktorá spustí extension
4. Debug session sa zastaví na breakpointoch 