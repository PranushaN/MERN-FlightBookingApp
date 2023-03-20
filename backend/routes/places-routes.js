const express = require("express");
const {check} = require("express-validator");

const placesControllers = require('../controller/places-controller');

const router = express.Router();

router.get("/", placesControllers.getAllPlaces);
router.get("/:placeId", placesControllers.getPlaceByID);
router.post("/", placesControllers.createPlace);

module.exports = router;

/*
[
    check("name").not().isEmpty(),
    check("country").not().isEmpty(),
    check("short").isLength({ max:3, min:3}),
]

*/