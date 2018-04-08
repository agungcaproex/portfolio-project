const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: String,
    list: [String],
    status: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
