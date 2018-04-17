const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')
const bcrypt = require('bcrypt')

let emailChecker = [
    validate({
        validator: 'isEmail',
        message: 'Format email has invalid'
    })
]

const userSchema = new Schema({
    id_fb: String,
    first_name: {
        type: String,
        required: [true, 'First Name cannot be empty']
    },
    last_name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email cannot be empty'],
        validate: emailChecker 
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [8, 'Password length minimum 8 character'],
        validate: [/\d/, 'Password MUST HAVE CONTAIN NUMERIC']
    }

}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User