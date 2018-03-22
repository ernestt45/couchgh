var mongoose = require('mongoose')

var TripsSchema = mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        default: 'evening'
    },
    vendor: {
        type: String,
        required: true
    },
    ammount: {
        type: Number
    },
    seatsAvailable: {
        type: Number,
        default: 20
    }
})


module.exports = mongoose.model('trip', TripsSchema);