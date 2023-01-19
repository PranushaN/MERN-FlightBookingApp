import {configureStore } from '@reduxjs/toolkit';
//import reduxLogger from 'redux-logger';
import placesReducer from '../components/Places/LocationSlice';

//const logger = reduxLogger.createLogger();

const store = configureStore({
    reducer : {
        places: placesReducer
    },
    //middleware: (gDM) => gDM().concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;