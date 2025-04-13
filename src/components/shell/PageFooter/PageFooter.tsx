import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import './PageFooter.css';

function PageFooter() {

    const [value, setValue] = React.useState('home');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <footer>
            <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Data Entry Form"
                    value="form"
                    icon={<EditNoteIcon />}
                />
                <BottomNavigationAction
                    label="Bar Chart"
                    value="barchart"
                    icon={<BarChartIcon />}
                />
                <BottomNavigationAction 
                    label="Line Chart" 
                    value="linechart" 
                    icon={<ShowChartIcon />} />
                <BottomNavigationAction 
                    label="Pie Chart" 
                    value="piechart" 
                    icon={<PieChartIcon />} />
            </BottomNavigation>
        </footer>
    )
}

export default PageFooter;
