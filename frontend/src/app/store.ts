import {configureStore } from '@reduxjs/toolkit';
//import reduxLogger from 'redux-logger';
import placesReducer from '../components/Places/LocationSlice';
import flightReducer from '../components/FlightsDashboard/FlightListSlice';
import searchReducer from '../components/Places/SearchParamsSlice';
import filterReducer from '../components/FlightsDashboard/AirlineFilterSlice';

//const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer : {
        places: placesReducer,
        flights: flightReducer,
        search: searchReducer,
        filters: filterReducer
    },
    //middleware: (gDM) => gDM().concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;