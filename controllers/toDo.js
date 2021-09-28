const toDoService = require("../services/todo");
const addService = require("../services/add");
const { writeFileSync } = require("fs");
const path = require('path');
const toDos = require("../data.json");
const { randomFunction, eachUserToDos } = require("../utils/common");
const { signedIn } = require("../services/user");


class toDo {

    static allToDo = (req, res) => {
        const myToDos = eachUserToDos(req.session.userId);

        if (!signedIn(req.session.userId)) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fetching Suuccesful",
            data: toDoService.formatArray(myToDos)
                // data: myToDos
        })

    }

    static addToDo = (req, res) => {
        const addToDo = req.body;
        const createDate = new Date();
        const randomID = randomFunction(5);
        if (!signedIn(req.session.userId)) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        if (addService.dateExist(req.body.dueAt)) {
            const dueDate = new Date(req.body.dueAt);
            Object.assign(addToDo, { dueAt: dueDate.toISOString() })
        } else {
            req.body.dueAt = "NIL"
        }
        let addDate = Object.assign(addToDo, { created: createDate.toISOString() });
        let completedRefactor = Object.assign(addDate, { completed: false })
        let toDoDetails = Object.assign(completedRefactor, { id: randomID, userId: req.session.userId || null });
        toDos.push(toDoDetails);
        const dataPath = path.join(process.cwd(), 'data.json')
        writeFileSync(dataPath, JSON.stringify(toDos, null, 4))
        const dataIndex = toDos.findIndex(todo => todo.id === randomID)
        return res.status(200).json({
            success: true,
            message: "To-Do Successfully Added",
            data: toDos[dataIndex]
        })
    }

}


module.exports = toDo;