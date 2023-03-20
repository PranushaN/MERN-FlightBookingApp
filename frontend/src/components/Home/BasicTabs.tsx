import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './home.css';
import { FlightTakeoffSharp, LocationCitySharp, CottageSharp, KitesurfingSharp, TrainSharp, AirportShuttleSharp, LocalTaxiSharp, BeachAccessSharp } from '@mui/icons-material/';


interface BasicTabProps {
  handleTabChange ?: (event: React.SyntheticEvent, newValue: number) => void;
  activeTab: number;
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: BasicTabProps) {

  return (
    <Box className="container-categories">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={props.activeTab} onChange={props.handleTabChange}  aria-label="basic tabs example">
          <Tab label="Flights" {...a11yProps(0)} className="Tab-Categories" icon={<FlightTakeoffSharp color="disabled" sx={{ fontSize: 60 }} />}/>
          <Tab label="Hotels" {...a11yProps(1)} className="Tab-Categories" icon={<LocationCitySharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Homestays" {...a11yProps(2)} className="Tab-Categories" icon={<CottageSharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Packages" {...a11yProps(3)} className="Tab-Categories" icon={<BeachAccessSharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Trains" {...a11yProps(4)} className="Tab-Categories" icon={<TrainSharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Buses" {...a11yProps(5)} className="Tab-Categories" icon={<AirportShuttleSharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Cabs" {...a11yProps(6)} className="EPTab-Categories" icon={<LocalTaxiSharp color="disabled" sx={{ fontSize: 60 }} />} />
          <Tab label="Activities" {...a11yProps(7)} className="Tab-Categories" icon={<KitesurfingSharp color="disabled" sx={{ fontSize: 60 }} />} />
        </Tabs>
      </Box>
    </Box>
  );
}