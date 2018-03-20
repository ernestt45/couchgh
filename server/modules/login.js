const User = require('../models/UserModel')

var loginUSer = (req, res)=>{
    var body = req.body
    // Checking if username and password ligit
    if (body.username == undefined) {
        res.json({
            error: 'Username not provided',
            message: 'The Username or Email field hasn\'t been provided'
        })
    }

    if (body.password <= 6) {
        res.json({
            error: 'Password is short',
            message: 'Password should be more than 6 characters long'
        })
    }

    User.findOne({
        $or: [
            { username: body.username, password: body.password },
            { email: body.username, password: body.password }
        ]
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: 'Can\'t sign',
                message: 'Can\'t sign in at the moment... please try again later'
            })
        }

        if (data) {
            var userCreds = {
                _id: data._id,
                username: data.username,
                email: data.email
            }

            var jwt = require('jsonwebtoken')
            jwt.sign(userCreds, 'iLoveChochGh', { expiresIn: '1h' }, (err, token) => {
                res.json({
                    token: token
                })
            })

        } else {
            res.json({
                error: 'no user',
                message: 'Wrong username or password provided'
            })
        }

    })
}

module.exports = loginUSer