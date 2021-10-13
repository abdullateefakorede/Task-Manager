const userSchema = {
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
    "age": {
        "type": "number",
        "required": true,
        "minimum": 4,
        "maximum": 5,
        // "greater_than": 13,
        // "less_than": 12
    },
    "email": {
        "required": true,
        "type": "string",
        "pattern": new RegExp("[a-z]+@\gmail\+.[a-z]{3}"),
        "allow_blank": false
    }
}


class Validator {
    static validate(data, dataSchema) {
        /**
         * data = {"username": "hassan", "password": "password", "age": 19}
         */
        const errors = []

        for (const key in dataSchema) {
            const schema = dataSchema[key]

            if (schema.required === true && data.hasOwnProperty(key) === false) {
                errors.push({
                    key,
                    type: "required",
                    message: `${key} is required`
                })
            }

        }

        for (const key in data) {
            const schema = dataSchema[key]


            if (!schema) {
                continue
            }

            const value = data[key]
            const valueType = typeof(value)
            const valueLength = value.length

            if (valueType !== schema.type) {
                errors.push({
                    key,
                    type: "type",
                    message: `${key} should be a ${schema.type}, not ${valueType}`
                })
            }

            if (valueLength < schema.minLength) {
                errors.push({
                    key,
                    type: "minLength",
                    message: `${key} should be of a minimum length ${schema.minLength}`
                })
            }
            if (value < schema.minimum) {
                errors.push({
                    key,
                    type: "minimum",
                    message: `${key} should be of a minimum value ${schema.minimum}`
                })
            }

            if (valueLength > schema.maxLength) {
                errors.push({
                    key,
                    type: "maxLength",
                    message: `${key} should be of a maximum length ${schema.maxLength}`
                })
            }
            if (value > schema.maximum) {
                errors.push({
                    key,
                    type: "maximum",
                    message: `${key} should be of a maximum value ${schema.maximum}`
                })
            }

            if (value < schema.greater_than) {
                errors.push({
                    key,
                    type: "greater_than",
                    message: `${key} should be greater than ${schema.greater_than}`
                })
            }
            if (value > schema.less_than) {
                errors.push({
                    key,
                    type: "less_than",
                    message: `${key} should be less than ${schema.less_than}`
                })
            }

            if (schema.allow_blank === false && !value) {
                errors.push({
                    key,
                    type: "allow_blank",
                    message: `${key} should not be empty`
                })
            }

            if (key === "email") {
                if (!schema.pattern.test(value)) {
                    errors.push({
                        key,
                        type: "pattern",
                        message: `${key} should be a valid email address`
                    })
                }
            }

        }

        console.log(errors)
    }
}


Validator.validate({ "username": "hassan", "email": "ade@gmail.com", "password": "hassan1", "age": 5 }, userSchema)


module.exports = Validator;