const User = require('../models/UserModel')


var verify = (req, res) => {
    User.updateOne({ _id: req.params.value }, { status: 'activated' }, (err, doc) => {
        if (doc.ok == 0 || err) {
            res.json({
                error: 'the verication code not acceptable',
                message: 'the verification code you provided is incorrect or has expired'
            })
        } else if (doc.nModified == 0) {
            res.json({
                message: 'user account already ativated'
            })
        } else {
            res.json({
                message: 'account activated'
            })
        }
    })
}

module.exports = verify