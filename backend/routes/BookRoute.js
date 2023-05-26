const BookController = require('../controllers/BookController');
const AuthenticateToken = require('../middlewares/AuthenticateToken');
const router = require('express').Router();

const controller = BookController();

router.get('/books', AuthenticateToken, controller.getBooks);
router.get('/books/:id', AuthenticateToken, controller.getBook);
router.post('/add-book', AuthenticateToken, controller.postBook);
router.patch('/update-book/:id', AuthenticateToken, controller.updateBook);
router.delete('/delete-book', AuthenticateToken, controller.deleteBook);

module.exports = router;