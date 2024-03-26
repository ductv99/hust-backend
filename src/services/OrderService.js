const e = require("express")
const Order = require("../models/OrderProduct")
const Cart = require("../models/CartModel")
const Product = require("../models/ProductModel")
const EmailService = require('../services/EmailService')
const { isValidObjectId } = require("mongoose")


const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, orderItems, user, isPaid, paidAt, email } = newOrder
        // console.log('user', user)
        try {
            const promises = orderItems.map(async (order) => {
                // console.log(typeof (order.amount))
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    'countInStock.color': order.color,
                    'countInStock.sizes.size': order.size,
                    'countInStock.sizes.quantity': { $gte: order.amount }
                }, {
                    $inc: {
                        'countInStock.$[elem].sizes.$[sizeElem].quantity': -order.amount,
                        selled: +order.amount
                    }
                }, {
                    new: true,
                    arrayFilters: [
                        { 'elem.color': order.color },
                        { 'sizeElem.size': order.size }
                    ]
                })
                if (productData) {
                    return {
                        status: 'success',
                        message: 'success'
                    }
                } else {
                    return ({
                        status: "ERR",
                        message: "something wrong in the create order",
                        id: order.product
                    })
                }
            })

            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: "ERR",
                    message: `San pham id ${arrId.join(',')} khong du hang`
                })
            } else {
                const createOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })
                if (createOrder) {
                    // console.log("mail", email)
                    await EmailService.sendEmailCreateOrder(email, orderItems)

                    resolve({
                        status: 'success',
                        message: 'success'
                    })
                }
            }

        } catch (error) {
            // console.log("results", error)
            reject(error)
        }
    })
}


const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        // console.log("id", id)
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}



const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate({
                    _id: order.product,
                    'countInStock.color': order.color,
                    'countInStock.sizes.size': order.size,
                    'countInStock.sizes.quantity': { $gte: order.amount }
                }, {
                    $inc: {
                        'countInStock.$[elem].sizes.$[sizeElem].quantity': +order.amount,
                        selled: -order.amount
                    }
                }, {
                    new: true,
                    arrayFilters: [
                        { 'elem.color': order.color },
                        { 'sizeElem.size': order.size }
                    ]
                })
                if (productData) {
                    order = await Order.findOneAndUpdate(
                        { _id: id },
                        {
                            statusOrder: 3
                        },
                        {
                            new: true
                        }

                    )
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}



const createCart = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { user, orderItems } = newOrder
        console.log(user)
        try {
            await Cart.deleteMany({ user: user });
            await Cart.create({
                orderItems,
                user: user
            })
            resolve({
                status: 'success',
                message: 'success'
            })

        } catch (error) {
            // console.log("results", error)
            reject(error)
        }
    })
}


const getAllCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Cart.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateCartStatus = (id, data) => {
    return new Promise(async (resolve, reject) => {
        console.log("data", data)
        try {
            const checkUser = await Order.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "user is not existed"
                })
            }
            const updateStatus = await Order.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "success",
                message: "Success",
                data: updateStatus
            })
        } catch (error) {
            reject(error)
        }
    })
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