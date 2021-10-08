const jwt = require("jsonwebtoken");
const { secret } = require("../config/config")

class TokenService {
    static generateToken(data) {
        return jwt.sign(data, secret)
    }

    static decodeToken(token) {
        return jwt.verify(token, secret)
    }

}

module.exports = TokenService;