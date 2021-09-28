const usersList = require("../users.json");

class userService {

    static findUser(username) {
        return usersList.find(user => username === user.username)
    }

    static userExist(username) {
        if (this.findUser(username)) {
            return true;
        }
    }

    static signedIn(id) {
        if (id) {
            return true
        }
    }

}

module.exports = userService;