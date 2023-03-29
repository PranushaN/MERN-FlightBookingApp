import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export type flightListObjType = {
    _id: string,
    source: String,
    airline: String,
    airlineID: String,
    cost: Number,
    destination: String,
    endTime: String,
    startTime: String,
}

export type initialStateType = {
    loading: boolean,
    flights: flightListObjType[],
    error: string
}

const initialState: initialStateType = {
    loading: false,
    flights: [],
    error: ''
}

export const fetchFlights = createAsyncThunk('flights/getAllFlights', async (param : string) => {
    return axios.get('http://localhost:5001/api/flights/' + param)
    .then(response => {
        console.log('slice fetch: ', response)
        return response.data
    })
})

const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFlights.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchFlights.fulfilled, (state, action: PayloadAction<flightListObjType[]>) => {
            state.loading = false;
            state.flights = action.payload;
            state.error = ''
        })
        builder.addCase(fetchFlights.rejected, (state,action) => {
            state.loading = false;
            state.flights = [];
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export default flightsSlice.reducer;
