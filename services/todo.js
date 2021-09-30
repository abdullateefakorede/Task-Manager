class ToDoService {

    static isToDoComplete = (complete) => complete ? 'Yes' : 'No'

    static sortToDos(toDos) {
        return toDos.sort((a) => {
            if (a.completed) {
                return 1;
            }
            if (!a.completed) {
                return -1;
            }
            return 0;
        })

    }
}

module.exports = ToDoService;