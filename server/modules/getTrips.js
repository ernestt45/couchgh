const Trips = require('../models/tripsModel')

var getTrips = (req, res)=>{
    
    var body = req.body
    if ((body.from == undefined) || (body.to == undefined)) {
        res.json({
            error: 'Empty Fields',
            message: 'Please provide the from and to fields'
        })
    }
    Trips.find({
        
    },(err, doc)=>{
        res.json(doc)
    })
}

module.exports = getTrips