import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFlights, flightListObjType } from './FlightListSlice';
import {filterActions} from './AirlineFilterSlice';
import DisplayFlight from './FlightDisplay';
import './flights.css';
import { Grid, Typography } from "@mui/material";
import FilterDashboard from "./FilterDashboard";

const FixedTopBar = () => {
    return (
        <div className="header">
            <Typography variant="h6" component="h2" >
                Fixed top bar
            </Typography>
        </div>
    )
}

export type flightProps = {
    flights ?: Array<flightListObjType>
}

const getMinMax = (flights:flightListObjType[] | undefined) => {
    const min = flights !== undefined ? Math.min(...flights.map(flight => flight.cost.valueOf())) : 0;
    const max = flights !== undefined ? Math.max(...flights.map(flight => flight.cost.valueOf())) : 0;
    console.log('min: ', min, ' max: ', max);
    return [min,max];
}

const ScrollableBottom = <PROPS extends flightProps, >({ flights }: PROPS): JSX.Element =>  {
    console.log('ScrollableBottom', flights);
    const filterList = useAppSelector((state) => state.filters.filters);
    console.log('filterList from redux: ', filterList);
    let filteredFlights = filterList.airline.length !== 0 ? flights?.filter(value => filterList.airline.includes(value.airline)) : flights;
    console.log('filteredFlights: ', filteredFlights);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const filterParams = {...filterList};
        const minMax = getMinMax(flights);
        filterParams.minCost = minMax[0];
        filterParams.MaxCost = minMax[1]; 
        dispatch(filterActions.filter(filterParams));
    },[])
    return (
        <div className="content">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={3}
                style={{marginTop:'10px'}}
            >
                    <Grid item xs={3}>
                    {
                            (filteredFlights!= null || filteredFlights != undefined) ? <FilterDashboard flightList={flights} /> : null
                    }   
                    </Grid>
                    <Grid item xs={8}>
                        {
                            (filteredFlights!= null || filteredFlights != undefined) ? filteredFlights.map(flight => <DisplayFlight {...flight} key={flight._id} /> ) : <p>No flights found</p>
                        }
                    </Grid>
                    
            </Grid>
        </div>
    )
}

const FlightDashBoard = () => {
    const dispatch = useAppDispatch();
    const Flights = useAppSelector((state) => state.flights);
    const searchValues = useAppSelector((state) => state.search);
    const searchString = searchValues.searchParam.source + '-' + searchValues.searchParam.destination;
    console.log('searchString: ', searchString);
    useEffect(() => {
        dispatch(fetchFlights(searchString))
    }, [])
    return (
        <div className="flight-dashboard">
            <FixedTopBar />
            {Flights.loading && <div>Loading...</div>}
                {!Flights.loading && Flights.error ? <div>Error: {Flights.error}</div> : null}
                {!Flights.loading && Flights.flights.length > 0 ? (
                    <ScrollableBottom flights={Flights.flights} />
                ): null }
            
        </div>
    )
}



export default FlightDashBoard;

/*
 <div className="flight-dashboard">
            <div className="header"> Flights from Bengaluru to Pune</div>
            <div className="content">
                {Flights.loading && <div>Loading...</div>}
                {!Flights.loading && Flights.error ? <div>Error: {Flights.error}</div> : null}
                {!Flights.loading && Flights.flights.length > 0 ? (
                    Flights.flights.map(flight => <DisplayFlight {...flight} key={flight._id} />)
                ): null }
            </div>
        </div>

*/