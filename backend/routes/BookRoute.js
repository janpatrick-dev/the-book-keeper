const BookController = require('../controllers/BookController');
const router = require('express').Router();

const controller = BookController();

router.get('/books', controller.getBooks);
router.post('/add-book', controller.postBook);

module.exports = router;