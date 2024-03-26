const express = require("express");
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const OrderController = require('../controllers/OrderController');


router.post('/create/:id', authMiddleware.authUserMiddleware, OrderController.createOrder)
router.get('/get-all-order/:id', authMiddleware.authUserMiddleware, OrderController.getAllOrderDetails)
router.get('/get-detail-order/:id', authMiddleware.authUserMiddleware, OrderController.getDetailsOrder)
router.put('/cancel-order/:id', authMiddleware.authUserMiddleware, OrderController.cancelOrderDetails)
router.get('/get-all-order', authMiddleware.authMiddleware, OrderController.getAllOrder)

router.post('/create-cart/:id', authMiddleware.authUserMiddleware, OrderController.createCart)
router.get('/get-all-cart/:id', authMiddleware.authUserMiddleware, OrderController.getAllCart)
router.put('/update-cart-status/:id', authMiddleware.authUserMiddleware, OrderController.updateCartStatus)
module.exports = router