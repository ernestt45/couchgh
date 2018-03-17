const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost:27017/chochgh")


const Trips = require('./routes/trips')

app.use('/trips', Trips)

app.listen(8081,()=>{
    console.log('listenning on port 8080')
})