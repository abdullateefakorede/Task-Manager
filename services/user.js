const usersList = require("../users.json");
const allToDo = require("../data.json");

class UserService {

    static findUser(username) {
        return usersList.find(user => username === user.username)
    }

    static userExist(username) {
        if (this.findUser(username)) {
            return true;
        }
    }

    static fetchUserToDos(id) {
        return allToDo.filter(user => user.userId === id)
    }

}

module.exports = UserService;