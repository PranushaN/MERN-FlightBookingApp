const HttpError = require('../models/http-error');
const { validationResult } = require("express-validator");

const Place = require('../models/place');

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError(
            "Invalid inputs passed, please check your data",
            422        
        );
    }

    const {name, country, short} = req.body;
    const createdPlace = new Place({
        name,
        country,
        short
    });
    try{
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError('creating place failed.', 500);
        return next(error);
    }
    
    res.status(201).json({place : createdPlace});
}

const getAllPlaces = async (req, res, next) => {
    let placesList = [];
    try{
        placesList = await Place.find();
    } catch (err) {
        const error = new HttpError('Could not retrieve places', 500);
        return next(error);
    }
    if(placesList.length === 0) {
        const error =  new HttpError('Could not find requested place id', 404);
        return next(error);
    }
    res.json(placesList);
}

const getPlaceByID = async (req, res, next) => {
    const {placeId} = req.body;
    let place;
    try{
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Could not find place', 500);
        return next(error);
    }
    if(!place) {
        const error =  new HttpError('Could not find requested place id', 404);
        return next(error);
    }
    res.json({place: place.toObject( { getters : true})});
}

exports.createPlace = createPlace;
exports.getAllPlaces = getAllPlaces;
exports.getPlaceByID = getPlaceByID;