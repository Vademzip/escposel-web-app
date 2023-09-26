require('dotenv').config() //Чтобы express мог работать с переменными среды
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/error-middleware')
const fileUpload = require('express-fileupload')
const path = require('path')



app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials : true,
    origin : process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}


start()