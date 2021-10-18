exports.addTodoSchema = {
    "name": {
        "required": true,
        "type": "string",
        "minLength": 4,
        "allow_blank": false,
    },
    "dueAt": {
        "required": false,
        "type": "string",
        "minLength": 8,
        "format": "datetime",
        "allow_blank": true
    }
}

exports.signInSchema = {
    "username": {
        "required": true,
        "type": "string",
        "minLength": 4,
        "maxLength": 15,
        "allow_blank": false,
    },
    "password": {
        "required": true,
        "type": "string",
        "minLength": 7,
        "maxLength": 15,
        "allow_blank": false,
    }
}

exports.signUpSchema = {
    "username": {
        "required": true,
        "type": "string",
        "minLength": 4,
        "maxLength": 15,
        "allow_blank": false,
    },
    "password": {
        "required": true,
        "type": "string",
        "minLength": 7,
        "maxLength": 15,
        "allow_blank": false,
    },
    "fullname": {
        "required": true,
        "type": "string",
        "minLength": 8,
        "allow_blank": false,
    },
    "birthdate": {
        "type": "string",
        "required": true,
        "format": "date",
        "minLength": 8,
        "allow_blank": false
    },
    "nationality": {
        "required": true,
        "type": "string",
        "minLength": 4,
        "allow_blank": false,
    }
}
