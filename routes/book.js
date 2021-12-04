/**
 * Router pro knížky
 * Uchovává v sobě koncové body pro naši API
 * Jelikož v index.js:51 je tento router připojen na koncový bod /book, tak všechny tyto cesty začínají v URL adrese na /book.
 * 
 * Postup:
 *  1. Vezme se Router z express modulu
 *  2. Na tento router se vytvoří koncové body
 *  3. Na tyto koncové body se připojí logika z controllerů
 */
// Importujeme express modul
const express = require("express");

// Z express modulu si přebíráme Router - směrovač, který se nám stará o koncové body
const router = express.Router();

// Importujeme soubor book.js ze složky controllers
const bookController = require("../controllers/book");

/**
 * Koncový bod pro získání všech knížek. Pro jednodušší ukázku vybíráme všechny knížky. V realné praxi by toto bylo limitováno určitým počtem.
 * URL: /book
 * Metoda: GET
 * Můžete si všimnout, že do uvozovek nepíšeme /book
 * To je již napsáno v index.js:51
 * Zde pouze navazujeme/větvíme na tento koncový bod
 * Jinak řečeno. IP:PORT/book je nastaveno v index.js. Zde píšeme to, co příjde dále v URL adrese
 * Pokud nechceme dále navazovat v URL adrese, stačí napsat do uvozovek /
 */
router.get("/", bookController.getBooks);

/**
 * Koncový bod pro získání jedné dané knížky pomocí ID.
 * URL: /book/:id - například /book/1 nebo /book/2 atd.
 * Metoda: GET
 */
router.get("/:id", bookController.getBook);

/**
 * Koncový bod pro vytvoření knížky
 * URL: /book
 * Metoda: POST
 */
router.post("/", bookController.postBook);

/**
 * Koncový bod pro aktualizaci celé knížky
 * URL: /book/:id
 * Metoda: PUT
 */
router.put("/:id", bookController.putBook);

/**
 * Koncový bod pro aktualizaci nějaké položky v knížce
 * URL: /book/:id
 * Metoda: PATCH
 * Rozdíl mezi PUT a PATCH:
 *  PUT - přepisujeme vše v knížce
 *  PATCH - přepisujeme pouze nějakou část
 */
router.patch("/:id", bookController.patchBook);

/**
 * Koncový bod pro smazání knížky
 * URL: /book/:id
 * Metoda: DELETE
 */
router.delete("/:id", bookController.deleteBook);

// Exportuje router do modulu
module.exports = router;