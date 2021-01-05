const router = require('express').Router()
const Controller = require('../controllers/todoController') 
const { authorize } = require('../middlewares/auth')

router.get('/', Controller.showToDo)
router.get('/:id', authorize, Controller.getById)
router.post('/', Controller.addToDo)
router.put('/:id', authorize, Controller.editToDo)
router.patch('/:id', authorize, Controller.markToDo)
router.delete('/:id', authorize, Controller.deleteToDo)

module.exports = router