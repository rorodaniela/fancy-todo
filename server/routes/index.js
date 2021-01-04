const router = require('express').Router()
const Controller = require('../controllers/controller') 

router.get('/', Controller.showToDo)
router.post('/', Controller.addToDo)
router.put('/', Controller.editToDo)
router.delete('/', Controller.deleteToDo)

module.exports = router