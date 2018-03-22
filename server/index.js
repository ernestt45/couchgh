const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//Importing configs
const config = require('./config/config')
mongoose.connect(config.db.connector)


const Trips = require('./routes/trips')
const User = require('./routes/user')

app.use(cors())
app.use(bodyParser.json())
app.use("/", (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    next()
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use('/trip', Trips)
app.use('/user', User)

app.listen(8081,()=>{
    console.log('listenning on port 8080')
})