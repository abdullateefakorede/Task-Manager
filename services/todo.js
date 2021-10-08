const { writeFileSync } = require("fs");
const path = require('path');
const toDos = require("../data.json");

class ToDoService {

    static isToDoComplete = (complete) => complete ? 'Yes' : 'No'

    static sortToDos(toDos) {
        return toDos.sort((a) => {
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

    static isMyToDo(id, userId) {
        const toDo = toDos.find(element => element.id === id);
        return toDo.userId === userId;
    }

    static getToDoById(id, userId) {
        const userToDos = UserService.fetchUserToDos(userId);
        return userToDos.filter(element => element.id === id);
    }

    static getToDoIndex(id) {
        return toDos.findIndex(element => element.id === id);
    }

    static toDoCompleted(completed) {
        if (completed === "yes" || completed === true) {
            return true
        }
        return false
    }

    static createToDo(todo) {
        toDos.push(todo);
        const dataPath = path.join(process.cwd(), 'data.json')
        writeFileSync(dataPath, JSON.stringify(toDos, null, 4))
    }

    static formatToDos(todos) {
        return todos.map(todo => {
            var todos = {...todo }
            delete todos.userId
            return todos
        })
    }
}

module.exports = ToDoService;