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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './DataCardList.css';
import ChartFormData from '../../../interfaces/ChartFormData';

function DataCardList() {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10); // Default limit is 10
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const navigate = useNavigate();

    const fetchCardsData = async (page: number, limit: number) => {
        const response = await axios.get(`http://localhost:5000/api/form/fetch-form-data?page=${page}&limit=${limit}`);
        return response.data;
    };

    const { data, error, isFetching } = useQuery<{totalDocuments: number, totalPages: number, currentPage: number, data: ChartFormData[]}>({
        queryKey: ['cardsData', page, limit],
        queryFn: () => fetchCardsData(page, limit),
        staleTime: 5000, // Keeps data fresh for 5 seconds
    });

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(event.target.value));
        setPage(1); // Reset to the first page
    };

    const handleEditClick = () => {
        navigate('/edit-form');
    };

    const handleDeleteClick = () => {
        setDialogOpen(true);
    };

    const handleDialogRes = (res: boolean) => {
        setDialogOpen(false);
        if (res) {
            console.log('Entry deleted');
        } else {
            console.log('Delete action cancelled');
        }
    };

    if (isFetching) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error fetching data</Typography>;
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <label htmlFor="limit-select">Entries per page:</label>
                <select id="limit-select" value={limit} onChange={handleLimitChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </Box>
            {data?.data.map((cardData) => (
                <Card key={cardData._id} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{cardData.productName}</Typography>
                        <Typography color="text.secondary">{cardData.productCategory}</Typography>
                        <Typography>Submitted By: {cardData.name}</Typography>
                        <Typography>Price: ${cardData.productPrice}</Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="Edit Entry">
                            <IconButton onClick={handleEditClick} aria-label="edit button">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Entry">
                            <IconButton onClick={handleDeleteClick} aria-label="delete button">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={data?.totalPages || 1}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            <DataAlertDialog
                dialogOpen={dialogOpen}
                onDialogOpen={() => setDialogOpen(true)}
                onDialogRes={(res) => handleDialogRes(res)}
                dialogTitle="Delete Entry"
                dialogAgreeLabel="Delete"
                dialogDisagreeLabel="Cancel"
            >
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DataAlertDialog>
        </React.Fragment>
    );
}

export default DataCardList;
