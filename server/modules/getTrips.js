const Trips = require('../models/tripsModel')

var getTrips = (req, res)=>{
    
    var body = req.body
    if ((body.from == undefined) || (body.to == undefined)) {
        res.json({
            error: 'Empty Fields',
            message: 'Please provide the from and to fields'
        })
    }else{

        //Setting date to current date if not provided 
        if (body.date == undefined) {
            var date = new Date()
            var month = date.getMonth() + 1
            if (month < 10) {
                month = '0' + month.toString()
            }
            body.date = (
                date.getFullYear().toString() + '-' +
                month + '-' +
                date.getDate().toString()
            )
        }
        
        Trips.find({ from: body.from, to: body.to, date: body.date}).sort({ seatsAvailable: -1 }).exec((err, doc)=>{
            res.json(doc)
        })
    }
}

module.exports = getTrips