import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    richDescription: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    image: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    images: [{
        type: String
    }],

    brand: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    price: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    countInStock: {
        type: mongoose.Schema.Types.Number,
        require: true,
        min: 0,
        max: 250
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    isFeatured: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    }
});


export const product = mongoose.model("product", productSchema);