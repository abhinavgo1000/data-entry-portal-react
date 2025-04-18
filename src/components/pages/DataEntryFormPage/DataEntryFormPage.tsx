import * as React from 'react';
import Typography from '@mui/material/Typography';
import DataEntryForm from '../../common/DataEntryForm/DataEntryForm';
import './DataEntryFormPage.css';

function DataEntryFormPage() {
    return (
        <React.Fragment>
            <Typography variant='h4'>Data Entry Form</Typography>
            <DataEntryForm />
        </React.Fragment>
    );
}

export default DataEntryFormPage;
