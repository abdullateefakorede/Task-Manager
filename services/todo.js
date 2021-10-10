const { Todo } = require("../config/connection");

class ToDoService {

    static isToDoComplete = (complete) => complete ? 'Yes' : 'No'

    static sortToDos(todos) {
        return todos.sort((a) => {
            if (a.completed) {
                return 1;
            }
            if (!a.completed) {
                return -1;
            }
            return 0;
        })
    }

    static addToDoVerified(name, date) {
        if (!name || (date < Date.now())) {
            return false;
        }
        return true
    }

    static async isMyToDo(id, userId) {
        const toDo = await Todo.find({ id }).exec();
        return toDo[0].userId === userId;
    }

    static getToDoById(id) {
        return Todo.where({ id });
    }

    static async updateToDoById(id, todo) {
        return await Todo.updateOne({ id }, todo).exec();
    }

    static async createToDo(todo) {
        var newTodo = new Todo(todo);
        const savedTodo = await newTodo.save()
        return savedTodo;
    }

    static formatToDos(todos) {
        return todos.map(todo => {
            var formatTodo = {...todo }
            delete formatTodo.userId
            return formatTodo
        })
    }
}

module.exports = ToDoService;