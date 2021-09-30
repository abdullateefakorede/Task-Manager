const express = require('express');
const app = express();
const { writeFileSync } = require("fs");
const path = require('path');
const usersList = require("../users.json");
const userService = require("../services/user");
const { generateRandomId } = require("../utils/common");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'Your Secret Key',
    resave: false,
    saveUninitialized: false
}));

class UserController {

    static signIn(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.findUser(username);

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password!"
            })
        }

        if (user && user.password === password) {
            req.session.userId = user.id;
            return res.status(200).json({
                success: true,
                message: "Login Successful!"
            })
        }
    }


    static signUp(req, res) {
        const username = req.body.username;
        const randomID = generateRandomId(4);
        if (userService.userExist(username)) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist! Try A Unique Username"
            })
        }
        const newUser = {
            ...req.body,
            id: randomID
        };
        usersList.push(newUser);
        const dataPath = path.join(process.cwd(), 'users.json')
        writeFileSync(dataPath, JSON.stringify(usersList, null, 4))
        res.status(200).json({
            success: true,
            message: "Signup Successful"
        })
    }

    static signout(req, res) {
        req.session.destroy(function() {
            console.log("user logged out.")
            return res.status(200).json({
                success: true,
                message: "You have successfully logged out"
            })
        });
    }
}


module.exports = UserController;