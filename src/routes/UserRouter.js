const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const auth = require('../middleware/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/log-out', userController.logoutUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', auth.authUserMiddleware, userController.updateUser)
router.delete('/delete-user/:id', auth.authMiddleware, userController.deleteUser)
router.get('/get-all', auth.authMiddleware, userController.getAllUser)
router.get('/get-details/:id', auth.authUserMiddleware, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many', auth.authMiddleware, userController.deleteManyUser)


module.exports = router

