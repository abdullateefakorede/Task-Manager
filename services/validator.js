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

            if (schema.hasOwnProperty("minLength") && valueLength < schema.minLength) {
                errors.push({
                    key,
                    type: "minLength",
                    message: `${key} should be of a minimum length ${schema.minLength}`
                })
            }
            if (schema.hasOwnProperty("minimum") && value < schema.minimum) {
                errors.push({
                    key,
                    type: "minimum",
                    message: `${key} should be of a minimum value ${schema.minimum}`
                })
            }

            if (schema.hasOwnProperty("maxLength") && valueLength > schema.maxLength) {
                errors.push({
                    key,
                    type: "maxLength",
                    message: `${key} should be of a maximum length ${schema.maxLength}`
                })
            }
            if (schema.hasOwnProperty("maximum") && value > schema.maximum) {
                errors.push({
                    key,
                    type: "maximum",
                    message: `${key} should be of a maximum value ${schema.maximum}`
                })
            }

            if (schema.hasOwnProperty("greater_than") && value < schema.greater_than) {
                errors.push({
                    key,
                    type: "greater_than",
                    message: `${key} should be greater than ${schema.greater_than}`
                })
            }
            if (schema.hasOwnProperty("less_than") && value > schema.less_than) {
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

                if (schema.hasOwnProperty("format")) {
                    if ( schema.format === "email") {
                        const regEx = new RegExp("[a-z]+@\gmail\+.[a-z]{3}");
                        if (!regEx.test(value)) {
                                errors.push({
                                key,
                                type: "format",
                                essage: `${key} should be a valid email address`
                             })
                        }
                    }

                    if ( schema.format === "date" || schema.format === "datetime") {
                        const dateInstance = new Date(value);
                        if (isNaN(dateInstance)) {
                                errors.push({
                                key,
                                type: "format",
                                essage: `${key} should be a valid ${schema.format}`
                             })
                        }
                    }
                }
        }
        return {
            success: errors.length === 0,
            errors
        }
    }
}

module.exports = Validator;