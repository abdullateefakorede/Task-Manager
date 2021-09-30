const express = require("express");
const userAuth = require('./user')
const todos = require('./todos')
const Auth = require('../middlewares/authenticate')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require('multer');
const upload = multer();

exports.registerRoute = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(upload.array());
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET || 'Your Secret Key',
        resave: false,
        saveUninitialized: false
    }));

    app.use('/user', userAuth)
    app.use('/todos', Auth.authenticate, todos)

}