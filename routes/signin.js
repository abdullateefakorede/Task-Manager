const express = require('express');
const userController = require('../controllers/usercontroller');
const validators = require('../middlewares/validator');
const router = express.Router();


router.post('/', validators.signin, userController.signIn);

module.exports = router;