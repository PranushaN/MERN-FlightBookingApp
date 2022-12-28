const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name : { type : String, required : true },
    country : { type : String, required : true },
    short : { type : String, required : true },
});

module.exports = mongoose.model("Place", placeSchema);