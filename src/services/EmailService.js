const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> size: <b>${order.size}</b> màu: <b>${order.color}</b>  với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div><img src=${order.image}  width="150" height="150" alt="Product image"/></div>
      <div>Cảm ơn bạn rất nhiều</div>
    </div>`
    })

    const info = await transporter.sendMail({
        from: '"LD STORE" <duc.tvd99@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "LD STORE: Thông báo đặt hàng thành công", // Subject line
        text: "Cảm ơn bạn đã tin tưởng và đặt hàng tại LD STORE", // plain text body
        html: `<div><b>Thông tin đơn hàng</b></div>${listItem}`,// html body
    });

}


const sendEmailCreateAccout = async (email, password) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });



    const info = await transporter.sendMail({
        from: '"LD STORE" <duc.tvd99@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "LD STORE: Thông báo tạo tài khoản thành công", // Subject line
        text: "Chào mừng bạn đến với LD STORE", // plain text body
        html: `<div><b>Thông tin tài khoản của bạn</b></div>
            <div>
                <div>Tài khoản: ${email} </div>
                <div>Mật khẩu: ${password}</div>
                <div>Cảm ơn bạn rất nhiều</div>
             </div>`,// html body
    });

}


module.exports = {
    sendEmailCreateOrder,
    sendEmailCreateAccout
}