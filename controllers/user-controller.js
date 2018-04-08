const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

module.exports = {
    register: (req, res) => {
        let addUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password

        })
        addUser.save()
        .then(dataUser => {
            res.status(200).json({
                message: 'Register User Success',
                data: dataUser
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Register User Failed.!',
                error: err
            })
        })
    }
}
