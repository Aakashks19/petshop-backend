const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    products: [{
        petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
        quantity: { type: Number, default: 1 },
        price: { type: Number }
    }],
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryDate: { type: Date },
    paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
    orderStatus: { type: String, enum: ['Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
