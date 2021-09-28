const express = require('express');
const userController = require('../controllers/usercontroller');
const validators = require('../middlewares/validator');
const router = express.Router();

// router.get('/', userController.signUp);
router.post('/', validators.signup, userController.signUp);

module.exports = router;