if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const todoRouter = require('./routes')
const authRouter = require('./routes/auth')
const {authentication} = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandlers')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false}))
app.use('/', authRouter)
app.use(authentication)
app.use('/todo', todoRouter)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`listen on port ${port}`);
})