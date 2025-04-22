import * as React from 'react';
import Typography from '@mui/material/Typography';
import BarChart from '../../common/BarChart/BarChart';
import './BarChartPage.css';

function BarChartPage() {
    return (
        <React.Fragment>
            <Typography variant='h4'>Bar Chart</Typography>
            <BarChart />
        </React.Fragment>
    );
}

export default BarChartPage;
