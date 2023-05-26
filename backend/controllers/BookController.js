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

  const getBook = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const book = await Book.findOne({ _id: id });
      if (user._id !== book.userId) {
        return ErrorUtils.handleDefaultError(res, 403);
      }
      res.status(200).json(book);
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
      case 'read-status':
        return { hasRead: 1 };
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
      res.status(201).json({ book, msg: `Added ${book.title} successfully!` });
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  };

  const updateBook = async (req, res) => {
    try {
      const bookIdParam = req.params.id;
      const user = req.user;
      const { bookOwnerId, updatedBook } = req.body;
      if (bookOwnerId !== user._id) {
        return ErrorUtils.handleDefaultError(res, 403);
      }
      const book = await Book.updateOne({ _id: bookIdParam }, { $set: updatedBook });
      res.status(200).json({ msg: `Updated ${book.title} successfully!`});
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  const deleteBook = async (req, res) => {
    try {
      const { book } = req.body;
      const user = req.user;
      if (book.userId !== user._id) {
        return ErrorUtils.handleDefaultError(res, 401);
      }
      await Book.deleteOne({ _id: book._id });
      res.status(200).json({ msg: `Deleted ${book.title} successfully` });
    } catch (err) {
      return ErrorUtils.handleDefaultError(res, 500);
    }
  }

  return {
    getBooks,
    getBook,
    postBook,
    deleteBook,
    updateBook
  }
};

module.exports = BookController;