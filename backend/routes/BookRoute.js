const BookController = require('../controllers/BookController');
const AuthenticateToken = require('../middlewares/AuthenticateToken');
const router = require('express').Router();

const controller = BookController();

router.get('/books', AuthenticateToken, controller.getBooks);
router.post('/add-book', AuthenticateToken, controller.postBook);
router.delete('/delete-book', AuthenticateToken, controller.deleteBook);

module.exports = router;