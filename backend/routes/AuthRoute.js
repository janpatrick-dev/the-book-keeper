const AuthController = require('../controllers/AuthController');
const router = require('express').Router();

const controller = AuthController();

router.post('/signup', controller.postSignup);

module.exports = router;