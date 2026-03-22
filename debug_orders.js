const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');

async function checkOrders() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const orders = await Order.find().limit(5);
        console.log('Sample Orders:', JSON.stringify(orders, null, 2));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkOrders();
