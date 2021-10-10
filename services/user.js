const bcrypt = require("bcrypt")
const { User, Todo } = require("../config/connection");

class UserService {

    static async findUser(username) {
        return await User.findOne({ username }).exec()
    }

    static async fetchUserToDos(id) {
        return await Todo.find({
            "userId": id
        }).exec()
    }

    static async hashPassword(password, saltRounds) {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    };

    static async createUser(user) {
        var newUser = new User(user);
        const savedUser = await newUser.save()
        return savedUser;
    }

}

module.exports = UserService;