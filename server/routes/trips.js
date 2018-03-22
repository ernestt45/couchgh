const express = require('express')
const router = express.Router()
const getTrips = require('../modules/getTrips')

router.post('/', getTrips)

router.get('/', (req, res) => {
    res.send('Getting all trips')
})

module.exports = router