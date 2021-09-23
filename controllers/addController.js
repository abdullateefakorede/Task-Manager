const addService = require("../services/add");
const { writeFileSync } = require("fs");
const path = require('path');
const toDos = require("../data.json");
const { randomFunction } = require("../utils/common");
class addController {

    static addCallBack(req, res) {
        const dueAt = new Date(req.body.dueAt) || Date.now();
        const name = req.body.name;
        if (!addService.addToDoVerified(name, dueAt)) {
            return res.status(400).json({
                success: false,
                message: "Sorry, verify your inputs"
            })
        }
        return res.status(200).json({
            success: true,
            message: "To-Do Logged"
        })
    }

    static addPostCallBack = (req, res) => {
        const addToDo = req.body;
        const createDate = new Date();
        const randomID = randomFunction(5);
        if (addService.dateExist(req.body.dueAt)) {
            const dueDate = new Date(req.body.dueAt);
            Object.assign(addToDo, { dueAt: dueDate.toISOString() })
        }
        let addDate = Object.assign(addToDo, { created: createDate.toISOString() });
        let completedRefactor = Object.assign(addDate, { completed: false })
        let toDoDetails = Object.assign(completedRefactor, { id: randomID });
        toDos.push(toDoDetails);
        const dataPath = path.join(process.cwd(), 'data.json')
        writeFileSync(dataPath, JSON.stringify(toDos, null, 4))
        return res.status(200).json({
            success: true,
            message: "To-Do Successfully Added",
            data: toDos
        })
    }

}

const toDoValidator = (req, res, next) => {
    const dueAt = new Date(req.body.dueAt) || Date.now();
    const name = req.body.name;

    if (!addService.addToDoVerified(name, dueAt)) {
        return res.status(400).json({
            success: false,
            message: "Sorry, make sure your inputs are valid"
        })
    }

    if (Object.keys(req.body).length > 2 || !req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("dueAt")) {
        return res.status(401).json({
            success: false,
            message: "Invalid Object Keys"
        })
    }

    next();
}

module.exports.addController = addController;
exports.toDoValidator = toDoValidator;