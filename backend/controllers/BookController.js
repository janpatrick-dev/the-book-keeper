const Book = require("../models/Book");
const ErrorUtils = require("../utils/ErrorUtils");

const BookController = () => {
  const getBooks = async (req, res) => {
    try {
      const user = req.user;
      const books = await Book.find({ userId: user._id }).sort({ createdAt: -1 });
      res.status(200).json(books);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  const postBook = async (req, res) => {
    try {
      const user = req.user;
      req.body.userId = user._id;
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  return {
    getBooks,
    postBook
  }
};

module.exports = BookController;