import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export type locationObjType = {
    _id: string,
    name: string,
    country: string,
    short: string,
    airport: string
}

type initialStateType = {
    loading: boolean,
    places: locationObjType[],
    error: string
}

const initialState: initialStateType = {
    loading: false,
    places: [],
    error: ''
}

export const fetchPlaces = createAsyncThunk('places/getAllPlaces', () => {
    return axios.get('http://localhost:5001/api/places')
    .then(response => {
        //console.log('slice fetch: ', response)
        return response.data
    })
})

const placesSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPlaces.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPlaces.fulfilled, (state, action: PayloadAction<locationObjType[]>) => {
            state.loading = false;
            state.places = action.payload;
            state.error = ''
        })
        builder.addCase(fetchPlaces.rejected, (state,action) => {
            state.loading = false;
            state.places = [];
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

export default placesSlice.reducer;
