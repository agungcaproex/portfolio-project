const Todo = require('../models/todo')


module.exports = {
    create: (req, res) => {
        console.log(req.decoded)
        Todo.create({
            task: req.body.task,
            list: req.body.list,
            status: req.body.status,
            userId: req.decoded.userId
        })
        .then(dataTodo => {
            res.status(200).json({
                message: 'Add Data Success',
                data: dataTodo
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
        Todo.find({
            userId: req.decoded.userId
        })
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
    },

    findById: (req, res) => {
        Todo.findById(req.params.id)
        .exec()
        .then(dataTodo => {
            res.status(200).json({
                message: 'Get Data Success',
                data: dataTodo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get Data Error',
                error: err
            })
        })
    },

    update: (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, {
            task: req.body.task,
            list: req.body.list,
            userId: req.decoded.id
        })
        .then(dataTodo => {
            res.status(200).json({
                message: 'Update Data Success',
                data: dataTodo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Update Data Failed',
                error: err
            })
        })
    },

    delete: (req, res) => {
        console.log(req.decoded)
        Todo.findByIdAndRemove(req.params.id)
        .then(dataTodo => {
            res.status(200).json({
                message: 'Delete Data Success',
                data: dataTodo
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Delete Data Failed',
                error: err
            })
        })
    }
}