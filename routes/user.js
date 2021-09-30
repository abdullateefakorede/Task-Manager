const express = require('express');
const userController = require('../controllers/user');
const validators = require('../middlewares/validator');
const router = express.Router();


router.post('/signin', validators.signin, userController.signIn);
router.post('/signup', validators.signup, userController.signUp);
router.post('/signout', userController.signout)


module.exports = router;