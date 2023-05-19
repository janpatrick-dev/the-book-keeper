const AuthController = require('../controllers/AuthController');
const AuthenticateToken = require('../middlewares/AuthenticateToken');
const router = require('express').Router();

const controller = AuthController();

router.get('/login', controller.getLogin);
router.get('/signup', controller.getSignup);
router.get('/logout', AuthenticateToken, controller.getLogout);
router.post('/login', controller.postLogin);
router.post('/signup', controller.postSignup);

module.exports = router;