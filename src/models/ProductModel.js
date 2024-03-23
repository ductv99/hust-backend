const mongoose = require('mongoose')





const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: [String], required: true },
        type: { type: String, required: true },
        // size: { type: Number, required: true },
        price: { type: Number, required: true },
        importPrice: { type: Number, required: true },
        // countInStock: { type: Number, required: true },
        countInStock: [
            {
                color: { type: String, required: true },
                sizes: [
                    {
                        size: { type: String, required: true },
                        quantity: { type: Number, required: true },
                    },
                ],
            },
        ],
        rating: { type: Number, required: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
