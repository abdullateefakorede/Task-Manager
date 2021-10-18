const Validator = require("../services/validator");
const { addTodoSchema, signInSchema, signUpSchema } = require("../utils/schemas");

class Validators {

    static toDo = (req, res, next) => {
        const {success, errors} = Validator.validate(req.body, addTodoSchema)
        const dueAt = new Date(req.body.dueAt) || Date.now();

        if (dueAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Sorry, Input a future date"
            })
        }

        if (!success) {
            return res.status(400).json({
                success,
                message: "Validation Error",
                data: {errors}
            })
        }
        next();
    }

    static signin(req, res, next) {
        const {success, errors} = Validator.validate(req.body, signInSchema)

        if (!success) {
            return res.status(400).json({
                success,
                message: "Validation Error",
                data: {errors}
            })
        }
        next();
    }

    static signup(req, res, next) {
        const {success, errors} = Validator.validate(req.body, signUpSchema)
        if (!success) {
            return res.status(400).json({
                success,
                message: "Validation Error",
                data: {errors}
            })
        }
        next();
    }

}

module.exports = Validators;