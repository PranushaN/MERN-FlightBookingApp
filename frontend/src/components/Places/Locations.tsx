import { FlightTakeoffSharp } from '@mui/icons-material'
import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPlaces, locationObjType } from './LocationSlice';
import './places.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';


const Locations = () => {
    const [location, setLocation] = useState<locationObjType | null>(null);
    const [destination, setDestination] = useState<locationObjType | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const dispatch = useAppDispatch();
    const Locations = useAppSelector((state) => state.places);
    console.log('locations: ', Locations);
    console.log('Selected location: ', location);

    useEffect(() => {
        dispatch(fetchPlaces())
    }, [])
    return (
        <Stack spacing={2}>
            {Locations.loading && <div>Loading...</div>}
            {!Locations.loading && Locations.error ? <div>Error: {Locations.error}</div> : null}
            {!Locations.loading && Locations.places.length > 0 ? (
                <Box sx={{ width: '100%' }} className="flights-param-container">
                    <Autocomplete
                        id="departure"
                        options={Locations.places}
                        value={location}
                        autoHighlight
                        className='location-list'
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                        onChange={(event: any, newValue: locationObjType | null) => setLocation(newValue)}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => displayCity(props, option)}
                    />
                    <Autocomplete
                        id="arrival"
                        options={Locations.places}
                        value={destination}
                        autoHighlight
                        className='location-list'
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                        onChange={(event: any, newValue: locationObjType | null) => setDestination(newValue)}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => displayCity(props, option)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            key="start-date"
                            className='location-list'
                            label="Basic example"
                            value={startDate}
                            onChange={(newValue) => {
                            setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            key="end-date"
                            className='location-list'
                            label="Basic example"
                            value={endDate}
                            onChange={(newValue) => {
                            setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            ) : null}
        </Stack>
    )
}

const displayCity = (props: React.HTMLAttributes<HTMLLIElement>, city: locationObjType) => {
    return (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <FlightTakeoffSharp color="disabled" sx={{ fontSize: 20 }} />
            {city.name}, {city.country}  {city.short}
        </Box>
    )
}

export default Locations;
