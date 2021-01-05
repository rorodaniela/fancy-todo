const router = require('express').Router()
const Controller = require('../controllers/todoController') 

router.get('/', Controller.showToDo)
router.get('/:id', Controller.getById)
router.post('/', Controller.addToDo)
router.put('/:id', Controller.editToDo)
router.patch('/:id', Controller.markToDo)
router.delete('/:id', Controller.deleteToDo)

module.exports = router