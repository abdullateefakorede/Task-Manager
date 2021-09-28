const allToDo = require("../data.json");
const { eachUserToDos } = require("../utils/common");


class editService {

    static isMyToDo(id, userId) {
        const toDo = allToDo.find(element => element.id === id);
        return toDo.userId === userId;
    }

    static getToDo(id, userId) {
        const myToDos = eachUserToDos(userId);
        return myToDos.filter(element => element.id === id);
    }

    static idIndex(id, userId) {
        const myToDos = eachUserToDos(userId);
        return myToDos.findIndex(element => element.id === id);
    }

    static dateExist(date) {
        if (date) return true
    }

    static toDoCompleted(completed) {
        if (completed === "yes" || completed === true) {
            return true
        }
        return false
    }
}

module.exports = editService;