import { Box, Button, Typography } from "@mui/material";
import './home.css';
import Location from '../Places/Locations';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Categoryprops {
    tab: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, color: 'black' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export const Categories = (props: Categoryprops) => {
    return (
        <Box className="Categories-Board" >
            <TabPanel value={props.tab} index={0}>
                <Location />
            </TabPanel>
            <TabPanel value={props.tab} index={1}>
                Hotels
            </TabPanel>
            <TabPanel value={props.tab} index={2}>
                Homestays
            </TabPanel>
            <TabPanel value={props.tab} index={3}>
                Packages
            </TabPanel>
            <TabPanel value={props.tab} index={4}>
                Trains
            </TabPanel>
            <TabPanel value={props.tab} index={5}>
                Buses
            </TabPanel>
            <TabPanel value={props.tab} index={6}>
                Cabs
            </TabPanel>
            <TabPanel value={props.tab} index={7}>
                Activities
            </TabPanel>
            <Button variant="contained" size="medium" color="primary" className="search-btn" >
                Search
            </Button>
        </Box>
    )
}
