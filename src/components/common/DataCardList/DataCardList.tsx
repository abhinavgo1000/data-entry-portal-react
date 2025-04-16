import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import './DataCardList.css';

function DataCardList() {
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                <Pagination count={10} color="primary" />
            </Box>
        </React.Fragment>
    );
}

export default DataCardList;
