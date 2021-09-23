const allToDo = require("../data.json");
const path = require('path');
const { writeFileSync } = require("fs");
const editService = require('../services/edit')

class editController {

    static getEdit = (req, res) => {
        const foundToDo = editService.getToDo(req.params.id)

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

    static toDoEdit = (req, res) => {
        const idIndex = editService.idIndex(req.body.id);
        const indexData = allToDo[idIndex];
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