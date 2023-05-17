const BookController = () => {
  const getBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  const postBook = async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  return {
    getBooks,
    postBook
  }
};

module.exports = BookController;