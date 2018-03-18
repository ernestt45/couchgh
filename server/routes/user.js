const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('../models/UserModel')

const router = express.Router()

const dbConfig = require('../config/db')

//connect to mongo db server
mongoose.connect(dbConfig.connector)
const db = mongoose.connection

// Database check connection
db.on('error',(err)=>{
    console.log('Unccessfull Connection to Mongo')
})
db.once('open',()=>{
    console.log('Connected to Mongo successfully')
})

router.post('/register', (req, res) => {
    console.log(req.body)
    User.findOne({ username: req.body.username }, (err, data) => {
        if (data) {
            res.json({
                error: "username exist\'s",
                message: "the username " + data.username + ", is already in use"
            })
        } else {
            User.findOne({ email: req.body.email }, (err, data) => {
                if (data) {
                    res.json({
                        error: "email exist\'s",
                        message: "the email " + data.email + ", is already in use"
                    })
                } else {
                    if (req.body.password.length < 6) {
                        res.json({
                            error: "short password",
                            message: "password should be more than 6 characters long"
                        })
                    } else {
                        registerUser(req, res)
                    }
                }
            })
        }
    })
})

router.get('/:type/:value/exist', (req, res) => {
    switch (req.params.type) {
        case 'username':
            User.findOne({ username: req.params.value }, (err, data) => {
                if (err) {
                    throw err
                }
                if (data) {
                    res.json({
                        isExist: true
                    })
                } else {
                    res.json({
                        isExist: false
                    })
                }
            })
            break;

        case 'email':
            User.findOne({ 'email': req.params.value }, (err, data) => {
                if (err) {
                    throw err
                }
                if (data) {
                    res.json({
                        isExist: true
                    })
                } else {
                    res.json({
                        isExist: false
                    })
                }
            })
            break;

        default:
            res.send('Wrong parameters sent')
            break;
    }
})


router.get('/', (req, res) => {
    res.send('User Api')
})


module.exports = router

//Register User
var registerUser = function(req, res){
    new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).save((err, data) => {
        if (err)
            res.send(err)
        res.send(data)
    })
}
