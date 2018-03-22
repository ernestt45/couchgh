const express = require('express')
const router = express.Router()
const getTrips = require('../modules/getTrips')

router.post('/', getTrips)


module.exports = router