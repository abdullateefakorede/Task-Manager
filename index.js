require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const { registerRoute } = require("./routes/registerRoute");
const app = express();
const multer = require('multer');
const upload = multer();
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

registerRoute(app);

app.listen(process.env.PORT || 3001, function() {
    console.log(`Your server is running on ${process.env.PORT || 3001}`);
})

module.exports = app;