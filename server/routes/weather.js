const router = require('express').Router()
const Controller = require('../controllers/weatherController') 

router.get('/', Controller.weather)


module.exports = router