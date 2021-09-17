const express =  require('express');
const router = express.Router();

const UserController = require('../controllers/AuthController')

router.get('/',UserController.index);
router.post('/register',UserController.register);
router.post('/verifyEmail',UserController.verifyEmail);
router.post('/login',UserController.login);

module.exports = router;