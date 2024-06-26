const OrderService = require('../services/OrderService')




const createOrder = async (req, res) => {
    const { paymentMethod, itemsPrice, user, totalPrice, fullName, address, phone, orderItems } = req.body
    console.log("data", orderItems)
    try {
        if (!paymentMethod || !itemsPrice || !totalPrice || !fullName || !address || !phone || !orderItems) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log("service", e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.getDetailsOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        console.log(data, orderId)
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}


const createCart = async (req, res) => {
    try {
        console.log("ddd", req.body)
        const response = await OrderService.createCart(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCart = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status().json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllCart(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            message: e
        })
    }
}

const updateCartStatus = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body.statusOrders
        // console.log("id", id, data)
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The id is required'
            })
        }
        const resp = await OrderService.updateCartStatus(id, data)
        return res.status(200).json(resp)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    createCart,
    getAllCart,
    updateCartStatus

}