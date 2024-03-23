const express = require("express");
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const productController = require('../controllers/ProductController');


router.post('/create', productController.createProduct)
router.put('/update/:id', authMiddleware.authMiddleware, productController.updateProduct)
router.get('/get-details/:id', productController.getDetailsProduct)
router.delete('/delete/:id', authMiddleware.authMiddleware, productController.deleteProduct)
router.get('/get-all', productController.getAllProduct)
router.post('/delete-many', authMiddleware.authMiddleware, productController.deleteManyProduct)
router.get('/get-all-type', productController.getAllProductType)




module.exports = router