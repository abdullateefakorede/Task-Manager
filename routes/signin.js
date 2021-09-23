const express = require('express');
const userController = require('../controllers/usercontroller');
const router = express.Router();

// router.get('/', userController.signIn);
router.post('/', userController.signinValidator, userController.signIn);

module.exports = router;