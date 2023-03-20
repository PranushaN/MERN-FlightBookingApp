const express = require('express');
const flightController = require('../controller/flights-controller');

const router = express.Router();

router.get("/:from-:to", flightController.getAllFlights);

module.exports = router;