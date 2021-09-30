const express = require("express");
const { registerRoute } = require("./routes/registerRoute");
const app = express();

registerRoute(app);

app.listen(process.env.PORT || 3001, function() {
    console.log(`Your server is running on ${process.env.PORT || 3001}`);
})