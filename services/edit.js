const allToDo = require("../data.json");
const UserService = require("./user");


class EditService {

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

module.exports = EditService;