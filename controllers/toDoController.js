const allToDo = require("../data.json");
const toDoService = require("../services/todo");

const toDoCallBack = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Fetching Suuccesful",
        data: toDoService.formatArray(allToDo)
    })

}


exports.toDoCallBack = toDoCallBack;