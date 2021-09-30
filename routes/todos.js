const express = require('express');
const router = express.Router();
const ToDoController = require('../controllers/toDo');
const validator = require('../middlewares/validator');


router.get("/", ToDoController.allToDo)

router.post('/', validator.toDo, ToDoController.addToDo);

router.get("/:id", ToDoController.getToDoDetails)
router.patch("/:id", ToDoController.editToDo)

module.exports = router;