import { request, Request, Response } from "express";
import { Order } from "../model/order";
import { OrderItem } from "../model/orderItem";
import mongoose from "mongoose";


export const getAllOrders = async (request: Request, response: Response) => {
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

    if (!orderList)
        response.status(500).json({ sucess: false });

    response.send(orderList);

}

export const getOrderById = async (request: Request, response: Response) => {
    const order = await Order.findById(request.params.id)
        .populate('user', 'name')
        .populate({
            path: 'OrderItems', populate: {
                path: 'product', populate: 'category'
            }
        });

    if (!order)
        response.status(500).json({ sucess: false });

    response.send(order);

}

export const createOrder = async (request: Request, response: Response) => {

    const orderItemsIds = Promise.all(request.body.orderItems.map(async (orderItem: { quantity: number; product: mongoose.Schema.Types.ObjectId; }) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds;
    console.log(orderItemsIdsResolved);

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {

        const orderItem = await OrderItem.findById(orderItemId)
            .populate<{ product: { price: number } }>('product', 'price');

        if (!orderItem || !orderItem.product) {
            throw new Error(`Order item or product not found for ID: ${orderItemId}`);
        }


        const totalPrice = (orderItem.product.price ?? 0) * (orderItem.quantity ?? 0);
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: request.body.shippingAddress1,
        shippingAddress2: request.body.shippingAddress2,
        city: request.body.city,
        zip: request.body.zip,
        country: request.body.country,
        phone: request.body.phone,
        status: request.body.status,
        totalPrice: totalPrice,
        user: request.body.user,
    })
    order = await order.save();

    if (!order)
        return response.status(400).send('the order cannot be created!')

    response.send(order);
}

export const updateOrderStatus = async (request: Request, response: Response) => {

    try {
        const order = await Order.findByIdAndUpdate(
            request.params.id,
            {
                status: request.body.status
            },
            { new: true }
        )
        return order ?
            response.status(200).json({ order: order, msg: "updated successfully" }) :
            response.status(404).json({ msg: "order not found!" });
    } catch (error) {
        return response.status(400).json({ error: error });
    }

}

export const deleteOrder = (request: Request, response: Response) => {

    Order.findByIdAndDelete(request.params.id).then(async order => {
        if (order) {
            order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return response.status(200).json({ sucess: true, msg: "the order is deleted!" })
        } else {
            return response.status(404).json({ sucess: false, msg: "order not found!" })
        }
    }).catch(err => {
        return response.status(500).json({ sucess: false, error: err })
    })

}

export const totalSales = async (request: Request, response: Response) => {
    try {
        const total = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
        ]);

        if (!total || total.length === 0) {
            return response.status(400).send("No sales data available!");
        }

        return response.send({ totalSale: total[0].totalsales });
    } catch (error) {
        console.error("Error calculating total sales:", error);
        return response.status(500).send("Server error while calculating sales!");
    }
}

export const countOrders = async (request: Request, response: Response) => {
    const count = await Order.countDocuments();

    if (!count) {
        return response.status(500).send("No order found!");
    }

    return response.status(200).send({ NumOfOrders: count })

}

export const userOrder = async (request: Request, response: Response) => {
    const userOrderList = await Order.find({ user: request.params.userid })
        .populate({
            path: 'OrderItems', populate: {
                path: 'product', populate: 'category'
            }
        }).sort({ 'dateOrdered': -1 });

    if (!userOrderList)
        response.status(500).json({ sucess: false });

    response.send(userOrderList);
}