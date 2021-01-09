if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const todoRouter = require('./routes')
const authRouter = require('./routes/auth')
const weatherRouter = require('./routes/weather')
const {authentication} = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandlers')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: false}))

app.use('/', authRouter)
app.use(authentication)
app.use('/weather', weatherRouter)
app.use('/todo', todoRouter)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`listen on port ${port}`);
})