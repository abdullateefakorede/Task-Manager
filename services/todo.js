class toDoService {

    static formatComplete = (complete) => complete ? 'Yes' : 'No'

    static formatArray(array) {
        const trueArray = array.filter(element => element.completed === true)
        const falseArray = array.filter(element => element.completed === false)
        return falseArray.concat(trueArray);
    }
}

module.exports = toDoService;