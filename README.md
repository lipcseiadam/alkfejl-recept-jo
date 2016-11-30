# Receptes alkalmazás

## Telepítés

1. Kód letöltése

    a. ZIP letöltése

    b. horvathgyozo/alkfejl-recept-2 klónozása (`git clone https://github.com/horvathgyozo/alkfejl-recept-2.git`)

    c. horvathgyozo/alkfejl-recept-2 forkolása és a saját repo klónozása

2. `git config --global url."https://".insteadOf git://` (csak a géptermekben)
3. `npm install`
4. `.env.example` fájl átnevezése `.env`-re
5. `npm run dev` paranccsal futtatni
6. `localhost:3333` megnyitása

## Express-admin adatbázis-kliens futtatása

1. `node_modules\.bin\admin config/express-admin`

2. Első futtatáskor a paraméterek beállítása

    a. `sqlite` adatbázis

    b. 4444-es port pl.

    c. username és password beállítása

3. `localhost:4444` megnyitása
