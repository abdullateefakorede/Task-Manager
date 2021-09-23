const express = require("express");
const app = express();
const add = require('./routes/add')
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require('multer');
const upload = multer();
const { toDoCallBack } = require('./controllers/toDoController')
const { toDoValidator } = require('./controllers/addController');
const editController = require("./controllers/editController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'Your Secret Key',
    resave: false,
    saveUninitialized: false
}));

app.use('/add', add)
app.use('/signin', signin)
app.use('/signup', signup)
app.get("/todo", toDoCallBack)
app.post("/todo", toDoCallBack)

app.get("/edit/:id", editController.getEdit)

app.post("/edit/:id", editController.toDoEdit)

app.listen(process.env.PORT || 3001)