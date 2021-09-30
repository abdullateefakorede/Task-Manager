class Auth {

    static authenticate(req, res, next) {
        if (!req.session.userId) {
            return res.status(401).json({
                message: 'Not authenticated',
                success: false,
                data: null
            })
        }

        return next()
    }

}

module.exports = Auth;