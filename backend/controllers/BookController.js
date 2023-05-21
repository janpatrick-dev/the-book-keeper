const Book = require("../models/Book");
const ErrorUtils = require("../utils/ErrorUtils");

const BookController = () => {
  const getBooks = async (req, res) => {
    try {
      const sortQuery = getSortQuery(req.query.filterBy);
      const user = req.user;
      const books = await Book.find({ userId: user._id }).sort(sortQuery);
      res.status(200).json(books);
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  const getSortQuery = (filterBy) => {
    switch (filterBy) {
      case 'title':
        return { title: 1 };
      case 'author':
        return { author: 1 };
      case 'year-published':
        return { yearPublished: -1 };
      case 'date-created':
      default:
        return { createdAt: -1 };
    }
  }

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

  const deleteBook = async (req, res) => {
    try {
      const { book } = req.body;
      const user = req.user;
      if (book.userId !== user._id) {
        return ErrorUtils.handleDefaultError(res, 401);
      }
      await Book.deleteOne({ _id: book._id });
      res.status(200).json({ msg: 'Deleted successfully' });
    } catch (err) {
      console.log(err.message);
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  return {
    getBooks,
    postBook,
    deleteBook
  }
};

module.exports = BookController;