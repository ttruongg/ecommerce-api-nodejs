export const addCategory_Validation_Schema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage:
                "Name must be at least 5 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Name cannot be empty",
        },
        isString: {
            errorMessage: "Name must be a string!",
        },
    },
    icon: {
        isString: {
            errorMessage: "icon must be a url",
        },
    }

}