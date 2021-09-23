const { writeFileSync } = require("fs");
const path = require('path');
const usersList = require("../users.json");
const userService = require("../services/user");

class userController {

    static signIn(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const user = userService.findUser(username);

        if (!user || (username !== user.username || user.password !== password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password!"
            })
        }

        if (user && (username === user.username && user.password === password)) {
            return res.status(200).json({
                success: true,
                message: "Login Successful!"
            })
        }



    }

    static signUp(req, res) {
        const username = req.body.username;

        if (userService.userExist(username)) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist! Try A A Unique Username"
            })
        }
        usersList.push(req.body);
        const dataPath = path.join(process.cwd(), 'users.json')
        writeFileSync(dataPath, JSON.stringify(usersList, null, 4))
        res.status(200).json({
            success: true,
            message: "Signup Successful"
        })
    }



    static signinValidator(req, res, next) {

        if (Object.keys(req.body).length > 2 || !req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Keys Submitted"
            })
        }
        next();
    }

    static signupValidator(req, res, next) {

        if (Object.keys(req.body).length > 5 || !req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("birthdate") || !req.body.hasOwnProperty("nationality")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Keys Submitted"
            })
        }
        next();
    }
}


module.exports = userController;