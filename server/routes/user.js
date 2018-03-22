const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Modules
const LoginUSer = require('../modules/login')
const RegisterUser = require('../modules/registerUser')
const Verify = require('../modules/verifyUser')

const router = express.Router()
const User = require('../models/UserModel')
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

// Register User
router.post('/register', RegisterUser)

// Login user
router.post('/login', LoginUSer)

// Verify Email With Id
router.get('/verification/:value', Verify)

// Does User Exist
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
            User.count({ 'email': req.params.value }, (err, data) => {
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
            break
        default:
            res.send('Wrong parameters sent')
            break;
    }
})

// User Api route
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

        if (err) res.send(err)
        
        sendMail(req,res, data._id)

        res.send(data)
    })

    
}

var sendMail = function(req, res, userId){

    var nodemailer = require('nodemailer')

    //Include your configurations in server/config/email
    var config = require('../config/config')
    config = config.email

    var transporter = nodemailer.createTransport(config.tramsportMethod, {
        service: config.service,
        secure: true,
        port: config.port,
        host: config.host,
        auth: {
            user: config.auth.user,
            pass: config.auth.pass
        }
    });


    var mailOptions = {
        from: 'no-reply@chochgh.com',
        to: req.body.email,
        subject: 'Account Activation',

        //try to change the verification address pointing to server
        html: 
        `
       <html lang="en" style="-webkit-box-sizing: border-box;box-sizing: border-box;font-family: &quot;Roboto&quot;, sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;line-height: 1.5;font-weight: normal;color: rgba(0,0,0,0.87);">
<head style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <meta charset="UTF-8" style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <meta http-equiv="X-UA-Compatible" content="ie=edge" style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css" style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    <title style="-webkit-box-sizing: inherit;box-sizing: inherit;">ChochGh Verification Mail</title>
</head>
<style style="-webkit-box-sizing: inherit;box-sizing: inherit;">
    body{
        background: #ddd;
    }
</style>
<body style="-webkit-box-sizing: inherit;box-sizing: inherit;margin: 0;background: #ddd;">
    <div class="container center" style="-webkit-box-sizing: inherit;box-sizing: inherit;text-align: center;margin: 0 auto;max-width: 1280px;width: 90%;">
        <div class="card" style="-webkit-box-sizing: inherit;box-sizing: inherit;-webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);position: relative;margin: .5rem 0 1rem 0;background-color: #fff;-webkit-transition: -webkit-box-shadow .25s;transition: box-shadow .25s, -webkit-box-shadow .25s;border-radius: 2px;">
            <h3 class="card-title teal-text" style="-webkit-box-sizing: inherit;box-sizing: inherit;font-weight: 300;line-height: 110%;font-size: 24px;margin: 1.46rem 0 1.168rem 0;color: #009688 !important;">ChouchGh</h3>
            <div class="card-content" style="-webkit-box-sizing: inherit;box-sizing: inherit;padding: 24px;border-radius: 0 0 2px 2px;">
                <h4 style="-webkit-box-sizing: inherit;box-sizing: inherit;font-weight: 400;line-height: 110%;font-size: 2.28rem;margin: 1.14rem 0 .912rem 0;">Verify your email</h4>
                <br style="-webkit-box-sizing: inherit;box-sizing: inherit;">
                <p style="-webkit-box-sizing: inherit;box-sizing: inherit;margin: 0;color: inherit;">Please click the button below to verify your email.</p>
            </div>
            <div class="card-action" style="-webkit-box-sizing: inherit;box-sizing: inherit;position: relative;background-color: inherit;border-top: 1px solid rgba(160,160,160,0.2);padding: 16px 24px;border-radius: 0 0 2px 2px;">
                <a href="http://localhost:8081/user/verify/`+ userId +`" class="btn waves-effect teal" style="-webkit-box-sizing: inherit;box-sizing: inherit;background-color: #009688 !important;color: #fff;text-decoration: none;-webkit-tap-highlight-color: transparent;-webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);border: none;border-radius: 2px;display: inline-block;height: 36px;line-height: 36px;padding: 0 2rem;text-transform: uppercase;vertical-align: middle;font-size: 1rem;outline: 0;text-align: center;letter-spacing: .5px;-webkit-transition: .3s ease-out;transition: .3s ease-out;cursor: pointer;position: relative;overflow: hidden;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;z-index: 1;">Verify</a>
            </div>
        </div>
        </div>
</body>
</html>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Could\'t send email to:',req.body.email);
        } else {
            console.log('Email sent: ',req.body.email);
        }
    });
} 