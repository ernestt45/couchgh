const Trip = require('../models/tripsModel')

var getTripById = (req, res) => {

    var body = req.params
    if ((body.id == undefined)) {
        res.json({
            error: 'Empty Fields',
            message: 'Please provide the from and to fields'
        })
    } else {
        Trip.findById(req.params.id).then(doc=>{
            res.json(doc)
        }).catch(err=>{
            res.json(err)
        })
    }
}

module.exports = getTripById