const HttpError = require('../models/http-error');

const Flights = require('../models/flight');

const getAllFlights = async (req, res, next) => {
    let from = req.params.from;
    let to = req.params.to;
    let flightList = [];
    console.log('params: ', from, ' - ', to);
    try{
        flightList = await Flights.find({source: from, destination: to});
    } catch (err) {
        const error = new HttpError('Could not retrieve flights', 500);
        return next(error);
    }
    if(flightList.length === 0) {
        const error =  new HttpError('Could not find requested flights', 404);
        return next(error);
    }
    res.json(flightList);
}

exports.getAllFlights = getAllFlights;