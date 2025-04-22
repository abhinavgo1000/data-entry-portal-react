import * as React from 'react';
import Typography from '@mui/material/Typography';
import LineChart from '../../common/LineChart/LineChart';
import './LineChsrtPage.css';

function LineChartPage() {
    return (
        <React.Fragment>
            <Typography variant='h4'>Line Chart</Typography>
            <LineChart />
        </React.Fragment>
    );
}

export default LineChartPage;
