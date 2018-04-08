const router = require('express').Router()
const todoController = require('../controllers/todo-controller')
const auth = require('../middlewares/auth')

router.get('/', todoController.findAll)
router.post('/create', auth.check, todoController.create)

module.exports = router