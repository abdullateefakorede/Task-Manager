const allToDo = require("../data.json");
const path = require('path');
const { writeFileSync } = require("fs");
const editService = require('../services/edit');
const { signedIn } = require("../services/user");
const { eachUserToDos } = require("../utils/common");
const { isMyToDo } = require("../services/edit");

class editController {

    static getToDoDetail = (req, res) => {
        const foundToDo = editService.getToDo(req.params.id, req.session.userId)

        if (!signedIn(req.session.userId)) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        if (foundToDo.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Page Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Fetched Successfully",
            data: foundToDo
        })
    }

    static editToDo = (req, res) => {
        const idIndex = editService.idIndex(req.params.id);
        const indexData = allToDo[idIndex];
        if (!signedIn(req.session.userId)) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        if (!isMyToDo(req.params.id, req.session.userId)) {
            return res.status(404).json({
                success: false,
                message: "You have no right to go to this To-Do"
            })
        }

        if (editService.dateExist(req.body.dueDate)) {
            const dueAt = new Date(req.body.dueAt);
            indexData.dueAt = dueAt.toISOString();
        }
        if (editService.toDoCompleted(req.body.completed)) {
            indexData.completed = true;
        } else {
            indexData.completed = false;
        }
        indexData.name = req.body.name || indexData.name;
        const dataPath = path.join(process.cwd(), 'data.json');
        writeFileSync(dataPath, JSON.stringify(allToDo, null, 4));
        res.status(200).json({
            success: true,
            message: "Update made Succesfully ",
            data: indexData
        })
    }
}


module.exports = editController;