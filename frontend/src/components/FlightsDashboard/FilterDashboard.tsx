import { useState } from "react";
import { Checkbox, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { flightListObjType } from './FlightListSlice';
import './flights.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {filterActions, filterParamsType} from './AirlineFilterSlice';

type flightListType = {
    flightList ?: Array<flightListObjType>
}

const FilterDashboard = <PROPS extends flightListType, >({ flightList }: PROPS): JSX.Element => {
    console.log('flightList: ', flightList);
    return (
        <form noValidate >
            <Paper className="filter-dashboard" >
                <Typography variant="subtitle1" gutterBottom className="bold-value" >
                    Airlines
                </Typography>
                {
                    (flightList!= null || flightList != undefined) ? <GetAirlineFilters flightList={flightList} /> : null
                }
            </Paper>
        </form>
    )
}


function getAirlineList(list:flightListObjType[]) {

    while(list.length !== 0){
        let airlineList:Array<String> = [];
        list?.forEach(flight => {
            if(!airlineList.includes(flight.airline)){
                airlineList.push(flight.airline);
            }
        });
        console.log('final airline list: ', airlineList);
        return airlineList;
    }
    return [];
}

const GetAirlineFilters = <PROPS extends flightListType, >({ flightList }: PROPS): JSX.Element => {
    let uniqueAirlineList:Array<String> = [];
    if(flightList!= null || flightList != undefined){
        uniqueAirlineList = getAirlineList(flightList);
        console.log('uniqueAirlineList: ', uniqueAirlineList);
    }
    let initialCheckedState:Array<boolean> = uniqueAirlineList.map(() => false);
    const [airlineChecked, setChecked] = useState<Array<boolean>>(initialCheckedState);

    const dispatch = useAppDispatch();
    const airlineFilters = useAppSelector((state) => state.filters);

    const handleSelect = (index:number) => {
        console.log('handleSelect: ', index)
        let updatedCheckBox = [...airlineChecked];
        updatedCheckBox[index] = !airlineChecked[index];
        setChecked(updatedCheckBox);
        let selectedAirlines:Array<String> = [];
        updatedCheckBox.map((value, index) => {
            if(value === true) {
                return selectedAirlines.push(uniqueAirlineList[index]);
            }
        });
        console.log('selectedAirlines: ',selectedAirlines);
        let filterUpdated = {...airlineFilters.filters};
        filterUpdated.airline = selectedAirlines;
        dispatch(filterActions.filter(filterUpdated));
    }
    
    console.log('airlineFilters: ', airlineFilters)
    return (
        <List className="airline-List">
            {
                uniqueAirlineList.map((airline,index) => {
                    return (
                        <ListItem className="airline">
                        <Checkbox
                            id={`check-Fv${airline}`}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            value={index}
                            checked={airlineChecked[index]}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleSelect(index)}}
                        />
                            <ListItemText primary={airline} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default FilterDashboard;