import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingSpinner() {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </React.Fragment>
    );
}

export default LoadingSpinner;
