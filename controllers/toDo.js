const ToDoService = require("../services/todo");
const { writeFileSync } = require("fs");
const path = require('path');
const toDos = require("../data.json");
const { generateRandomId } = require("../utils/common");
const UserService = require("../services/user");

class ToDoController {

    static allToDo = (req, res) => {
        const myToDos = UserService.fetchUserToDos(req.user.id);

        if (!req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fetching Suuccesful",
            data: ToDoService.sortToDos(ToDoService.formatToDos(myToDos))

        })

    }

    static addToDo = (req, res) => {
        const requestDetails = req.body;
        const createDate = new Date();
        const randomID = generateRandomId(5);

        if (req.body.dueAt) {
            const dueDate = new Date(req.body.dueAt);
            Object.assign(requestDetails, { dueAt: dueDate.toISOString() })
        } else {
            req.body.dueAt = "NIL"
        }
        let toDoDetails = {
            ...requestDetails,
            id: randomID,
            completed: false,
            created: createDate.toISOString(),
            userId: req.user.id || null
        };
        ToDoService.createToDo(toDoDetails)
        const dataIndex = toDos.findIndex(todo => todo.id === randomID)
        return res.status(200).json({
            success: true,
            message: "To-Do Successfully Added",
            data: toDos[dataIndex]
        })
    }

    static getToDoDetails = (req, res) => {
        const foundToDo = ToDoService.getToDoById(req.params.id, req.user.id)

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
        const idIndex = ToDoService.getToDoIndex(req.params.id);
        const indexData = toDos[idIndex];

        if (!ToDoService.isMyToDo(req.params.id, req.user.id)) {
            return res.status(404).json({
                success: false,
                message: "You have no right to update this To-Do"
            })
        }

        if (req.body.dueDate) {
            const dueAt = new Date(req.body.dueAt);
            indexData.dueAt = dueAt.toISOString();
        }
        if (ToDoService.toDoCompleted(req.body.completed)) {
            indexData.completed = true;
        } else {
            indexData.completed = false;
        }
        indexData.name = req.body.name || indexData.name;
        const dataPath = path.join(process.cwd(), 'data.json');
        writeFileSync(dataPath, JSON.stringify(toDos, null, 4));
        res.status(200).json({
            success: true,
            message: "Update made Succesfully ",
            data: indexData
        })
    }

}


module.exports = ToDoController;