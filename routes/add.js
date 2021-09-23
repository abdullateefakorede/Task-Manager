const express = require('express');
const router = express.Router();
const { toDoValidator, addController } = require('../controllers/addController');

router.get('/', addController.addCallBack);
router.post('/', toDoValidator, addController.addPostCallBack);

module.exports = router;