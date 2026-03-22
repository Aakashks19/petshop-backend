const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');
const User = require('./models/User');

async function debugOrderPopulation() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const order = await Order.findOne().populate('userId');
        if (!order) {
            console.log('No orders found');
            process.exit(0);
        }

        console.log('Order ID:', order._id);
        console.log('User ID field type:', typeof order.userId);
        console.log('User ID field:', JSON.stringify(order.userId, null, 2));

        if (order.userId && order.userId._id) {
            console.log('order.userId._id value:', order.userId._id);
            console.log('order.userId._id.toString():', order.userId._id.toString());
        } else {
            console.log('order.userId._id is MISSING');
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

debugOrderPopulation();
