import mongoose from "mongoose";

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
    },
    color: {
        isString: {
            errorMessage: "color must be a string",
        }
    }

};

export const product_Schema = {
    name: {
        isString: {
            errorMessage: "Name should be a string",
        },
        notEmpty: {
            errorMessage: "Name cannot empty",
        }
    },
    description: {
        isString: {
            errorMessage: "Description should be a string",
        },
        notEmpty: {
            errorMessage: "Description cannot empty",
        },
    },
    richDescription: {
        isString: {
            errorMessage: "richDescription should be a string",
        },

    },
    image: {
        isString: {
            errorMessage: "The url of image should be a string",
        }
    },
    images: {
        isString: {
            errorMessage: "images should be a string",
        },
        optional: true,
    },
    brand: {
        isString: {
            errorMessage: "brand name should be a string",
        },
        optional: true,
    },
    price: {
        isFloat: {
            errorMessage: "Price must be a number",
            options: { min: 0 },
        },
        toFloat: true,
    },
    category: {
        notEmpty: {
            errorMessage: "category cannot empty",
        },
        custom: {
            options: (value: string) => mongoose.Types.ObjectId.isValid(value),
            errorMessage: "Invalid category ID",
        }
    },
    countInStock: {
        isInt: {
            errorMessage: "Count In Stock must be an integer between 0 and 250",
            options: { min: 0, max: 250 },
        },
        toInt: true,
        notEmpty: {
            errorMessage: "Count In Stock cannot empty",
        },
    },
    rating: {
        optional: true,
        isFloat: {
            errorMessage: "rating is a number",
        },
        toFloat: true
    },
    isFeatured: {
        isBoolean: {
            errorMessage: "isFeatured must be a boolean value",
        },
        optional: true,
    },
    dateCreated: {
        optional: true,
    }


}