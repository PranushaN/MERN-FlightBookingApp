const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    source: { type: String, required: true},
    airline: { type: String, required: true},
    airlineID: { type: String, required: true},
    cost: { type: String, required: true},
    destination: { type: String, required: true},
    endTime: { type: String, required: true},
    startTime: { type: String, required: true},
});

module.exports = mongoose.model("Flight", flightSchema);