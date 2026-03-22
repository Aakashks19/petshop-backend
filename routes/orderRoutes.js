const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/user', auth, orderController.getUserOrders);
router.get('/admin', auth, adminAuth, orderController.getAllOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', auth, adminAuth, orderController.updateOrderStatus);

module.exports = router;
