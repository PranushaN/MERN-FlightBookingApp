import { Button, Grid, Typography } from "@mui/material";
import {flightListObjType} from './FlightListSlice';
import './flights.css';

const DisplayFlight = (flight: flightListObjType) => {
    return (
        <Grid id={flight._id} 
            container
            direction="row"
            alignItems="center" 
            justifyContent="center"
            className="flight-container"
        >
            <Grid xs={1}>
                <img src={getFlightImgLink(flight.airline)} alt='flightImage' style={{height:'45px'}} />
            </Grid>
            <DisplayGrid upperString={flight.airline} lowerString={flight.airlineID} />
            <DisplayGrid upperString={flight.startTime} lowerString={flight.source} />
            <Grid xs={2} className="flight-detail" >
                <Typography variant="overline" gutterBottom className="flight-upper">
                    02h 45m
                </Typography><hr/>
                <Typography variant="caption" gutterBottom align="center">
                    Non stop
                </Typography>
            </Grid>
            <DisplayGrid upperString={flight.endTime} lowerString={flight.destination} />
            <DisplayGrid upperString={`₹${flight.cost}`} lowerString=""  />
            <Grid xs={1}>
                <Button variant="contained" color="primary">
                    BOOK
                </Button>
            </Grid>
        </Grid>
    )
}


type Props = {
    upperString : String,
    lowerString : String
}
const DisplayGrid = <PROPS extends Props, >({ upperString, lowerString }: PROPS): JSX.Element => {
    let classes = lowerString !== "" ? "flight-upper" : "flight-upper bold-value";
    return (
        <Grid xs={2} className="flight-detail" >
            <Typography variant="h6" gutterBottom className={classes}>
                {upperString}
            </Typography>
            { lowerString !== "" ?
            <Typography variant="overline" gutterBottom align="center">
                {lowerString}
            </Typography> : null
            }
        </Grid>
    )
}


function getFlightImgLink(airline: String){
    if(airline === "Indigo") {
        return "https://media.glassdoor.com/sqll/2006190/indigo-airlines-squarelogo-1585307627941.png";
    } else if( airline === "Air India") {
        return "https://newsonair.gov.in/writereaddata/News_Pictures/NAT/2020/Jan/NPIC-20201581534.jpeg";
    }
    return "";
}

export default DisplayFlight;

/*
<Grid id={flight._id} container spacing={2} columns={16} className="flight-container">
            <Grid xs={2}>
                <img src='https://media.glassdoor.com/sqll/2006190/indigo-airlines-squarelogo-1585307627941.png' alt='flightImage' />
            </Grid>
            <Grid xs={2}><p>{flight.airline}  {flight.airlineID}</p></Grid>
            <Grid xs={2}><p>{flight.startTime}  {flight.source}</p></Grid>
            <Grid xs={2}><p>{flight.endTime}  {flight.destination}</p></Grid>
            <Grid xs={2}><p>{flight.cost}</p></Grid>
        </Grid>


*/