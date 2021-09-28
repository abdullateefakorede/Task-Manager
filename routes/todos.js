const express = require('express');
const router = express.Router();
const editController = require("../controllers/edit");
const toDoController = require('../controllers/toDo');
const validator = require('../middlewares/validator');

const authenticate = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({
            message: 'Not authenticated',
            success: false,
            data: null
        })
    }

    return next()
}


router.get("/", toDoController.allToDo)

router.post('/', authenticate, validator.toDo, toDoController.addToDo);

router.get("/:id", editController.getToDoDetail)
router.patch("/:id", editController.editToDo)

module.exports = router;