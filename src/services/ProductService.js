const Product = require('../models/ProductModel')



const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {

        const { name, image, type, price, countInStock, rating } = newProduct
        try {
            const checkProuct = await Product.findOne({
                name: name
            })
            if (checkProuct !== null) {
                resolve({
                    status: "ok",
                    message: "The product existed"
                })
            }
            const createProduct = await Product.create({
                name, image, type, price, countInStock, rating, ...newProduct
            })
            if (createProduct) {
                resolve({
                    status: "ok",
                    message: "success",
                    data: createProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// const updateProduct = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         console.log("id", id, "data", data)
//         try {
//             const checkProduct = await Product.findOne({
//                 _id: id
//             })
//             if (checkProduct === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The product is not defined'
//                 })
//             }

//             const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: updatedProduct
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        // console.log("data", data)
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'success',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'success',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[0]] = sort[1]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProductType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProductType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProductType,
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllProductType
}