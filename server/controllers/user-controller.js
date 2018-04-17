const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FB = require('fb')

const saltRounds = 10

module.exports = {
    register: (req, res) => {
        console.log(req.body)
        let addUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password

        })
        addUser.save()
        .then(dataUser => {
            let token = jwt.sign({userId: dataUser._id}, process.env.SECRET)
            res.status(200).json({
                message: 'Register User Success',
                data: {
                    id: dataUser._id,
                    name: dataUser.first_name+' '+dataUser.last_name,
                    email: dataUser.email,
                    token: token
                }
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Register User Failed.!',
                error: err
            })
        })
    },

    login: (req, res) => {
        console.log(req.body)
        User.findOne({
            email: req.body.email
        })
        .exec()
        .then(dataUser => {
            if(dataUser) {
                let checking = bcrypt.compareSync(req.body.password, dataUser.password)
                if(checking){
                    let token = jwt.sign({userId: dataUser._id}, process.env.SECRET)
                    res.status(200).json({
                        message: 'User Login Success.',
                        data: {
                            id: dataUser._id,
                            name: dataUser.first_name+' '+dataUser.last_name,
                            email: dataUser.email,
                            token: token
                        }
                    })
                } else {
                    res.status(202).json({
                        message: 'Login Failed, email or password wrong'
                    })
                }
            } else {
                res.status(202).json({
                    message: 'Login Failed, email or password wrong'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Get Data User Failed',
                error: err
            })
        })
    },

    loginFB: (req, res) => {
        console.log('REQ======', req.headers)
        FB.api('me', { fields: ['id' , 'name', 'email'], access_token: req.headers.fb_token }, function (resFB){
            console.log('RES FB=====', resFB)
            User.findOne({
                email: resFB.email
            })
            .exec()
            .then(dataUser => {
                if(dataUser){
                    let token = jwt.sign({userId: dataUser._id}, process.env.SECRET)
                    res.status(200).json({
                        message: 'User Login Success.',
                        data: {
                            id: dataUser._id,
                            name: dataUser.first_name,
                            email: dataUser.email,
                            token: token
                        }
                    })
                } else {
                    let addUser = new User({
                        first_name: resFB.name,
                        id_fb: resFB.id,
                        email: resFB.email,
                        password: 'user1234'
            
                    })
                    addUser.save()
                    .then(dataUser => {
                        let token = jwt.sign({userId: dataUser._id}, process.env.SECRET)
                        res.status(200).json({
                            message: 'Register User Success',
                            data: {
                                id: dataUser._id,
                                name: dataUser.first_name,
                                email: dataUser.email,
                                token: token
                            }
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: 'Register User Failed.!',
                            error: err
                        })
                    })
                }
            })
            
            
        });
    }
};
