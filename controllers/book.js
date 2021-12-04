/**
 * Controller pro knížky
 * Controller slouží jako pomyslné lepidlo mezi pohledem a modelem
 * Obsahuje v sobě nějakou logiku
 * Pro menší aplikace, jako je například tahle ukázka, si můžete nějak tak dovolit sem psát všechnu potřebnou logiku
 * V praxi by se spíše hodilo tuto logiku rozdělit do dalších částí - například do nějakých services (služeb) a v controlleru jen na tyto služby volat
 */

// Importuje modul models/book.js
const Book = require("../models/book");

// Logika pro získání všech knížek
exports.getBooks = async (req, res) => {
  try {
    const result = await Book.find().select("name year _id");
    if (result && result.length !== 0) {
      return res.status(200).json({
        count: result.length,
        books: result.map((book) => {
          return {
            ...book.toObject(),
            request: {
              type: "GET",
              url: `http://localhost:3000/book/${book._id}`,
            },
          };
        }),
      });
    }
    res.status(404).json({ msg: "Books not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

// Logika pro získání knížky podle id
exports.getBook = async (req, res) => {
  try {
    const result = await Book.findById(req.params.id).select("-__v");
    if (result) {
      return res.status(200).json({
        ...result.toObject(),
        request: {
          type: "GET",
          url: "http://127.0.0.1:3000/book",
        },
      });
    }
    res.status(404).json({ msg: "Book not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

// Logika pro vytvoření nové knížky
exports.postBook = async (req, res) => {
  try {
    const book = new Book({
      name: req.body.name,
      year: req.body.year,
    });
    const result = await book.save();
    if (result) {
      return res.status(201).json({
        message: "Your book was created",
        createdBook: {
          ...result.toObject(),
          payload: {
            type: "GET",
            url: `http://127.0.0.1:3000/book/${result._id}`,
          },
        },
      });
    }
    res.status(500).json({ msg: "Book was not created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

// Logika pro aktualizaci celé knížky
exports.putBook = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      year: req.body.year,
    };
    const result = await Book.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Book ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/book/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Book could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

// Logika pro aktualizaci určité části v knížce
exports.patchBook = async (req, res) => {
  try {
    const update = {};
    for (const ops of req.body) {
      update[ops.propName] = ops.value;
    }
    const result = await Book.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Book ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/book/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Book could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

// Logika pro smazání knížky
exports.deleteBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Book ${result.name}, id: ${result._id} was deleted`,
      });
    }
    res.status(404).json({
      msg: "Book not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
