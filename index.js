// Modul pro komunikaci s MongoDB
const mongoose = require("mongoose");

// Modul pro správu komunikace. Umožňuje nám jednodušší implementaci MVC architektury a mnoho dalších věcí.
const express = require("express");

// Modul pro loggování HTTP komunikace. Modul je pojmenován po tomto muži https://en.wikipedia.org/wiki/Dexter_Morgan
const morgan = require("morgan");

// Modul pro Cross-Origin Resource Sharing. Představte si situaci, kdy například obrázky či nějaká videa jsou na jiném serveru. To v praxi znamená, že vaše webová stránka musí získávat nějaké zdroje z jiné stránky nebo domény. To ve výsledku může vyhodit chybovou hlášku. Tento problém nám právě řeší CORS modul.
const cors = require("cors");
const app = express();
const PORT = 3000;

// Načte modul book.js z adresáře routes
const bookRouter = require("./routes/book");

/**
 * Připojí naší aplikaci k MongoDB clusteru (Jak si založit zdarma cluster a připojit se najdete v README)
 * Nastavení:
 *  useNewUrlParser: true - MongoDB driver zavrhnul svůj starý connection string parser. Z tohoto důvodu přidali páni programátoři do modulu flag (vlajku) useNewUrlParser, která umožňuje využívat starší (hodnota: false) nebo novější (hodnota: true) parser
 *  useUnifiedTopology: true - Starší verze MongoDB fungovala na jiné topologii. S příchodem verze 3.2.1 se tato topologie celá přepsala a zlepšila mnoho věcí. Pro používání nové topologie nastavujeme tento flag na true.
 */
mongoose.connect(
    `mongodb+srv://jmeno_uzivatele:${process.env.MONGODB_PW}@cluster0.dopig.mongodb.net/jmeno_clusteru?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

/** 
 * Aplikace bude používat logger morgan s nastavením pro development (vývoj)
 * Formát je ve stylu: :method :url :status :response-time ms - :res[content-length] 
 * Část :status je: 
 *  bez barvy pro informační kódy - 100
 *  zelená pro úspěšné stavové kódy - 200
 *  tyrkysová pro přesměrovácí kódy - 300
 *  žlutá pro klientské chybové kódy - 400
 *  červená pro serverové chybové kódy - 500
 */
app.use(morgan("dev"));

// Aplikace bude používat modul cors
app.use(cors());

// Aplikace bude používat nastavení, které říká, že příchozí požadavek bude brán jako JSON Object
app.use(express.json());

// Aplikace bude používat bookRouter pro koncový bod /book. Jinak řečeno. Pokud někdo vytvoří požadavek na "IP:PORT/book", tak se tento požadavek přenese dál do modulu book.js (routes/book.js)
app.use("/book", bookRouter);

// Aplikace poběží na PORTu 3000 a po zapnutí vypíše do serverové konzole náležitou hlášku
app.listen(PORT, () => console.log(`App is running on ${PORT}`));