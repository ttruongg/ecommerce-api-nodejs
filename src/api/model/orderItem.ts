import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
    quantity: {
        type: mongoose.Schema.Types.Number,
        require: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    }
});

export const OrderItem = mongoose.model("orderItem", OrderItemSchema);