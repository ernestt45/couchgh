var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    LastName: {
        type: String
    },
    otherNames: {
        type: String
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    gender: String,
    dateOfBirth: String
}) 


module.exports = mongoose.model('user', UserSchema);