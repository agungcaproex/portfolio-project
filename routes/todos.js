const router = require('express').Router()
const todoController = require('../controllers/todo-controller')

router.get('/', todoController.findAll)
router.post('/create', todoController.create)

module.exports = router