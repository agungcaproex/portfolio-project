const router = require('express').Router()
const todoController = require('../controllers/todo-controller')


router.post('/create', todoController.create)
router.get('/search', todoController.findAll)
router.get('/search/:id', todoController.findById)
router.put('/update/:id', todoController.update)
router.delete('/delete/:id', todoController.delete)

module.exports = router