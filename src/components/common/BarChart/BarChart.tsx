import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './BarChart.css';
import ChartFormData from '../../../interfaces/ChartFormData';

function BarChart() {

    const fetchChartData = async () => {
        const response = await axios.get('http://localhost:5000/api/form/fetch-all-data');
        return response.data;
    };

    const { data, error, isFetching } = useQuery<ChartFormData[]>({
        queryKey: ['cardsData'],
        queryFn: () => fetchChartData(),
        staleTime: 5000, // Keeps data fresh for 5 seconds
    });

    const chartData = data || [];

    if (isFetching) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error fetching data</Typography>;
    }

    if (!data || data.length === 0) {
        return <Typography>No data available</Typography>;
    }

    return (
        <React.Fragment>
            {chartData.map((item) => (
                <Typography key={item._id}>
                    {item.productName}: {item.productPrice}
                </Typography>
            ))}
        </React.Fragment>
    );
}

export default BarChart;