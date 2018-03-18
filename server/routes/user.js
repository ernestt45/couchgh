const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('../models/UserModel')

const router = express.Router()

mongoose.connect('mongodb://localhost:27017/chochgh')

const db = mongoose.connection

db.on('error',(err)=>{
    console.log('Unccessfull Connection to Mongo')
})
db.once('open',()=>{
    console.log('Connected to Mongo successfully')
})

router.get('/:type/:value/exist', (req, res) => {
    console.log(req.params.type)
    switch (req.params.type) {
        case 'username':
            User.findOne({ username: req.params.value }, (err, data) => {
                if (err) {
                    throw err
                }
                console.log(data)
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
                if (data) {
                    res.json({
                        isExist: true
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

router.post('/register', (req, res)=>{
    User.findOne({username: req.body.username},(err, data)=>{
        if (data) {
            res.json({
                error: "username exist\'s",
                message: "the username "+data.username+ ", is already in use"
            })
        } else {
            User.findOne({ email: req.body.email }, (err, data) => {
                if (data) {
                    res.json({
                        error: "email exist\'s",
                        message: "the email " + data.email + ", is already in use"
                    })
                }else{
                    if (req.body.password.length < 6) {
                        res.json({
                            error: "short password",
                            message: "password should be more than 6 characters long"
                        })
                    }else{
                        registerUser(req, res)
                    }
                }
            })
        } 
    })
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
