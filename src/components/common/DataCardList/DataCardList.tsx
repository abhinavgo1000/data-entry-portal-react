import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import './DataCardList.css';

function DataCardList() {
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
                    <IconButton aria-label='edit button'>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete button'>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                <Pagination count={10} color='primary' />
            </Box>
        </React.Fragment>
    );
}

export default DataCardList;
