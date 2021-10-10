const ToDoService = require("../services/todo");
const { generateRandomId } = require("../utils/common");
const UserService = require("../services/user");

class ToDoController {

    static allToDo = async(req, res) => {
        const myToDos = await UserService.fetchUserToDos(req.user.id);

        if (!req.user.id) {
            return res.status(404).json({
                success: false,
                message: "Please login!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fetching Suuccesful",
            data: ToDoService.sortToDos(myToDos)

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
        return res.status(200).json({
            success: true,
            message: "To-Do Successfully Added",
            data: toDoDetails
        })
    }

    static getToDoDetails = (req, res) => {
        const foundToDo = ToDoService.getToDoById(req.params.id)

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

    static editToDo = async(req, res) => {
        const todo = await ToDoService.getToDoById(req.params.id);

        if (todo <= 0) {
            return res.status(404).json({
                success: false,
                message: "Invalid ToDo Id"
            })
        }

        if (!await ToDoService.isMyToDo(req.params.id, req.user.id)) {
            return res.status(404).json({
                success: false,
                message: "You have no right to update this To-Do"
            })
        }

        if (req.body.dueDate) {
            const dueAt = new Date(req.body.dueAt);
            todo[0].dueAt = dueAt.toISOString();
        }
        if (req.body.completed) {
            todo[0].completed = true;
        } else {
            todo[0].completed = false;
        }
        todo[0].name = req.body.name || todo[0].name;
        await ToDoService.updateToDoById(req.params.id, todo[0]);
        res.status(200).json({
            success: true,
            message: "Update made Succesfully ",
            data: todo
        })
    }

}


module.exports = ToDoController;