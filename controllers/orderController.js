const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const order = new Order({
        ...req.body,
        userId: req.user._id
    });
    try {
        await order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('userId', 'name email phone')
            .populate({ path: 'products.petId', model: 'Pet' })
            .sort({ createdAt: -1 });
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getOrderById = async (req, res) => {
    try {
        console.log('Fetching order:', req.params.id);
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name email phone')
            .populate({ path: 'products.petId', model: 'Pet' });

        if (!order) {
            console.log('Order not found in DB');
            return res.status(404).send({ message: 'Order not found' });
        }

        console.log('Order found. User ID:', order.userId?._id, 'Req User ID:', req.user?._id);

        // Ensure user can only view their own order (unless admin)
        const orderUserId = order.userId?._id?.toString() || order.userId?.toString();
        const reqUserId = req.user?._id?.toString();

        if (orderUserId !== reqUserId && req.user.role !== 'admin') {
            console.log('Unauthorized access attempt');
            return res.status(403).send({ message: 'Unauthorized' });
        }

        res.send(order);
    } catch (e) {
        console.error('Error fetching order:', e);
        res.status(500).send(e);
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('userId', 'name email phone')
            .populate({ path: 'products.petId', model: 'Pet' })
            .sort({ createdAt: -1 });
        res.send(orders);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
        if (!order) return res.status(404).send();
        res.send(order);
    } catch (e) {
        res.status(400).send(e);
    }
};
