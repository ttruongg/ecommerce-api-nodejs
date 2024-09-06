import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    isAdmin: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    street: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    apartment: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    city: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    zip: {
        type: mongoose.Schema.Types.String,
        default: ''
    },
    country: {
        type: mongoose.Schema.Types.String,
        default: ''
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
})

export const User = mongoose.model('user', userSchema);
