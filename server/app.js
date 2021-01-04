const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false}))
app.use('/todo', router)

app.listen(port, ()=> {
    console.log(`listen on port ${port}`);
})