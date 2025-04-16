import * as React from 'react';
import Typography from '@mui/material/Typography';
import './HomePage.css';
import DataCardList from '../../common/DataCardList/DataCardList';

function HomePage() {
  return (
    <React.Fragment>
        <Typography variant='h4'>Welcome to Data Entry Portal!</Typography>
        <DataCardList />
    </React.Fragment>
  );
}

export default HomePage;
