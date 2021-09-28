const allToDo = require("../data.json")

function randomFunction(value) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < value; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function eachUserToDos(id) {
    return allToDo.filter(user => user.userId === id)
}

exports.randomFunction = randomFunction;
exports.eachUserToDos = eachUserToDos;