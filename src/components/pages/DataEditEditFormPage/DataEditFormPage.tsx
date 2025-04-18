import * as React from 'react';
import Typography from '@mui/material/Typography';
import DataEditForm from '../../common/DataEditForm/DataEditForm';
import './DataEditFormPage.css';

function DataEditFormPage() {
    return (
        <React.Fragment>
            <Typography variant='h4'>Data Edit Form</Typography>
            <DataEditForm />
        </React.Fragment>
    );
}

export default DataEditFormPage;
