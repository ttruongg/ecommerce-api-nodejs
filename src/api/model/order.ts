import mongoose, { Schema } from "mongoose";


const OrderSchema = new Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem',
        require: true
    }],
    shippingAdress1: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    shippingAdress2: {
        type: mongoose.Schema.Types.String,
    },
    city: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    zip: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    country: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    phone: {
        type: mongoose.Schema.Types.String,
        require: true
    },
    status: {
        type: mongoose.Schema.Types.String,
        require: true,
        default: 'Pending'
    },
    totalPrice: {
        type: mongoose.Schema.Types.Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    dateOrdered: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    }


});

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

OrderSchema.set('toJSON', {
    virtuals: true
});

export const Order = mongoose.model('Order', OrderSchema);
