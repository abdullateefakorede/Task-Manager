const express = require('express');
const userController = require('../controllers/usercontroller');
const router = express.Router();

// router.get('/', userController.signUp);
router.post('/', userController.signupValidator, userController.signUp);

module.exports = router;