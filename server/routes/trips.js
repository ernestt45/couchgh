const express = require('express')
const router = express.Router()
const getTrips = require('../modules/getTrips')
const getTripById = require('../modules/getTripById')

router.post('/', getTrips)
router.get('/:id', getTripById)

module.exports = router