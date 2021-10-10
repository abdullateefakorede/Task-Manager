const bcrypt = require("bcrypt")
const userService = require("../services/user");
const { generateRandomId } = require("../utils/common");
const TokenService = require("../services/token");

class UserController {

    static async signIn(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userService.findUser(username);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password!"
            })
        }
        const data = { username: user.username, id: user.id }
        const token = TokenService.generateToken({ user: data })
        const decoded = TokenService.decodeToken(token)
        req.user = user;
        return res.status(200).json({
            success: true,
            message: "Login Successful!",
            data: {
                token,
                user: data
            }
        })
    }

    static async signUp(req, res) {
        const username = req.body.username;
        const password = await userService.hashPassword(req.body.password, 10)
        const randomID = generateRandomId(4);
        if (await userService.findUser(username)) {
            return res.status(401).json({
                success: false,
                message: "User Already Exist! Try A Unique Username"
            })
        }
        const newUser = {
            ...req.body,
            password: password,
            id: randomID
        };
        userService.createUser(newUser)
        res.status(200).json({
            success: true,
            message: "Signup Successful"
        })
    }

    static signout(req, res) {
        req.user = "";
        console.log("user logged out.")
        return res.status(200).json({
            success: true,
            message: "You have successfully logged out"
        })
    }
}


module.exports = UserController;