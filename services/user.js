const usersList = require("../users.json");
const allToDo = require("../data.json");
const bcrypt = require("bcrypt")
const { writeFileSync } = require("fs");
const path = require('path');
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/", () => {
    console.log("Database connection successful");
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    birthdate: Date,
    nationality: String,
    id: String
})

const toDoSchema = new mongoose.Schema({
    name: String,
    dueAt: Date,
    created: Date,
    completed: Boolean,
    id: String,
    userId: String
})

const users = mongoose.model("users", userSchema)
const toDos = mongoose.model("toDos", toDoSchema)

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

    static async hashPassword(password, saltRounds) {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    };

    static createUser(newUser) {
        usersList.push(newUser);
        const dataPath = path.join(process.cwd(), 'users.json')
        writeFileSync(dataPath, JSON.stringify(usersList, null, 4))
    }

}

module.exports = UserService;