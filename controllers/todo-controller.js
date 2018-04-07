const Todo = require('../models/todo')

module.exports = {
    create: (req, res) => {
        let addTodo = new Todo({
            task: req.body.task,
            list: req.body.list,
            status: req.body.status,
            userId: req.body.userId
        })
        
        addTodo.save()
        .then(response => {
            res.status(200).json({
                message: 'Add Data Success',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Add Data Error!',
                error: err
            })
        })
    },

    findAll: (req, res) => {
        Todo.find()
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'Get Data Success',
                data: response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get Data Error',
                error: err
            })
        })
    }
}