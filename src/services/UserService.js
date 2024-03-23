const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { gennerateToken, gennerateRefreshToken } = require('./JwtService')
const { sendEmailCreateAccout } = require('./EmailService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Tài khoản này đã tồn tại"
                })
            }
            const hash = bcrypt.hashSync(password, 10)

            const createUser = await User.create({
                name, email, password: hash, phone
            })
            if (createUser) {
                await sendEmailCreateAccout(email, password)
                resolve({
                    status: 'success',
                    message: 'success',
                    data: createUser
                })

            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
const loginUser = (UserLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = UserLogin
        // console.log(email, password)

        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser == null) {
                resolve({
                    status: "ERR",
                    message: "Tài khoản này không tồn tại!"
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "Mật khẩu không chính xác!",
                })
            }
            const access_token = await gennerateToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await gennerateRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: "success",
                message: "Success",
                access_token,
                refresh_token
            })
        } catch (error) {
            reject(error)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        // console.log("data", data)
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "user is not existed"
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "success",
                message: "Success",
                data: updatedUser
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "user is not existed"
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: "success",
                message: "deleted success",
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids })
            resolve({
                status: "success",
                message: "deleted success",
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "ok",
                message: "all product",
                data: allUser
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: "ok",
                    message: "user is not existed"
                })
            }
            resolve({
                status: "ok",
                message: "success",
                data: user
            })
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
}