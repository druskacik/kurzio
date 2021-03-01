## Parser kurzov

Backend k programu, ktorý automatizovane ťahá ponuku zápasov a kurzov z webu tipsport.sk .

Web k projektu: kurzio.sk

Nechce sa mi na tom robiť, kľudne si z kódu vezmite kto chce čo chce.

### Štruktúra projektu

`dist` - webstránka, je to vo Vue, kód je bohužiaľ private

`migrations` - migrácie databázy (vytvorenie potrebných tabuliek)

`seeds` - naplnenie databázy údajmi (primárne ide o zoznam športov, ktoré sa ťahajú)

`src` 
- samotný backend, bližšie sa mi nechce opisovať
- kód k scrapovaniu web je primárne v časti `src/scrapers/1`

`knex_connection.js` - pripojenie k databáze (treba nastaviť environment variables)