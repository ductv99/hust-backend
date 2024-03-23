const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const gennerateToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30m' })
    return access_token
}

const gennerateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERR",
                        message: 'the authentication'
                    })
                }
                const access_token = await gennerateToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })

                resolve({
                    status: "success",
                    message: "SUCCES",
                    access_token
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    gennerateToken,
    gennerateRefreshToken,
    refreshTokenJwtService
}
