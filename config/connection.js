const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, () => {
    console.log("Database connection successful");
})

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    birthdate: Date,
    nationality: String,
    id: String
})

const toDosSchema = new mongoose.Schema({
    name: String,
    dueAt: Date,
    created: Date,
    completed: Boolean,
    id: String,
    userId: String
})

const User = mongoose.model("users", usersSchema)
const Todo = mongoose.model("todos", toDosSchema)

module.exports = { User, Todo }