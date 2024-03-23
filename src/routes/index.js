const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrdersRouter = require('./OrdersRouter')
const PaymentRouter = require('./PaymentRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/order', OrdersRouter)
    app.use('/api/payment', PaymentRouter)
}
module.exports = routes