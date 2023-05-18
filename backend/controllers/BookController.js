const Book = require("../models/Book");

const BookController = () => {
  const getBooks = async (req, res) => {
    try {
      const user = req.user;
      const books = await Book.find({ userId: user._id });
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  const postBook = async (req, res) => {
    try {
      const user = req.user;
      req.body.userId = user._id;
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  return {
    getBooks,
    postBook
  }
};

module.exports = BookController;