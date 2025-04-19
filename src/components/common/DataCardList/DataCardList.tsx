import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DataAlertDialog from '../DataAlertDialog/DataAlertDialog';
import './DataCardList.css';

function DataCardList() {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/edit-form');
    };

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleDialogRes = (res: boolean) => {
        setDialogOpen(false);
        if (res) {
            // Handle delete action here
            console.log('Entry deleted');
        } else {
            console.log('Delete action cancelled');
        }
    };

    return (
        <React.Fragment>
            <Card 
                variant='outlined' 
                sx={{ 
                    width: '100%', 
                    marginBottom: 2, 
                    marginTop: 2, 
                    overflowX: 'hidden' 
                }}
            >
                <CardContent>
                    <Typography variant='h5' component='div'>
                        Card Title
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        Card Subtitle
                    </Typography>
                    <Typography variant='body2'>
                        This is a sample card content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title='Edit Entry'>
                        <IconButton onClick={handleEditClick} aria-label='edit button'>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Entry'>
                        <IconButton onClick={handleDeleteClick} aria-label='delete button'>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                <Pagination count={10} color='primary' />
            </Box>
            <DataAlertDialog
                dialogOpen={dialogOpen}
                onDialogOpen={() => setDialogOpen(true)}
                onDialogRes={(res) => handleDialogRes(res)}
                dialogTitle='Delete Entry'
                dialogAgreeLabel='Delete'
                dialogDisagreeLabel='Cancel'
            >
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DataAlertDialog>
        </React.Fragment>
    );
}

export default DataCardList;
