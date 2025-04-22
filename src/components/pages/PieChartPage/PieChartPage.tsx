import * as React from 'react';
import Typography from '@mui/material/Typography';
import PieChart from '../../common/PieChart/PieChart';
import './PieChartPage.css';

function PieChartPage() {
    return (
        <React.Fragment>
            <Typography variant='h4'>Pie Chart</Typography>
            <PieChart />
        </React.Fragment>
    );
}

export default PieChartPage;
