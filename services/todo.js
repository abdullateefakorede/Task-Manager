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
        const toDo = allToDo.find(element => element.id === id);
        return toDo.userId === userId;
    }

    static getToDoById(id, userId) {
        const userToDos = UserService.fetchUserToDos(userId);
        return userToDos.filter(element => element.id === id);
    }

    static getToDoIndex(id) {
        return allToDo.findIndex(element => element.id === id);
    }

    static toDoCompleted(completed) {
        if (completed === "yes" || completed === true) {
            return true
        }
        return false
    }

    static createToDo(toDo) {
        toDos.push(toDo);
        const dataPath = path.join(process.cwd(), 'data.json')
        writeFileSync(dataPath, JSON.stringify(toDos, null, 4))
    }
}

module.exports = ToDoService;