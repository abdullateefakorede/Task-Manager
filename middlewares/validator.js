const ToDoService = require("../services/todo");

class validators {

    static toDo = (req, res, next) => {
        const dueAt = new Date(req.body.dueAt) || Date.now();
        const name = req.body.name;

        if (!ToDoService.addToDoVerified(name, dueAt)) {
            return res.status(400).json({
                success: false,
                message: "Sorry, make sure your inputs are valid"
            })
        }

        if (Object.keys(req.body).length === 2) {
            if (!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("dueAt")) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Object Keys"
                })
            }
        }

        if (Object.keys(req.body).length === 1) {
            if (!req.body.hasOwnProperty("name")) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Object Keys"
                })
            }
        }

        next();
    }

    static signin(req, res, next) {

        if (Object.keys(req.body).length > 2 || !req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Keys Submitted"
            })
        }
        next();
    }

    static signup(req, res, next) {

        if (Object.keys(req.body).length > 5 || !req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("birthdate") || !req.body.hasOwnProperty("nationality")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Keys Submitted"
            })
        }
        next();
    }

}

module.exports = validators;