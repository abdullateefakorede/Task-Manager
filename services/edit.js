const allToDo = require("../data.json");
class editService {

    static getToDo(id) {
        return allToDo.filter(element => element.id === id);
    }

    static idIndex(id) {
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

module.exports = editService;