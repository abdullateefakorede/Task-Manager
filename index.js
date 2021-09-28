const express = require("express");
const app = express();
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const todos = require('./routes/todos')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require('multer');
const userController = require("./controllers/usercontroller");
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'Your Secret Key',
    resave: false,
    saveUninitialized: false
}));

app.use('/signin', signin)
app.use('/signup', signup)
app.use('/todos', todos)
app.post('/signout', userController.signout)

app.listen(process.env.PORT || 3001, function() {
    console.log(`Your server is running on ${process.env.PORT || 3001}`);
})