/**
 * Model pro knížky
 * Modely nějakým způsobem se starají o data
 * Implementace modelů může být odlišná - nějaké funkce se mohou například objevit v controlleru místo toho, aby byly v modelu a obráceně
 * Nádherným pravidlem by bylo udržet jednu a tu stejnou konveci
 * Pokud si připravíte například nějaké funkce pro výběr z databáze a dáte je do modelu, tak by se všechny podobné funkce měly dávat do modelu.
 * Pokud tuto logiku budete psát přímo do controlleru, tak ji nechávejte v controlleru. V lepším případě strukturu aplikace ještě rozšířit.
 * Neplést tyto dvě věci dohromady.
 * 
 * Postup:
 *  1. Naimportuje se mongoose
 *  2. Vytvoří se Schema pro knížky - jako v SQL databázi se vytváří tabulka a její struktura, do které se dávají záznamy, tak v MongoDB (v této NoSQL databázi) se vytvoří schéma, podle kterého se vytvoří JSON Object a vloží se následně do dané kolekce.
 *  3. Vyexportuje se tento model jako modul, který pak následně použijeme například v controlleru.
 * 
 * Neplést pojmy modul a model.
 * Model dat - struktura jak budou vypadat v databázi
 * Moduly - rozdělení JavaScript programu do částí, které pak následně můžeme využívat tam, kde jsou potřeba.
 */

// Naimportuje modul mongoose
const mongoose = require("mongoose");

/**
 * mongoose.Schema - vytvoří schéma pro naši knížku
 * Toto schéma obsahuje strukturu knížky
 * 
 * Struktura jedné vlastnosti knížky:
 *  name: { type: String, required: true }
 *  název_vlastnosti: { type: datový_typ, required: true (pokud je daná věc vyžadována) }
 */
const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
});

/**
 * Exportuje model do modulu. Model má název Book a strukturu si přebírá z proměnné bookSchema. 
 * MongoDB název modelu ve svém systému dává do množného čísla.
 * Pro vlastní název lze například dát tento název jako třetí argument - mongoose.model("Book", bookSchema, "myBooks")
 * Těch možností je více
 */ 
module.exports = mongoose.model("Book", bookSchema);