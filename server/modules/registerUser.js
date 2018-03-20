const User = require('../models/UserModel')

var registerUSer = (req,res)=>{
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
}

module.exports = registerUSer