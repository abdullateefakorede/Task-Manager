const userAuth = require('./user')
const todos = require('./todos')
const Auth = require('../middlewares/authenticate')

exports.registerRoute = (app) => {

    app.use('/user', userAuth)
    app.use('/todos', Auth.authenticate, todos)

}