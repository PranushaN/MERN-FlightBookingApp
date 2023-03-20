const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const HttpError = require('./models/http-error');
const placesRouter = require('./routes/places-routes');
const flightsRouter = require('./routes/flights-route');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/places", placesRouter);
app.use("/api/flights", flightsRouter);

app.use((req, res, next) => {
    const err = new HttpError("Couldn't find this route", 404);
    throw err;
});

app.use((error, req, res, next) => {
    if(res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknown error occured!"});
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:sherlock221b@makemytripcluster.htvcixo.mongodb.net/MMT?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5001);
    })
    .catch(err => {
        console.log(err);
    });
