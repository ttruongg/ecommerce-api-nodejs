import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    icon: {
        type: mongoose.Schema.Types.String
    },
    color: {
        type: mongoose.Schema.Types.String
    }
})