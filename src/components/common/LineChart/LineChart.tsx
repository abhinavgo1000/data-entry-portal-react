import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './LineChart.css';
import ChartFormData from '../../../interfaces/ChartFormData';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function LineChart() {

    const fetchChartData = async () => {
        const response = await axios.get(`${API_BASE_URL}/api/form/fetch-all-data`);
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

export default LineChart;
