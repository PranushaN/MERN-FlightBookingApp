import { createSlice } from "@reduxjs/toolkit";
import { Dayjs } from 'dayjs';

export type SearchParamType = {
    source: string,
    destination: string,
    startDate: Dayjs | null,
    endDate: Dayjs | null
}
type initialStateType = {
    searchParam: SearchParamType,
    error: string
}

const initialState: initialStateType = {
    searchParam: {
        source: '',
        destination: '',
        startDate: null,
        endDate: null
    },
    error: ''
}

const searchParamSlice = createSlice({
    name: 'searchParams',
    initialState: initialState,
    reducers: {
        search: (state, action) => {
            console.log('search params payload: ', action.payload)
            state.searchParam = {...action.payload}
        }
    }
});

export default searchParamSlice.reducer;
export const searchActions = searchParamSlice.actions;