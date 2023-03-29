import {createSlice} from "@reduxjs/toolkit";

export type filterParamsType = {
    airline: Array<String>,
    minCost: Number,
    MaxCost: Number
}

type initialStateType = {
    filters : filterParamsType,
    error: String
}

const initialState:initialStateType = {
    filters: {
        airline: [],
        minCost: 0,
        MaxCost: 0
    },
    error: ''
}

const filterParamSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        filter: (state, action) => {
            console.log('airline filter action: ', action.payload);
            state.filters = {...action.payload};
        }
    }
});

export default filterParamSlice.reducer;
export const filterActions = filterParamSlice.actions;