const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json())
app.use(cookieParser())
routes(app)




mongoose.connect(`${process.env.MONGO_DB_CONNECT}`)
    .then(() => {
        console.log('connect to mongodb success!')
    })
    .catch((error) => {
        console.error(error)
    })

app.listen(port, () => {
    console.log('server is running: ', +port)
})