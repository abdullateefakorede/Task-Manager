class addService {
    static addToDoVerified(name, date) {
        if (!name || (date < Date.now())) {
            return false;
        }
        return true
    }

    static dateExist(date) {
        if (date) return true
    }
}


module.exports = addService;